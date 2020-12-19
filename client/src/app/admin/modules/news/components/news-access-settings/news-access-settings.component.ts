import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Course } from '@app/admin/modules/groups/models';
import { ModalService } from '@app/shared/services/modal.service';

@Component({
    selector: 'news-access-settings',
    templateUrl: 'news-access-settings.component.html'
})
export class NewsAccessSettings implements OnInit, OnChanges {

    groups: any = [];
    courses: any = [];
    users: any = [];

    access: any = {
        isOn: false,
        courses: [],
        groups: [],
        users: []
    }

    @Input() initAccess: any;

    @Output() accessChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private modalService: ModalService
    ) { }

    ngOnInit() {

    }

    ngOnChanges() {
        if (this.initAccess) {
            this.access.isOn = this.initAccess.isOn;
            
            this.access.courses = [];
            this.access.groups = [];
            this.access.users = [];

            // Init Courses ids
            for (const c of this.initAccess.Courses)
                this.access.courses.push(c.id);

            // Init Groups ids
            for (const g of this.initAccess.Groups)
                this.access.groups.push(g.id);

            // Init Users ids
            for (const u of this.initAccess.Users)
                this.access.users.push(u.id);
                
            this.courses = this.initAccess.Courses;
            this.groups = this.initAccess.Groups;
            this.users = this.initAccess.Users;
        }
    }

    selectedGroup: any;

    onGroupFinderChanged(event) {
        this.selectedGroup = event;
    }

    confirmGroup() {
        if (this.selectedGroup)
            if (!this.access.groups.includes(this.selectedGroup.id)) {
                this.groups.push(this.selectedGroup);
                this.access.groups.push(this.selectedGroup.id);
                this.accessChanged.emit(this.access);
            }
    }

    removeGroup(id: string) {
        this.access.groups = this.access.groups.filter(g => g !== id);
        this.groups = this.groups.filter(g => g.id !== id);
        this.accessChanged.emit(this.access);
    }

    // MODAL FUNCTIONS
    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    getAddUserModalClasses() {
        return 'col-4,offset-4';
    }

    // Add users
    onUsersAdded(event) {
        const users = event;
        for (const u of users) {
            if (!this.access.users.includes(u.id)) {
                this.users.push(u);
                this.access.users.push(u.id);
                this.accessChanged.emit(this.access);
            }
        }
    }

    removeUser(id: string) {
        this.access.users = this.access.users.filter(u => u !== id);
        this.users = this.users.filter(u => u.id !== id);
        this.accessChanged.emit(this.access);
    }

    choosenCourse: Course;

    onCourseFormChanged(event) {
        this.choosenCourse = event
    }

    addChoosenCourse() {
        if (!this.access.courses.includes(this.choosenCourse.id)) {
            this.courses.push(this.choosenCourse);
            this.access.courses.push(this.choosenCourse.id);
            this.accessChanged.emit(this.access);
        }
    }

    removeCourse(id: string) {
        this.access.courses = this.access.courses.filter(c => c !== id);
        this.courses = this.courses.filter(c => c.id !== id);
        this.accessChanged.emit(this.access);
    }
}