import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({ providedIn: 'root' })
export class CoursesService {

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<any>(`${environment.apiUrl}/courses`);
    }
}