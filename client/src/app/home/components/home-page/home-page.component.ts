import { Component, OnInit } from '@angular/core';
import { News } from '@app/admin/modules/news/models/News';
import { PageService } from '@app/home/services';
import { AuthService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'home-page.component.html',
    styles: [`
        .lock-icon {
            color: #fff;
            font-size: 1rem;
            cursor: mark;
        }
    `]
})
export class HomePageComponent implements OnInit {
    public news: News[];
    public slider;

    constructor(
        private pageService: PageService,
        private authService: AuthService
    ) {
        
    }

    ngOnInit() {
        this.loadLatestNews();
        this.loadSlider();
    }

    loadLatestNews() {
        this.pageService.getNews('?limit=3')
        .pipe(first())
        .subscribe(res => {
            this.news = res.data.news;
        });
    }

    loadSlider() {
        this.pageService.getSlider()
            .pipe(first())
            .subscribe(
                res => {
                    this.slider = res.data.slider;
                },
                err => {
                    console.log(err);
                }
            )
    }

    getSlideUrl(image) {
        return `${environment.hostUrl}/uploads/slider/${image}`;
    }

    getNewsPhotoUrl(news) {
        return `${environment.hostUrl}/uploads/news/${news.image}`;
    }

    getNewsLink(news) {
        return `/news/${news.slug}`;
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    canActivate(news) {
        if (news.isLoginProtected && !this.authService.userValue) return false;
        return true;
    }
}