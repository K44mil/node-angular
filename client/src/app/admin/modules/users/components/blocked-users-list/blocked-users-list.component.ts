import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({ templateUrl: 'blocked-users-list.component.html' })
export class BlockedUsersListComponent implements OnInit {
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

    // Query string
    private query: string = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isBlocked=1`;

    constructor(
        private usersService: UsersService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadUsers(this.query);

        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.setItemsPerPage);

        // Filter Form
        this.filterForm = this.formBuilder.group({
            email: [''],
            firstName: [''],
            lastName: [''],
            role: [''],
            albumNumber: ['']
        });
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

    get f() { return this.filterForm.controls; }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isBlocked=1`;
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
    }

    getFilterQuery() {
        let query = '';

        if (this.f.email.value) query += `&email=${this.f.email.value}`;
        if (this.f.firstName.value) query += `&firstName=${this.f.firstName.value}`;
        if (this.f.lastName.value) query += `&lastName=${this.f.lastName.value}`;
        if (this.f.role.value) query += `&role=${this.f.role.value}`;
        if (this.f.albumNumber.value) query += `&albumNumber=${this.f.albumNumber.value}`;

        return query;
    }

    // Filter form functions
    filterOnOff() {
        if (this.filterOn) this.filterOn = false;
        else this.filterOn = true;
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

    // Pagination function

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

    // Date functions
    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    // Action functions
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

    unblockUser(id: string) {
        this.usersService.unblockUser(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('User account has been unblocked', {
                        autoClose: true
                    });
                    this.loadUsers(this.query);
                },
                err => {
                    this.alertService.error(err, {
                        autoClose: true
                    });
                    window.scrollTo(0,0);
                }
            )
    }

    // Mass actions
    onActionsSelectChange(e) {
        switch (e.target.value) {
            case 'delete-many':
                this.deleteSelectedUsers();
                this.clearSelect();
                break;
            case 'unblock-many':
                this.unblockSelectedUsers();
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

    unblockSelectedUsers() {
        if (this.selectedItems.length > 0 &&
            confirm('Are you sure you want to unblock all selected users?')) {
            this.usersService.unblockManyUsers(this.selectedItems)
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
}