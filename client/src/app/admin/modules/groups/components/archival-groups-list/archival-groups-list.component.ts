import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Course, Group, Specialization, Subject } from '../../models';
import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'archival-groups-list.component.html',
    styles: [
        `
            .sort-header { cursor: pointer; }
        `
    ]
})
export class ArchivalGroupsListComponent implements OnInit {
    groups: Group[];

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

    // For filter selects
    courses: Course[];
    specializations: Specialization[];
    subjects: Subject[];

    availableSpecializations: Specialization[];
    availableSubjects: Subject[];

    // Mass Actions
    selectedItems: string[] = [];
    allSelected = false;

    // Query string
    private query: string = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isArchive=1`;

    // SORTING
    sort = { property: null, order: null };

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadGroups(this.query);

        // Load Data for Filter
        this.loadCourses();
        this.loadSpecializations();
        this.loadSubjects();

        // Items per Page control
        this.itemsPerPageControl = new FormControl(this.itemsPerPage);

        // Filter Form init
        this.filterForm = this.formBuilder.group({
            displayName: [''],
            academicYear: [''],
            courseId: [''],
            specializationId: [''],
            subjectId: [''],
            type: [''],
            level: [''],
            groupType: [''],
            number: ['']
        });
    }

    get f() { return this.filterForm.controls; }

    resetFilterForm() {
        this.filterForm.reset();
        this.clearQuery();
        this.loadGroups(this.query);
    }

    onFilterFormSubmit() {
        this.currentPage = 1;
        this.prepareQuery();
        this.loadGroups(this.query);
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
                this.alertService.error(err);
            })
    }

    loadCourses() {
        this.groupsService.getVisibleCourses()
            .pipe(first())
            .subscribe(res => {                
                if (res.data.courses)
                    this.courses = res.data.courses;         
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadSpecializations() {
        this.groupsService.getVisibleSpecializations()
            .pipe(first())
            .subscribe(res => {
                if (res.data.specializations)
                    this.specializations = res.data.specializations;        
            },
            err => {
                this.alertService.error(err);
            });
    }

    loadSubjects() {
        this.groupsService.getVisibleSubjects()
            .pipe(first())
            .subscribe(res => {
                if (res.data.subjects)
                    this.subjects = res.data.subjects;       
            },
            err => {
                this.alertService.error(err);
            });
    }

    // Filter form functions
    filterOnOff() {
        if (this.filterOn) this.filterOn = false;
        else this.filterOn = true;
    }

    // Query functions
    clearQuery() {
        this.clearSelect();
        this.query = `?limit=${this.itemsPerPage}&page=${this.currentPage}&isArchive=1`;
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

        if (this.f.displayName.value) {
            let displayName = this.f.displayName.value;
            displayName = displayName.replaceAll("\\", "\\\\");
            query += `&displayName=${displayName}`;
        }
        if (this.f.academicYear.value) query += `&academicYear=${this.f.academicYear.value}`;
        if (this.f.courseId.value) query += `&courseId=${this.f.courseId.value}`;
        if (this.f.specializationId.value) query += `&specializationId=${this.f.specializationId.value}`;
        if (this.f.subjectId.value) query += `&subjectId=${this.f.subjectId.value}`;
        if (this.f.type.value) query += `&type=${this.f.type.value}`;
        if (this.f.level.value) query += `&level=${this.f.level.value}`;
        if (this.f.groupType.value) query += `&groupType=${this.f.groupType.value}`;
        if (this.f.number.value) query += `&number=${this.f.number.value}`;

        return query;
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

    // Actions functions
    groupToDeleteId: string;

    setGroupToDelete(id: string) {
        this.groupToDeleteId = id;
    }

    deleteGroup() {
        if (this.groupToDeleteId) {
            this.groupsService.deleteGroup(this.groupToDeleteId)
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

    restoreGroup(id: string) {
        this.groupsService.restoreGroup(id)
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

    // Mass actions functions
    onActionsSelectChange(e) {
        switch (e.target.value) {
            case 'delete-many':
                const btnDelete = document.getElementById('btnDeleteManyConfirmationModal');
                btnDelete.click();
                break;
            case 'restore-many':
                const btnRestore = document.getElementById('btnRestoreManyConfirmationModal');
                btnRestore.click();
                break;
        }
    }

    restoreSelectedGroups() {
        if (this.selectedItems.length > 0) {
            this.groupsService.restoreManyGroups(this.selectedItems)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success(res.data.msg, {
                        autoClose: true
                    });
                    this.clearSelect();
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

    deleteSelectedGroups() {
        if (this.selectedItems.length > 0) {
            this.groupsService.deleteManyGroups(this.selectedItems)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success(res.data.msg, {
                        autoClose: true
                    });
                    this.clearSelect();
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

    // Sort Funtcions
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
        this.loadGroups(this.query);
    }

     // onChange events
     onCourseSelectChange(e) {
        this.availableSubjects = [];

        this.availableSpecializations = this.specializations.filter(spec => spec.courseId === e.target.value);
    }

    onSpecializationSelectChange(e) {
        this.availableSubjects = this.subjects.filter(sub => sub.specializationId === e.target.value);
    }
}