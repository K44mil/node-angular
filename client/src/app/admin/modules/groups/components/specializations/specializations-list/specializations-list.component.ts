import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { Specialization } from '../../../models';

import { SpecializationsService } from '../../../services/specializations.service';

@Component({ templateUrl: 'specializations-list.component.html' })
export class SpecializationsListComponent implements OnInit {
    specializations: Specialization[];

    constructor(
        private specializationsService: SpecializationsService,
        private alertService: AlertService
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
}