import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '@app/admin/modules/users/models/User';
import { UsersService } from '@app/admin/modules/users/services/users.service';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
    selector: 'students-list',
    templateUrl: 'students-list.component.html'
})
export class StudentsListComponent implements OnInit {
    filterForm: FormGroup;
    users: User[];

    @Input() groupId: string;

    @Output() studentsAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Mass Actions
    selectedItems: string[] = [];
    allSelected = false;

    // Query string
    private query: string = `?isVerified=1&isBlocked=0&role=student`;

    constructor(
        private usersService: UsersService,
        private alertService: AlertService,
        private modalService: ModalService,
        private formBuilder: FormBuilder,
        private groupsService: GroupsService
    ) { }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            email: [''],
            firstName: [''],
            lastName: [''],
            albumNumber: ['']
        });

        this.prepareQuery();
        this.loadUsers(this.query);
    }

    get f() { return this.filterForm.controls; }

    loadUsers(query: string) {
        this.usersService.getUsers(query)
            .pipe(first())
            .subscribe(res => {
                this.users = res.data.users.filter(u => u.userGroup == null);
                console.log(res);
            },
            err => {
                this.alertService.error(err, {
                    autoClose: true
                });
                this.modalService.close('add-students-modal');
            });
    }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = `?isVerified=1&isBlocked=0&role=student&notInGroup=${this.groupId}`;
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

    addStudents() {
        if (this.selectedItems.length > 0)
            this.groupsService.addUsersToGroup(this.groupId, this.selectedItems)
                .pipe(first())
                .subscribe(
                    res => {
                        this.prepareQuery();
                        this.loadUsers(this.query);
                        this.studentsAdded.emit(true);
                    },
                    err => {
                        this.modalService.close('add-students-modal');
                        this.alertService.error(err, {
                            autoClose: true
                        });
                    }
                )
    }
}