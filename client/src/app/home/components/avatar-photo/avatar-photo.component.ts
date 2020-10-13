import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'avatar-photo',
    templateUrl: 'avatar-photo.component.html',
    styleUrls: ['avatar-photo.component.scss']
})
export class AvatarPhotoComponent implements OnInit {

    @Input() public photoUrl: string;
    @Input() public name: string;

    public showInitials = false;
    public initials: string;
    public circleColor: string;
    private colors = [
        // '#EB7181',
        // '#468547',
        // '#FFD558',
        '#3670B2'
    ];

    ngOnInit() {
        if (!this.photoUrl) {
            this.showInitials = true;
            this.createInitials();

            const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
            this.circleColor = this.colors[randomIndex];
        }
    }

    private createInitials() {
        let initials = "";

        for (let i = 0; i < this.name.length; i++) {
            if (this.name.charAt(i) === ' ') continue;

            if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
                initials += this.name.charAt(i);

                if (initials.length == 2) break;
            }
        }

        this.initials = initials;
    }
}