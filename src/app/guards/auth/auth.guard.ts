import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, of, switchMap } from 'rxjs';
import { showSnackbar } from '../../utils/snackbar';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isLogged()
    .pipe(
        switchMap((isLoggedIn: any) => {
            if (isLoggedIn.error) {
                authService.clearStorage();
                router.navigateByUrl("/auth", {replaceUrl: true});
                return of(false);
            }
            return of(true);
        }),
        catchError(() => {
            authService.clearStorage();
            router.navigateByUrl("/auth", {replaceUrl: true});
            return of(false);
        })
    )
};
