import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserPasswordValidator } from '../../validators/EditUserPasswordValidator';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { UserFormValidator } from '../../validators/UserFormValidator';

@Component({ templateUrl: 'edit-user.component.html' })
export class EditUserComponent implements OnInit {
    editUserForm: FormGroup;
    submitted: boolean = false;
    userId: string;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.editUserForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)]],
            confirmPassword: ['', ],
            role: ['', Validators.required],
            firstName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
            lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
            albumNumber: ['']
        }, {
            validators: [
                EditUserPasswordValidator('password', 'confirmPassword'),
                UserFormValidator('role', 'albumNumber')
            ]
        });

        this.userId = this.route.snapshot.paramMap.get('id');
        this.loadUser(this.userId);
    }

    get f() { return this.editUserForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.editUserForm.invalid) return;

        this.usersService.updateUser(this.userId, this.editUserForm.value)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('User has been updated.', {
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

    loadUser(id: string) {
        this.usersService.getUser(id)
            .pipe(first())
            .subscribe(
                res => {
                    const user = res.data.user;
                    this.editUserForm.patchValue({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        albumNumber: user.albumNumber
                    });

                    if (user.role === 'student')
                        this.showAlbumNumberField();
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true,
                        keepAfterRouteChange: true
                    });
                    this.router.navigate(['/admin/users']);
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

    showAlbumNumberField() {
        const albumNumberInput = document.getElementById('albumNumber');
        albumNumberInput.classList.remove('d-none');
    }
}