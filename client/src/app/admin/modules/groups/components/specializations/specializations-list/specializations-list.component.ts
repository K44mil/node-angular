import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Specialization } from '../../../models';

import { SpecializationsService } from '../../../services/specializations.service';

@Component({ templateUrl: 'specializations-list.component.html' })
export class SpecializationsListComponent implements OnInit {
    specializations: Specialization[];

    constructor(
        private specializationsService: SpecializationsService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadSpecializations();
    }

    loadSpecializations() {
        this.specializationsService.getSpecializations()
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

    deleteSpecialization(id: string) {
        this.specializationsService.deleteSpecialization(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.success('Specialization has been deleted.', {
                        autoClose: true
                    });
                    this.loadSpecializations();
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
}