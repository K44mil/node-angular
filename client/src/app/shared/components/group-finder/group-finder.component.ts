import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'group-finder',
    templateUrl: 'group-finder.component.html'
})
export class GroupFinderComponent implements OnInit {
    groupFinderForm: FormGroup;

    @Input() groups;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.groupFinderForm = this.formBuilder.group({

        });
    }
}