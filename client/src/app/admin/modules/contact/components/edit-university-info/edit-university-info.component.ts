import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';

@Component({
    templateUrl: 'edit-university-info.component.html',
    styles: [`
        .image-preview { width: 200px; height: 200px; }
    `]
})
export class EditUniversityInfoComponent implements OnInit {
    contact: any;
    addUniversityLinkForm: FormGroup;
    editUniversityForm: FormGroup;
    universityLinks: any[];
    photoUrl: string = `${environment.hostUrl}/uploads/slider/no-photo.jpg`;
    addLinkSubmitted: boolean = false;
    constructor(
        private contactService: ContactService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.editUniversityForm = this.formBuilder.group({
            photo: [''],
            name: [''],
            faculty: [''],
            department: [''],
            addressLine1: [''],
            addressLine2: ['']
        });

        this.addUniversityLinkForm = this.formBuilder.group({
            caption: ['', [Validators.required, Validators.maxLength(100)]],
            href: ['', [Validators.required, Validators.pattern(/^(http|https):\/\//)]]
        });

        this.loadContact();
    }

    get aL() { return this.addUniversityLinkForm.controls; }

    loadContact() {
        this.contactService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    this.contact = res.data.contact;
                    if (this.contact.university) {
                        this.editUniversityForm.patchValue({
                            name: this.contact.university.name || '',
                            faculty: this.contact.university.faculty || '',
                            department: this.contact.university.department || '',
                            addressLine1: this.contact.university.addressLine1 || '',
                            addressLine2: this.contact.university.addressLine2 || '',
                        });
                        if (this.contact.university.image) {
                            this.photoUrl = `${environment.hostUrl}/uploads/${this.contact.university.image}`;
                        }
                        this.universityLinks = this.contact.university.universityLinks || [];
                    }
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    showPreview(event) {
        const file = (event.target as HTMLInputElement).files[0];
        if (!file) {
            this.photoUrl = `${environment.hostUrl}/uploads/slider/no-photo.jpg`;
            return;
        }
        this.editUniversityForm.patchValue({
            photo: file
        });
        this.editUniversityForm.get('photo').updateValueAndValidity();

        // Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.photoUrl = reader.result as string;
        }
        reader.readAsDataURL(file);
    }

    onSubmit() {
        if (this.editUniversityForm.invalid) return;

        const formData = new FormData();
        formData.append('photo', this.editUniversityForm.get('photo').value);
        formData.append('name', this.editUniversityForm.get('name').value);
        formData.append('faculty', this.editUniversityForm.get('faculty').value);
        formData.append('department', this.editUniversityForm.get('department').value);
        formData.append('addressLine1', this.editUniversityForm.get('addressLine1').value);
        formData.append('addressLine2', this.editUniversityForm.get('addressLine2').value);

        this.contactService.updateUniversityInfo(formData)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('University Info has been edited.', { autoClose: true });
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            ) 
    }

    onAddUniversityLinkSubmit() {
        this.addLinkSubmitted = true;
        if (this.addUniversityLinkForm.invalid) return;

        this.contactService.addUniversityLink(this.addUniversityLinkForm.value)
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
        this.contactService.deleteUniversityLink(id)
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