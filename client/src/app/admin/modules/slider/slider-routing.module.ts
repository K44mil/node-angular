import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AddSliderImageComponent,
    EditSliderImageComponent,
    LayoutComponent,
    SliderImagesListComponent
} from './components';

const routes: Routes = [
    {
       path: '', component: LayoutComponent,
       children: [
           { path: '', component: SliderImagesListComponent },
           { path: 'add_slider_image', component: AddSliderImageComponent },
           { path: 'edit_slider_image/:id', component: EditSliderImageComponent }
       ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SliderRoutingModule { }