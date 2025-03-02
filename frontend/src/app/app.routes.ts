import { Routes } from '@angular/router';
import { PersonsPageComponent } from './persons-page/person-page.component';

export const routes: Routes = [
    { path: 'people', component: PersonsPageComponent},
    { path: '**', redirectTo: '/people', pathMatch: 'full' },
];
