import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { io } from 'socket.io-client';
import { PageService } from '../services';

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
                            <div *ngIf="!cookiesAccepted" class="cookies">
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
                            .cookies {
                                position: fixed;
                                left: 0;
                                bottom: 0;
                                width: 100%;
                                background-color: #EBEBEB;
                                color: #303030;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 1rem;
                            }
                        `]
})
export class LayoutComponent implements OnInit {
    cookiesAccepted: boolean = false;
    public socket;

    constructor(
        private titleService: Title,
        private pageService: PageService
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Home Page');
    }

    ngOnInit() {
        const cookiesAccepted = sessionStorage.getItem('_c');
        if (cookiesAccepted) this.cookiesAccepted = true;

        this.socket = io(environment.serverUrl, { withCredentials: true });
        this.socket.on('countOnline', (res) => {
                this.pageService.online.next(res.online);
        });
    }

    acceptCookies() {
        this.cookiesAccepted = true;
        sessionStorage.setItem('_c', '1');
    }

    getCurrentYear() {
        return new Date().getFullYear();
    }

}