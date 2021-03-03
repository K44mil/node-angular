import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/services';
import { first } from 'rxjs/operators';
import { BackupService } from './backup.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent implements OnInit {
    public backup: any;
    backupLoaded: boolean = false;
    restoreLoading: boolean = false;
    createLoading: boolean = false;

    constructor(
        private alertService: AlertService,
        private backupService: BackupService
    ) {
        
    }

    ngOnInit() {
        this.loadBackup();
    }

    loadBackup() {
        this.backupService.getBackup()
            .pipe(first())
            .subscribe(
                res => {
                    this.backup = res.data.backup;
                    this.backupLoaded = true;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                }
            )
    }

    createBackup() {
        this.createLoading = true;
        this.backupService.createBackup()
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Backup has been created.', { autoClose: true });
                    this.backup = res.data.backup;
                    this.createLoading = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    this.createLoading = false;
                }
            )
    }

    restoreBackup() {
        this.restoreLoading = true;
        this.backupService.restoreBackup()
            .pipe(first())
            .subscribe(
                res => {
                    this.alertService.clear();
                    this.alertService.success('Data has been restored.', { autoClose: true });
                    this.restoreLoading = false;
                },
                err => {
                    this.alertService.clear();
                    this.alertService.error(err, { autoClose: true });
                    this.restoreLoading = false;
                }
            )
    }

    formatDate(dateUTC: string) {
        return new Date(dateUTC).toLocaleString('pl', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}