import { Component, EventEmitter, inject, OnDestroy, Output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { verifyPassword } from '../custom-validators/custom.validators';
import { registerDTO } from '../../models/auth/registerDTO';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, finalize, Observable, Subscription, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { showSnackbar } from '../../utils/snackbar';

@Component({
    selector: 'app-register',
    imports: [MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    
    @Output() changeTabEvent = new EventEmitter();

    hide = signal(true); //will control both password and confirm-password
    loading = signal(false);

    formBuilder = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);
    _snackBar = inject(MatSnackBar);
    

    registerSubscription$!: Subscription;

    form = this.formBuilder.group({
        "username": ["", Validators.required],
        "email": ["", [Validators.required, Validators.email]],
        "password": ["", Validators.required],
        "confirmPassword": ["", [Validators.required]],
    }, {
        validators: [verifyPassword]
    })

    changeTab() {
        this.changeTabEvent.emit(0);
    }

    passwordClick(event: Event) {
        this.hide.set(!this.hide());
        event.stopPropagation();
    }

    register() {
        if (this.form.valid) {
            this.loading.set(true);
            this.form.disable();

            let rawForm = this.form.getRawValue() as any;
            delete rawForm.confirmPassword;
            let registerDTO = rawForm as registerDTO;

            this.registerSubscription$ = this.authService.register(registerDTO)
            .pipe(
                switchMap(
                    x => this.authService.login({email: registerDTO.email, password: registerDTO.password})
                    .pipe(
                        switchMap(successLoginDTO => {
                            this.authService.handleLogin(successLoginDTO);
                            this.router.navigateByUrl("/diary", {replaceUrl: true});
                            return EMPTY;
                        })
                    )
                ),
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
