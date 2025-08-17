import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-auth',
    imports: [MatTabsModule, MatToolbarModule, LoginComponent, RegisterComponent, MatButtonModule],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent  {
    @ViewChild('matTab') matTab?: MatTabGroup;

    title = "Authentication";

    currentIndex = 0;

    constructor() {
        document.title = this.title;
    }

    changeTab(tab: number) {
        this.currentIndex = tab;
    }
}
