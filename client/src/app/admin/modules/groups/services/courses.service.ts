import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Course } from '../models';


@Injectable({ providedIn: 'root' })
export class CoursesService {

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<any>(`${environment.apiUrl}/courses`);
    }

    createCourse(course: Course) {
        return this.http.post<any>(`${environment.apiUrl}/courses`, course);
    }

    deleteCourse(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/courses/${id}`);
    }
}