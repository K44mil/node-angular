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

    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.editContactForm = this.formBuilder.group({
            country: [''],
            city: [''],
            street: [''],
            postalCode: [''],
            room: [''],
            email: [''],
            phone: [''],
            webPage: [''],
            consultations: [''],
            shortInformation: ['']
        });

        this.addContactLinkForm = this.formBuilder.group({
            caption: ['', Validators.required],
            href: ['', Validators.required]
        });

        this.loadContact();
    }

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
        if (this.editContactForm.invalid) return;

        this.contactService.updateContact(this.editContactForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Contact Info has been updated.', {
                        autoClose: true
                    });
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
        if (this.addContactLinkForm.invalid) return;

        this.contactService.addContactLink(this.addContactLinkForm.value)
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