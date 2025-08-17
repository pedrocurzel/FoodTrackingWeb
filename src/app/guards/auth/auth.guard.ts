import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { showSnackbar } from '../../utils/snackbar';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const invalid = () => {
        authService.clearStorage();
        router.navigateByUrl("/auth", { replaceUrl: true });
        return of(false);
    }

    return authService.isLogged()
    .pipe(
        switchMap((isLoggedIn: any) => {
            if (isLoggedIn.error) {
                return invalid();
            }
            return of(true);
        }),
        catchError(() => {
            return invalid();
        })
    )
};


