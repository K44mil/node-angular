import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Group } from '../../models';
import { GroupsService } from '../../services/groups.service';

@Component({ templateUrl: 'groups-list.component.html' })
export class GroupsListComponent implements OnInit {
    groups: Group[];

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
    private query: string = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isArchive=0`;

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadGroups(this.query);

        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.setItemsPerPage);
    }

    loadGroups(query: string) {
        this.groupsService.getGroups(query)
            .pipe(first())
            .subscribe(res => {
                this.groups = res.data.groups;
                this.countTotal = res.data.count;
                this.pagination = res.data.pagination;
                this.totalPages = res.data.countPages;
            },
            err => {
                this.alertService.error(err, {
                    autoClose: true
                });
                window.scrollTo(0,0);
            })
    }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isArchive=0`;
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
        // this.query += this.getFilterQuery();
    }

    // Pagination function
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.prepareQuery();
            this.loadGroups(this.query);
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.prepareQuery();
            this.loadGroups(this.query);
        }
    }

    setItemsPerPage(value: number) {
        this.currentPage = 1;
        this.itemsPerPage = value;
        this.prepareQuery();
        this.loadGroups(this.query);
    }

    // Select functions
    selectOrUnselectItem(id: string) {
        if (!this.selectedItems.includes(id))
            this.selectedItems.push(id);
        else
            this.selectedItems = this.selectedItems.filter(i => i !== id);
    }

    selectOrUnselectAllItems() {
        let groupSelects: HTMLInputElement[];
        groupSelects = Array.from(document.querySelectorAll('.group-select'));
        if (!this.allSelected) {
            groupSelects.forEach(gS => {
                gS.checked = true;
            });
            // Push all groups
            this.selectedItems = [];
            for (const groups of this.groups) {
                this.selectedItems.push(groups.id);
            }
            this.allSelected = true;
        } else {
            groupSelects.forEach(gS => {
                gS.checked = false;
            });
            // Remove all groups
            this.selectedItems = [];
            this.allSelected = false;
        }
    }

    // Filter form functions
    filterOnOff() {
        if (this.filterOn) this.filterOn = false;
        else this.filterOn = true;
    }

    // Format functions
    printFormattedGroupLevel(value: string): string {
        switch(value) {
            case 'M':
                return 'mgr';
            case 'I':
                return 'inż.';
        }
        return '';
    }

    printFormattedStudiesType(value: string): string {
        switch(value) {
            case 'Z':
                return 'zaoczne';
            case 'D':
                return 'dzienne';
        }
        return '';
    }

    // Actions function

    deleteGroup(id: string) {
        if (confirm("Are you sure to delete this group?")) {
            this.groupsService.deleteGroup(id)
                .pipe(first())
                .subscribe(
                    res => {
                        if (res.success == true) {
                            this.alertService.success('Group has been deleted.', {
                                autoClose: true
                            });
                        }
                        this.loadGroups(this.query);
                    },
                    err => {
                        this.alertService.clear();
                        this.alertService.error(err, {
                            autoClose: true
                        });
                        window.scrollTo(0,0);
                    }
                );
        }
    }

    openGroup(id: string) {
        this.groupsService.openGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadGroups(this.query);
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

    closeGroup(id: string) {
        this.groupsService.closeGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadGroups(this.query);
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

    archiveGroup(id: string) {
        this.groupsService.archiveGroup(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.loadGroups(this.query);
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