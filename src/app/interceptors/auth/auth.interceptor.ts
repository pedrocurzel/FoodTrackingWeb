import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const { headers } = req;

    let authService = inject(AuthService);

    if (headers.has("skip-token")) {
        var clone = req.clone({
            headers: headers.delete("skip-token")
        });
        return next(clone);
    }

    var clone = req.clone({
        headers: headers.set("Authorization", `Bearer ${authService.getToken()}`)
    })

    return next(clone);
};
