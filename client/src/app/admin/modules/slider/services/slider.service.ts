import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class SliderService {

    constructor(private http: HttpClient) { }

    getSliderImages() {
        return this.http.get<any>(`${environment.apiUrl}/slider`);
    }

    deleteSliderImage(id: string) {
        return this.http.delete<any>(`${environment.apiUrl}/slider/${id}`);
    }

    addSliderImage(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/slider`, formData);
    }

}