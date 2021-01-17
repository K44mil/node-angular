import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components';

const usersModule = () => import('./modules/users/users.module').then(x => x.UsersModule);
const aboutModule = () => import('./modules/about/about.module').then(x => x.AboutModule);
const groupsModule = () => import('./modules/groups/groups.module').then(x => x.GroupsModule);
const newsModule = () => import('./modules/news/news.module').then(x => x.NewsModule);
const announcementsModule = () => import('./modules/announcements/announcements.module').then(x => x.AnnouncementsModule);
const filesModule = () => import('./modules/files/files.module').then(x => x.FilesModule);
const contactModule = () => import('./modules/contact/contact.module').then(x => x.ContactModule);
const sliderModule = () => import('./modules/slider/slider.module').then(x => x.SliderModule);
const backupModule = () => import('./modules/backup/backup.module').then(x => x.BackupModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'users', loadChildren: usersModule },
            { path: 'about', loadChildren: aboutModule },
            { path: 'groups', loadChildren: groupsModule },
            { path: 'news', loadChildren: newsModule },
            { path: 'files', loadChildren: filesModule },
            { path: 'announcements', loadChildren: announcementsModule },
            { path: 'contact', loadChildren: contactModule },
            { path: 'slider', loadChildren: sliderModule },
            { path: 'backup', loadChildren: backupModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }