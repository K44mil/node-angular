import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';

@Component({ templateUrl: 'add-user.component.html' })
export class AddUserComponent implements OnInit {
    addUserForm: FormGroup;

    constructor(
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.addUserForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            albumNumber: ['']
        });
    }

    get f() { return this.addUserForm.controls; }

    onSubmit() {
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