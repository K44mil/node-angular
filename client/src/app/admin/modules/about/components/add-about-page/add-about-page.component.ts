import { Component, OnInit } from '@angular/core';

import { AboutPageService } from '../../services/about-page.service';

@Component({ templateUrl: 'add-about-page.component.html' })
export class AddAboutPageComponent implements OnInit {

    constructor(
        private aboutPageService: AboutPageService
    ) { }

    ngOnInit() {

    }
}