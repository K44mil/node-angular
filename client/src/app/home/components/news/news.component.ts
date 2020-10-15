import { Component, OnInit } from '@angular/core';

import { News } from '@admin/modules/news/models/News';
import { PageService } from '@home/services';
import { first } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService } from '@app/shared/services';

@Component({
    templateUrl: 'news.component.html',
    styles: [
        `
            .lock-icon {
                color: #fff;
                font-size: 1rem;
                cursor: mark;
            }
        `
    ]
})
export class NewsComponent implements OnInit {
    public news: News[];

    constructor(
        private pageService: PageService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.pageService.getNews()
            .pipe(first())
            .subscribe(res => {
                if (res.data.news) this.news = res.data.news;
            })
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