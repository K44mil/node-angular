import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@app/shared/services';
import { first } from 'rxjs/operators';

@Component({ template: 
                        `
                            <admin-nav *ngIf="isAdmin()"></admin-nav>       
                            <admin-side-nav *ngIf="isAdmin()"></admin-side-nav> 

                            <div *ngIf="!isAdmin()" class="d-flex flex-column justify-content-center align-items-center" style="width: 100vw; height: 80vh;">
                                <div class="spinner-border" style="width: 6rem; height: 6rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="mt-4">
                                    <h5>Authentication</h5>
                                </div>
                            </div>
                            
                        `,
})
export class LayoutComponent implements OnInit {

    constructor(
        private titleService: Title,
        private authService: AuthService
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Admin Panel');
    }

    ngOnInit() {
        if (!this.isAdmin())
            this.isAuthenticated();
    }

    public isAdmin(): boolean {
        if (this.authService.admin === true) return true;
        else return false;
    }

    private isAuthenticated() {
        this.authService.isAdmin()
        .pipe(first())
        .subscribe(
            res => {
                if (res.success == true)
                    this.authService.admin = true;
            }
        )
    }
}