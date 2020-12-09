import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    LayoutComponent,
    NewsListComponent,
    AddNewsComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    EditCategoryComponent
} from './components';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: NewsListComponent },
            { path: 'add_news', component: AddNewsComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'add_category', component: AddCategoryComponent },
            { path: 'edit_category/:id', component: EditCategoryComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }