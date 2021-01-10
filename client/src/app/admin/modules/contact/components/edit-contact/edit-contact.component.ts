import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';

@Component({
    templateUrl: 'edit-contact.component.html'
})
export class EditContactComponent implements OnInit {
    editContactForm: FormGroup;

    contactLinks: any[];
    addContactLinkForm: FormGroup;

    submitted: boolean = false;
    addLinkSubmitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.editContactForm = this.formBuilder.group({
            country: ['', Validators.maxLength(50)],
            city: ['', Validators.maxLength(50)],
            street: ['', Validators.maxLength(50)],
            postalCode: ['', Validators.pattern(/[0-9]{2}-[0-9]{3}/)],
            room: ['', Validators.maxLength(10)],
            email: ['', Validators.email],
            phone: ['', Validators.maxLength(20)],
            webPage: ['', Validators.pattern(/^(http|https):\/\//)],
            consultations: ['', Validators.maxLength(50)],
            shortInformation: ['', Validators.maxLength(200)],
        });

        this.addContactLinkForm = this.formBuilder.group({
            caption: ['', [Validators.required, Validators.maxLength(100)]],
            href: ['', [Validators.required, Validators.pattern(/^(http|https):\/\//)]]
        });

        this.loadContact();
    }

    get f() { return this.editContactForm.controls; }
    get aL() { return this.addContactLinkForm.controls; }

    loadContact() {
        this.contactService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    const contact = res.data.contact;
                    this.editContactForm.patchValue({
                        country: contact.country,
                        city: contact.city,
                        street: contact.street,
                        postalCode: contact.postalCode,
                        room: contact.room,
                        email: contact.email,
                        phone: contact.phone,
                        webPage: contact.webPage,
                        consultations: contact.consultations,
                        shortInformation: contact.shortInformation
                    });
                    this.contactLinks = contact.contactLinks;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    onSubmit() {
        this.submitted = true;
        if (this.editContactForm.invalid) return;

        this.contactService.updateContact(this.editContactForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Contact Info has been updated.', {
                        autoClose: true
                    });
                    this.submitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    onAddContactLinkSubmit() {
        this.addLinkSubmitted = true;
        if (this.addContactLinkForm.invalid) return;

        this.contactService.addContactLink(this.addContactLinkForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadContact();
                    this.addLinkSubmitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    deleteLink(id: string) {
        this.contactService.deleteContactLink(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadContact();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }
}