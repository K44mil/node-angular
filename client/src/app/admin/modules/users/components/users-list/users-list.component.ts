import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';

import { User } from '../../models/User';

import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html',
    styles: [`
                .sort-header {
                    cursor: pointer;
                }
            `]
})
export class UsersListComponent implements OnInit {
    public users: User[];
    
    // PAGINATION
    totalPages: number;
    countTotal: number;
    pagination: any;
    currentPage: number = 1;

    // Items per page
    itemsPerPageControl: FormControl;
    itemsPerPage: number = 25;

    // Filter Form
    filterForm: FormGroup;

    // Filter on/off
    filterOn: boolean = false;

    // Mass Actions
    selectedItems: string[] = [];
    allSelected = false;

    // SORTING
    sort = { property: null, order: null };

    // Query string
    private query: string = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isVerified=1&isBlocked=0`;

    constructor(
        private usersService: UsersService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadUsers(this.query);

        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.itemsPerPage);

        // Filter Form
        this.filterForm = this.formBuilder.group({
            email: [''],
            firstName: [''],
            lastName: [''],
            role: [''],
            albumNumber: [''],
            groupId: ['']
        });
    }

    get f() { return this.filterForm.controls; }

    getFilterQuery() {
        let query = '';

        if (this.f.email.value) query += `&email=${this.f.email.value}`;
        if (this.f.firstName.value) query += `&firstName=${this.f.firstName.value}`;
        if (this.f.lastName.value) query += `&lastName=${this.f.lastName.value}`;
        if (this.f.role.value) query += `&role=${this.f.role.value}`;
        if (this.f.albumNumber.value) query += `&albumNumber=${this.f.albumNumber.value}`;
        if (this.f.groupId.value) query += `&groupId=${this.f.groupId.value}`;

        return query;
    }

    clearQuery() {
        this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isVerified=1&isBlocked=0`;
    }

    clearSelect() {
        const actionsSelectElement = <HTMLSelectElement> document.getElementById('actions-select');
        const selectAllElement = <HTMLInputElement> document.getElementById('select-all');
        selectAllElement.checked = false;
        this.allSelected = false;
        this.selectedItems = [];

        // Reset select element to value 'Actions'
        actionsSelectElement.options.selectedIndex = 0;
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    resetFilterForm() {
        this.filterForm.reset();
        this.clearQuery();
        this.loadUsers(this.query);
    }

    onFilterFormSubmit() {
        this.currentPage = 1;
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    loadUsers(query: string) {
        this.usersService.getUsers(query)
            .pipe(first())
            .subscribe(res => {
                this.users = res.data.users
                this.countTotal = res.data.count;
                this.pagination = res.data.pagination;
                this.totalPages = res.data.countPages;
            },
            err => {
                this.alertService.error(err);
            });
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    }

    filterOnOff() {
        if (this.filterOn) this.filterOn = false;
        else this.filterOn = true;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.prepareQuery();
            this.loadUsers(this.query);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.prepareQuery();
            this.loadUsers(this.query);
        }
    }

    setItemsPerPage(value: number) {
        this.currentPage = 1;
        this.itemsPerPage = value;
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    blockUser(id: string) {
        this.usersService.blockUser(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('User has been blocked.', {
                        autoClose: true
                    });
                    this.loadUsers(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    userToDeleteId: string;

    setUserToDelete(id: string) {
        this.userToDeleteId = id;
    }

    deleteUser() {
        if (this.userToDeleteId)
            this.usersService.deleteUser(this.userToDeleteId)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.clear();
                        this.alertService.success('User has been deleted.', {
                            autoClose: true
                        });
                        this.loadUsers(this.query);
                    },
                    err => {
                        this.alertService.clear();
                        this.alertService.error(err, {
                            autoClose: true
                        });
                        window.scrollTo(0,0);
                    }
                )
    }

    editUser(id: string) {
        this.router.navigate([`/admin/users/edit_user/${id}`]);
    }

    onActionsSelectChange(e) {
        switch (e.target.value) {
            case 'delete-many':
                const btnDelete = document.getElementById('btnDeleteManyConfirmationModal');
                btnDelete.click();
                // this.deleteSelectedUsers();
                // this.clearSelect();
                break;
            case 'block-many':
                const btnBlock = document.getElementById('btnBlockManyConfirmationModal');
                btnBlock.click();
                // this.blockSelectedUsers();
                // this.clearSelect();
                break;
        }
    }

    deleteSelectedUsers() {
        if (this.selectedItems.length > 0 )
            this.usersService.deleteManyUsers(this.selectedItems)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.clear();
                        this.alertService.success(res.data.msg, {
                            autoClose: true
                        });
                        this.clearSelect();
                        this.loadUsers(this.query);
                    },
                    err => {
                        this.alertService.clear();
                        this.alertService.error(err, {
                            autoClose: true
                        });
                        window.scrollTo(0,0);
                    }
                )
    }

    blockSelectedUsers() {
        if (this.selectedItems.length > 0 ) {
            this.usersService.blockManyUsers(this.selectedItems)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success(res.data.msg, {
                        autoClose: true
                    });
                    this.clearSelect();
                    this.loadUsers(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
        }
    }

    selectOrUnselectItem(id: string) {
        if (!this.selectedItems.includes(id))
            this.selectedItems.push(id);
        else
            this.selectedItems = this.selectedItems.filter(i => i !== id);

        if (this.selectedItems.length === 0) this.clearSelect();
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
            this.clearSelect();
        }
    }

    // SORTING FUNCTIONS
    sortBy(property: string) {
        if (this.sort.property === property) {
            if (this.sort.order === 'ASC') this.sort.order = 'DESC';
            else {
                this.sort.property = null;
                this.sort.order = null;
            }
        } else {
            this.sort.property = property;
            this.sort.order = 'ASC';
        }
        this.prepareQuery();
        this.loadUsers(this.query);
    }

    selectedGroupId: string;
    selectedGroup: any;

    onGroupFinderChanged(event) {
        this.selectedGroup = event;
        this.selectedGroupId = event ? event.id : event;
    }

    confirmGroupId() {
        this.filterForm.patchValue({
            groupId: this.selectedGroupId
        });
    }

    clearGroup() {
        this.filterForm.patchValue({
            groupId: null
        });
    }
}