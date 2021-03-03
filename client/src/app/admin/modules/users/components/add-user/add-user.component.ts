import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordConfirmValidator } from '@app/home/modules/account/validators/PasswordConfirmValidator';
import { UserFormValidator } from '../../validators/UserFormValidator';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';

@Component({ templateUrl: 'add-user.component.html' })
export class AddUserComponent implements OnInit {
    addUserForm: FormGroup;
    submitted: boolean = false;

    constructor(
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.addUserForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)]],
            albumNumber: ['']
        }, {
            validators: [
                PasswordConfirmValidator('password', 'confirmPassword'),
                UserFormValidator('role', 'albumNumber')
            ]
        });
    }

    get f() { return this.addUserForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.addUserForm.invalid) return;

        this.usersService.createUser(this.addUserForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('User has been created.', {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/users']);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                }
            )
    }

    onRoleChange(e) {
        const albumNumberInput = document.getElementById('albumNumber');
        if (this.f.role.value === 'user')
            albumNumberInput.classList.add('d-none');
        else if (this.f.role.value === 'student')
            albumNumberInput.classList.remove('d-none');
    }
}