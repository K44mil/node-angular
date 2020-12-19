import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { Course } from '@app/admin/modules/groups/models';
import { CoursesService } from '@app/admin/modules/groups/services/courses.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'courses-finder',
    templateUrl: 'courses-finder.component.html'
})
export class CoursesFinderComponent implements OnInit {

    courses: Course[];
    choosenCourse: FormControl;

    @Output() formChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private coursesService: CoursesService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.choosenCourse = new FormControl('');

        this.loadCourses();
    }

    loadCourses() {
        this.coursesService.getCourses()
            .pipe(first())
            .subscribe(
                res => {
                    this.courses = res.data.courses;
                },
                err => {
                    
                }
            )
    }

    onCoursesFormChange() {
        const course = this.courses.find(c => c.id === this.choosenCourse.value);
        this.formChanged.emit(course);
    }
}