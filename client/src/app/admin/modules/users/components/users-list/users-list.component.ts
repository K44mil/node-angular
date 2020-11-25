import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
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
    itemsPerPage: number = 10;

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
        private modalService: ModalService
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
            albumNumber: ['']
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
        return date.toLocaleString('pl');
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

    deleteUser(id: string) {
        if (confirm('Are you sure?')) {
            this.usersService.deleteUser(id)
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
    }

    onActionsSelectChange(e) {
        switch (e.target.value) {
            case 'delete-many':
                this.deleteSelectedUsers();
                this.clearSelect();
                break;
            case 'block-many':
                this.blockSelectedUsers();
                this.clearSelect();
                break;
        }
    }

    deleteSelectedUsers() {
        if (this.selectedItems.length > 0 && 
            confirm('Are you sure you want to delete all selected users?')) {
            this.usersService.deleteManyUsers(this.selectedItems)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.clear();
                        this.alertService.success(res.data.msg, {
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
    }

    blockSelectedUsers() {
        if (this.selectedItems.length > 0 &&
            confirm('Are you sure you want to block all selected users?')) {
            this.usersService.blockManyUsers(this.selectedItems)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success(res.data.msg, {
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
    }

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
}