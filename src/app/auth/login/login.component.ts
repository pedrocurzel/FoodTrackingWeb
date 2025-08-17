import { Component, EventEmitter, inject, Input, OnDestroy, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { loginDTO } from '../../models/auth/loginDTO';
import { catchError, delay, EMPTY, finalize, Subscription, switchMap, timeout } from 'rxjs';
import { Router } from '@angular/router';
import { showSnackbar } from '../../utils/snackbar';

@Component({
    selector: 'app-login',
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    hide = signal(true);
    formBuilder = inject(FormBuilder);
    authService = inject(AuthService);
    _snackBar = inject(MatSnackBar);
    loading = signal(false);
    router = inject(Router);

    @Output() changeTabEvent = new EventEmitter();

    form = this.formBuilder.group({
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", [Validators.required]]
    })

    passwordClick(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    changeTab() {
        this.changeTabEvent.emit(1);
    }

    login() {
        if (this.form.valid) {
            this.loading.set(true);
            this.form.disable();

            this.authService.login(this.form.getRawValue() as loginDTO)
            .pipe(
                switchMap(x => {
                    this.authService.handleLogin(x);
                    this.router.navigateByUrl("/diary", {replaceUrl:true});
                    return EMPTY;
                }),
                catchError(x => {
                    this.showErrorMessage(x.error.message);
                    return EMPTY;
                }),
                finalize(() => {
                    this.loading.set(false);
                    this.form.enable();
                })
            )
            .subscribe();
        }
    }

    showErrorMessage(mss: any) {
        showSnackbar(this._snackBar, mss);
    }
}
