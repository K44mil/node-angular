import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
    selector: 'presence-details',
    templateUrl: 'presence-details.component.html'
})
export class PresenceDetailsComponent implements OnInit, OnChanges {
    presence: any;

    @Input() presenceId: string;

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService,
        private modalService: ModalService
    ) { }

    ngOnInit() {

    }

    ngOnChanges() {
        if (this.presenceId) {
            this.groupsService.getPresence(this.presenceId)
            .pipe(first())
            .subscribe(
                res => {
                    // console.log(res.data);
                    this.presence = res.data.presence;
                },
                err => {
                    
                }
            )
        }
    }

    printDate(dateUTC: string) {
        const date = new Date(dateUTC);
        return date.toLocaleString("pl", {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}