import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import("./auth/auth.component").then(m => m.AuthComponent)
    },
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full"
    },
    {
        path: 'diary',
        loadComponent: () => import("../app/diary/diary.component").then(m => m.DiaryComponent)
    }
];
