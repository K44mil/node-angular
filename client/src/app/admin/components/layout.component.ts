import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({ template: 
                        `
                            <admin-nav></admin-nav>       
                            <admin-side-nav></admin-side-nav>
                            <alert></alert>     
                        `,
})
export class LayoutComponent {
    constructor(private titleService: Title) { this.titleService.setTitle('PhD Tomasz Rak - Admin Panel'); }
}