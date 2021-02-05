import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';

@Component({
    templateUrl: 'edit-terms.component.html'
})
export class EditTermsComponent implements OnInit {
    termsForm: FormGroup;
    submitted: boolean = false;

    public config = {
        removeButtons: 'Anchor,Maximize,Scayt,About,Image',
        height: '300px'
    };

    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private alertService: AlertService
    ) {
        
    }

    ngOnInit() {
        this.termsForm = this.formBuilder.group({
            text: ['', Validators.maxLength(5000)]
        });

        this.loadGeneralInfo();
    }

    get f() { return this.termsForm.controls; }

    loadGeneralInfo() {
        this.contactService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    if (res.data && res.data.contact)
                        this.termsForm.patchValue({ text: res.data.contact.termsText })
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    onSubmit() {
        this.submitted = true;
        if (this.termsForm.invalid) return;

        this.contactService.updateTerms(this.termsForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Registration terms text has been updated.', { autoClose: true });
                    this.submitted = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }
}