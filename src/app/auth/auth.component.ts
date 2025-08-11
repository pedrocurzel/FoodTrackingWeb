import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
    selector: 'app-auth',
    imports: [MatTabsModule, MatToolbarModule, LoginComponent, RegisterComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss'
})
export class AuthComponent {
    @ViewChild('matTab') matTab?: MatTabGroup;

    title = "Authentication";

    currentIndex = 0;

    registerEmitted() {
        this.currentIndex = 1;
    }

}
