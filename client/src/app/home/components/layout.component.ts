import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({    template: 
                        `
                            <div class="content">
                                <announcements></announcements>
                                <main-nav></main-nav>
                                <alert></alert>
                                <router-outlet></router-outlet>
                            </div>
                            <div *ngIf="cookiesAccepted" class="footer">
                                <div class="text-center">
                                    &copy; {{ getCurrentYear() }}
                                </div>
                            </div>
                            <div *ngIf="!cookiesAccepted" class="footer">
                                <div class="text-center">
                                    By using this site you agree to use cookies in accordance with your current browser settings, which you may change at any time.
                                    <button class="btn badge badge-pil btn-outline-secondary p-1" (click)="acceptCookies()">Close</button>
                                </div>
                            </div>
                        `,
                styles: [`
                            .content {
                                min-height: calc(100vh - 60px);
                            }
                            .footer {
                                height: 40px;
                                margin-top: 20px;
                                background-color: #EBEBEB;
                                color: #303030;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 1rem;
                            }
                        `]
})
export class LayoutComponent {
    cookiesAccepted: boolean = false;

    constructor(private titleService: Title) {
        this.titleService.setTitle('PhD Tomasz Rak - Home Page');
    }

    acceptCookies() {
        this.cookiesAccepted = true;
    }

    getCurrentYear() {
        return new Date().getFullYear();
    }

}