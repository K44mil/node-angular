import { DOCUMENT } from '@angular/common';
import { AfterContentChecked, Component, Inject, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { News } from '@app/admin/modules/news/models/News';
import { PageService } from '@app/home/services';
import { AuthService } from '@app/shared/services';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
// import { io } from 'socket.io-client';

@Component({
    templateUrl: 'home-page.component.html',
    styles: [`
        .lock-icon {
            color: #fff;
            font-size: 1rem;
            cursor: mark;
        }

        @media(max-width: 1200px) {
            .news {
                margin-top: 10px;
            }
        }

        @media(min-width: 1200px) {
            .uni-links {
                margin-left: 10px;
            }
        }

        @media(max-width: 992px) {
            .info {
                margin-top: 10px;
            }
            .uni-img {
                margin-top: 10px;
                margin-left: auto;
                margin-right: auto;
                width: 55px;
                height: 100px;
            }
            .uni-links {
                text-align: center;
                margin: 0;
                padding: 0;
            }
            .counters {
                display: none;
            }
        }
    `]
})
export class HomePageComponent implements OnInit, AfterContentChecked, OnChanges, OnDestroy {
    public news: News[];
    public slider;
    public contact: any;
    loading: boolean = true;
    itemsLoaded: number = 0;

    // socket connection
    // private socket;

    loggedSub: Subscription;
    onlineSub: Subscription;

    constructor(
        private pageService: PageService,
        private authService: AuthService,
        private titleService: Title,
        private renderer2: Renderer2,
        @Inject(DOCUMENT) private _document,
        // private socketService: SocketService
    ) {
        this.titleService.setTitle('PhD Tomasz Rak - Home Page');
    }

    ngOnInit() {
        // this.socketService.socket.on('countOnline', (res) => {
        //     this.contact.online = res.online;
        // });

        this.loadLatestNews();
        this.loadSlider();
        this.loadContact();

        this.onlineSub = this.pageService.online.subscribe(value => {
            if (value)  this.contact.online = value;
        });

        this.loggedSub = this.pageService.loggedOut.subscribe(value => {
            if (value) this.loadLatestNews();
        });
    }

    ngOnDestroy() {
        this.loggedSub.unsubscribe();
        this.onlineSub.unsubscribe();
    }

    ngOnChanges() { }

    ngAfterContentChecked() {
        const badge = document.getElementById('badgeCont733');
        if (badge) {
            const script = this.renderer2.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://publons.com/mashlets?el=badgeCont733&rid=G-1895-2012"';
            script.text = '';
            const badge = document.getElementById('badgeCont733');
            badge.appendChild(script);
        }
    }

    loadLatestNews() {
        this.pageService.getNews('?limit=6')
        .pipe(first())
        .subscribe(res => {
            this.news = res.data.news;
            this.itemsLoaded++;
            if (this.itemsLoaded === 3) this.loading = false;
        });
    }

    loadSlider() {
        this.pageService.getSlider()
            .pipe(first())
            .subscribe(
                res => {
                    this.slider = res.data.slider;
                    this.itemsLoaded++;
                    if (this.itemsLoaded === 3) this.loading = false;
                },
                err => {
                    
                }
            )
    }

    loadContact() {
        this.pageService.getContact()
            .pipe(first())
            .subscribe(
                res => {
                    this.contact = res.data.contact;
                    this.itemsLoaded++;
                    if (this.itemsLoaded === 3) this.loading = false;
                },
                err => {

                }
            )
    }

    getSlideUrl(image) {
        return `${environment.serverUrl}/uploads/slider/${image}`;
    }

    getNewsPhotoUrl(news) {
        return `${environment.serverUrl}/uploads/news/${news.image}`;
    }

    getNewsLink(news) {
        return `/news/${news.slug}`;
    }

    canActivate(news) {
        if (news.isLoginProtected && !this.authService.userValue) return false;
        return true;
    }

    printDate(dateUTC) {
        return new Date(dateUTC).toLocaleString('pl', {
            hour: 'numeric',
            minute: 'numeric',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    getUniversityPhotoUrl() {
        if (this.contact && this.contact.university)
            return `${environment.serverUrl}/uploads/${this.contact.university.image}`;
        return '';
    }

    truncateNewsDescription(desc: string) {
        if (desc && desc.length > 50)
            return `${desc.substring(0, 50)}...`;
        return desc;
    }
}