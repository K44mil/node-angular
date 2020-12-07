import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmValidator } from '@app/home/modules/account/validators/PasswordConfirmValidator';
import { UserFormValidator } from '../../validators/UserFormValidator';

@Component({ templateUrl: 'edit-user.component.html' })
export class EditUserComponent implements OnInit {
    editUserForm: FormGroup;
    submitted: boolean = false;

    constructor(private formBuilder: FormBuilder) {
        
    }

    ngOnInit() {
        this.editUserForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/([a-zA-Z])$/)]],
            albumNumber: ['']
        }, {
            validators: [
                PasswordConfirmValidator('password', 'confirmPassword'),
                UserFormValidator('role', 'albumNumber')
            ]
        });
    }

    get f() { return this.editUserForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.editUserForm.invalid) return;
    }

    onRoleChange(e) {
        const albumNumberInput = document.getElementById('albumNumber');
        if (this.f.role.value === 'user')
            albumNumberInput.classList.add('d-none');
        else if (this.f.role.value === 'student')
            albumNumberInput.classList.remove('d-none');
    }
}