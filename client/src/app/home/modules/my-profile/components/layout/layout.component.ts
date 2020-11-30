import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '@app/home/modules/account/models';
import { PageService } from '@app/home/services';
import { AuthService } from '@app/shared/services';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'layout.component.html',
    styles: [
        `
            a.nav-link {
                cursor: pointer;
                color: #303030;
            }
            .active {
                background: #303030 !important;
            }
        `
    ]
})
export class LayoutComponent implements OnInit, OnDestroy {
    loggedUser: AuthUser;

    pageSub: Subscription;

    constructor(
        private authService: AuthService,
        private pageService: PageService
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.userValue;

        this.pageSub = this.pageService.profilePage.subscribe(p => {
            const generalLink = document.getElementById('general-link');
            const securityLink = document.getElementById('security-link');
            const groupsLink = document.getElementById('groups-link');
            
            switch (p) {
                case 'general':
                    if (generalLink) generalLink.classList.add('active');
                    if (securityLink) securityLink.classList.remove('active');
                    if (groupsLink) groupsLink.classList.remove('active');
                    break;
                case 'security':
                    if (generalLink) generalLink.classList.remove('active');
                    if (securityLink) securityLink.classList.add('active');
                    if (groupsLink) groupsLink.classList.remove('active');
                    break;
                case 'groups':
                    if (generalLink) generalLink.classList.remove('active');
                    if (securityLink) securityLink.classList.remove('active');
                    if (groupsLink) groupsLink.classList.add('active');
                    break;
            }
        })
    }

    ngOnDestroy() {
        this.pageSub.unsubscribe();
    }
}