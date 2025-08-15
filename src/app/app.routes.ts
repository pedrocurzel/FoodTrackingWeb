import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import("./auth/auth.component").then(m => m.AuthComponent)
    },
    {
        path: 'diary',
        loadComponent: () => import("../app/diary/diary.component").then(m => m.DiaryComponent),
        canActivate: [authGuard]
    },
    {
        path: "",
        redirectTo: "diary",
        pathMatch: "full"
    },
];
