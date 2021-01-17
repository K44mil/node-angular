import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Specialization } from '../../../models';

import { SpecializationsService } from '../../../services/specializations.service';

@Component({ templateUrl: 'specializations-list.component.html', styles: [`.sort-header {cursor:pointer;}`] })
export class SpecializationsListComponent implements OnInit {
    specializations: Specialization[];
    filterForm: FormGroup;
    
    query: string = '';

     // SORTING
    sort = { property: null, order: null };

    constructor(
        private specializationsService: SpecializationsService,
        private alertService: AlertService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.filterForm = this.formBuilder.group({
            name: [''],
            short: ['']
        });

        this.prepareQuery();
        this.loadSpecializations(this.query);
    }

    loadSpecializations(query: string) {
        this.specializationsService.getSpecializations(query)
            .pipe(first())
            .subscribe(
                res => {
                    this.specializations = res.data.specializations;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, {
                        autoClose: true
                    })
                    window.scrollTo(0,0);
                }
            )
    }

    specializationToDeleteId: string;

    setSpecializationToDelete(id: string) {
        this.specializationToDeleteId = id;
    }

    deleteSpecialization() {
        if (this.specializationToDeleteId)
            this.specializationsService.deleteSpecialization(this.specializationToDeleteId)
                .pipe(first())
                .subscribe(
                    res => {
                        this.alertService.success('Specialization has been deleted.', {
                            autoClose: true
                        });
                        this.prepareQuery();
                        this.loadSpecializations(this.query);
                    },
                    err => {
                        this.alertService.clear();
                        this.alertService.error(err, {
                            autoClose: true
                        })
                        window.scrollTo(0,0);
                    }
                )
    }

    editSpecialization(id: string) {
        this.router.navigate([`/admin/groups/specializations/${id}/edit`]);
    }

    archiveSpecialization(id: string) {
        this.specializationsService.archiveSpecialization(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.prepareQuery();
                    this.loadSpecializations(this.query);
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    window.scrollTo(0, 0);
                }
            )
    }

    onFilterFormSubmit() {
        this.prepareQuery();
        this.loadSpecializations(this.query);
    }

    get f() { return this.filterForm.controls; }

    clearQuery() {
        this.query = `?isArchive=0`;
    }

    prepareQuery() {
        this.clearQuery();
        this.query += this.getFilterQuery();
        if (this.sort.property !== null && this.sort.order !== null)
            this.query += `&sort=${this.sort.property},${this.sort.order}`;
    }

    getFilterQuery() {
        let query = '';

        if (this.f.name.value) query += `&name=${this.f.name.value}`;
        if (this.f.short.value) query += `&short=${this.f.short.value}`;

        return query;
    }

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
        this.loadSpecializations(this.query);
    }
}