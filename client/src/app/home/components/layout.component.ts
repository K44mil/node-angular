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
                            <div class="footer">
                                <div class="text-center">
                                    Footer
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
                                background-color: #303030;
                                color: #fff;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                font-size: 1rem;
                            }
                        `]
})
export class LayoutComponent {
    constructor(private titleService: Title) { this.titleService.setTitle('PhD Tomasz Rak - Home Page'); }
}