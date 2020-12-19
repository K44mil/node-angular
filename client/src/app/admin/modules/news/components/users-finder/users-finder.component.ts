import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from '@app/admin/modules/groups/services/groups.service';
import { User } from '@app/admin/modules/users/models/User';
import { UsersService } from '@app/admin/modules/users/services/users.service';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';


@Component({
    selector: 'users-finder',
    templateUrl: 'users-finder.component.html'
})
export class UsersFinder implements OnInit, OnChanges {
    filterForm: FormGroup;
    users: User[];

    @Input() usersIds: any;

    @Output() usersAdded: EventEmitter<any> = new EventEmitter<any>();

    // Mass Actions
    selectedItems: string[] = [];
    allSelected = false;

    // Query string
    private query: string = `?isVerified=1&isBlocked=0&role=student,user`;

    constructor(
        private usersService: UsersService,
        private alertService: AlertService,
        private modalService: ModalService,
        private formBuilder: FormBuilder
    ) {
        this.filterForm = this.formBuilder.group({
            email: [''],
            firstName: [''],
            lastName: [''],
            albumNumber: ['']
        });
    }

    ngOnInit() {
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    ngOnChanges() {
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    get f() { return this.filterForm.controls; }

    loadUsers(query: string) {
        this.usersService.getUsers(query)
            .pipe(first())
            .subscribe(res => {
                this.users = res.data.users.filter(u => {
                    if (!this.usersIds.includes(u.id)) return u;
                });
            },
            err => {
                this.alertService.error(err, {
                    autoClose: true
                });
                this.modalService.close('add-user-modal');
            });
    }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = `?isVerified=1&isBlocked=0&role=student,user`;
    }

    clearSelect() {
        const selectAllElement = <HTMLInputElement> document.getElementById('select-all');
        selectAllElement.checked = false;
        this.allSelected = false;
        this.selectedItems = [];
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
    }

    getFilterQuery() {
        let query = '';

        if (this.f.email.value) query += `&email=${this.f.email.value}`;
        if (this.f.firstName.value) query += `&firstName=${this.f.firstName.value}`;
        if (this.f.lastName.value) query += `&lastName=${this.f.lastName.value}`;
        if (this.f.albumNumber.value) query += `&albumNumber=${this.f.albumNumber.value}`;

        return query;
    }

     // Select functions
     selectOrUnselectItem(id: string) {
        if (!this.selectedItems.includes(id))
            this.selectedItems.push(id);
        else
            this.selectedItems = this.selectedItems.filter(i => i !== id);
    }

    selectOrUnselectAllItems() {
        let userSelects: HTMLInputElement[];
        userSelects = Array.from(document.querySelectorAll('.user-select'));
        if (!this.allSelected) {
            userSelects.forEach(uS => {
                uS.checked = true;
            });
            // Push all users
            this.selectedItems = [];
            for (const user of this.users) {
                this.selectedItems.push(user.id);
            }
            this.allSelected = true;
        } else {
            userSelects.forEach(uS => {
                uS.checked = false;
            });
            // Remove all users
            this.selectedItems = [];
            this.allSelected = false;
        }
    }

    onFormInputsChange() {
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    addUsers() {
        const addedUsers = this.users.filter(user => {
            if (this.selectedItems.includes(user.id)) return user;
        });
        this.usersAdded.emit(addedUsers);
        this.clearSelect();
        this.prepareQuery();
        this.loadUsers(this.query);
    }
}