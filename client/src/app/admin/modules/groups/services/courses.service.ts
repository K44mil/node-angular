import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Course } from '../models';


@Injectable({ providedIn: 'root' })
export class CoursesService {

    constructor(private http: HttpClient) { }

    getCourse(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/courses/${id}`);
    }

    getCourses() {
        return this.http.get<any>(`${environment.apiUrl}/courses`);
    }

    createCourse(course: Course) {
        return this.http.post<any>(`${environment.apiUrl}/courses`, course);
    }

    updateCourse(id: string, course: Course) {
        return this.http.put<any>(`${environment.apiUrl}/courses/${id}`, course);
    }

    deleteCourse(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/courses/${id}`);
    }
}