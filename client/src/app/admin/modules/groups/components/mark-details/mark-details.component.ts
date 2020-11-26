import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { ModalService } from '@app/shared/services/modal.service';
import { first } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
    selector: 'mark-details',
    templateUrl: 'mark-details.component.html'
})
export class MarkDetailsComponent implements OnInit, OnChanges {
    mark: any;

    @Input() markId: string;

    @Output() markDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() markEdited: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private groupsService: GroupsService,
        private alertService: AlertService,
        private modalService: ModalService
    ) { }

    ngOnInit() {}

    ngOnChanges() {
        if (this.markId) {
            this.groupsService.getMark(this.markId)
            .pipe(first())
            .subscribe(
                res => {             
                    this.mark = res.data.mark;
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

    deleteMark(id: string) {
        this.groupsService.deleteMark(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Mark has been deleted.', {
                        autoClose: true
                    });
                    this.modalService.close('mark-modal');
                    this.markDeleted.emit(true);
                },
                err => {

                }
            )
    }

    editMark(id: string) {
        this.modalService.close('mark-modal');
        this.markEdited.emit(id);
    }

}