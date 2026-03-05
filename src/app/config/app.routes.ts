import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Notfound } from '../pages/notfound/notfound'

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
    } ,
    {
        path: '404',
        component: Notfound,
    },
    {
        path: '**',
        redirectTo: '404'
    },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
