import { Component } from '@angular/core';

@Component({    template: 
                        `
                            <div class="content">
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
export class LayoutComponent { }