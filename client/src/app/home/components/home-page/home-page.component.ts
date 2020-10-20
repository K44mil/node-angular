import { Component, OnInit } from '@angular/core';
import { News } from '@app/admin/modules/news/models/News';
import { PageService } from '@app/home/services';
import { AuthService } from '@app/shared/services';
import { environment } from '@env/environment';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'home-page.component.html'
})
export class HomePageComponent implements OnInit {
    public news: News[];

    constructor(
        private pageService: PageService,
        private authService: AuthService
    ) {
        
    }

    ngOnInit() {
        this.pageService.getNews()
            .pipe(first())
            .subscribe(res => {
                if (res.data.news) this.news = res.data.news;
                let i = 0;
                this.news = this.news.filter((news) => {
                    if (i++ < 3) return news;
                });
            });
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