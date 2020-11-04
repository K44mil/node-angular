import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { News } from '@admin/modules/news/models/News';
import { Comment } from '@admin/modules/news/models/Comment';
import { PageService } from '@home/services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, AuthService } from '@app/shared/services';
import { AuthUser } from '@app/home/modules/account/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'news-details.component.html',
    styles: [
        `
            .user-name {
                font-size: 1.3rem;
            }
            .comment-break {
                width: 75%;
            }

            .file {
                color: #0000EE;
            }

            .file:hover {
                cursor: pointer;
            }
        `
    ]
})
export class NewsDetailsComponent implements OnInit {
    public news: News;
    public comments: Comment[];
    public loggedUser: AuthUser;
    commentForm: FormGroup;

    constructor(
        private pageService: PageService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        this.loggedUser = this.authService.userValue;
    }

    ngOnInit() {
        this.commentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });

        const slug = this.route.snapshot.paramMap.get('slug');
        this.pageService.getNewsBySlug(slug)
            .pipe(first())
            .subscribe(
                res => {
                    this.news = res.data.news
                    if (this.news) {
                        this.pageService.getComments(this.news.id)
                            .pipe(first())
                            .subscribe(res => {
                                if (res.data.comments) this.comments = res.data.comments;
                            });
                    }
                },
                err => {
                    this.alertService.error(err);
                    this.router.navigate(['/']);
            });
    }

    getNewsPhotoUrl(news) {
        return `${environment.hostUrl}/uploads/news/${news.image}`;
    }

    printDate(dateUTC) {
        const date = new Date(dateUTC);
        return date.toLocaleString('pl');
    }

    getUserName(firstName, lastName) {
        return `${firstName} ${lastName}`;
    }

    get f() { return this.commentForm.controls; }

    onSubmit() {
        if (this.commentForm.invalid) return;

        this.pageService.addComment(this.news.id, this.f.content.value)
            .pipe(first())
            .subscribe(
                res => {         
                    this.alertService.success('Comment added.', { autoClose: true });
                    this.comments.reverse();
                    this.comments.push(res.data.comment);
                    this.comments.reverse();
                },
                err => console.log(err)
            );

        this.commentForm.reset();
    }

    downloadFile(id, fileName, fileType) {
        this.pageService.downloadFile(id)
            .pipe(first())
            .subscribe(res => {
                let blob: any = new Blob([res], { type: `${fileType}` });
                let url = window.URL.createObjectURL(blob);
                let anchor = document.createElement('a');
                anchor.download = fileName;
                anchor.href = url;
                anchor.click();
                // window.open(url);
            }, 
            err => {
                this.alertService.error(err);
            })
    }

}