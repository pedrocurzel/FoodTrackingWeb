import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { routes } from './app.routes';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatToolbarModule, MatSidenavModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'FoodTrackingWeb';
    router = inject(Router);

    currentRoute?: string;

    constructor() {
        this.router.events.pipe(
            filter(x => x instanceof NavigationEnd),
        ).subscribe(route => {
            this.currentRoute = route.urlAfterRedirects;
        })
    }
}
