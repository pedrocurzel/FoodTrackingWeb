import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { registerDTO } from '../../models/auth/registerDTO';
import { loginDTO } from '../../models/auth/loginDTO';
import { environment } from '../../../environments/environment.development';
import successLoginDTO from '../../models/auth/successLoginDTO';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    endpoint = environment.api + "/Auth";

    http = inject(HttpClient);

    constructor() { }

    register(registerDTO: registerDTO) {
        return this.http.post(
            this.endpoint + '/register',
            registerDTO,
            {
                headers: {
                    "skip-token": "true"
                }
            }
        );
    }

    login(loginDTO: loginDTO) {
        return this.http.post<successLoginDTO>(
            this.endpoint + '/login',
            loginDTO,
            {
                headers: {
                    "skip-token": "true"
                }
            }
        );
    }

    handleLogin(successLoginDTO: successLoginDTO) {
        localStorage.setItem("user-email", successLoginDTO.email);
        localStorage.setItem("user-token", successLoginDTO.token);
        localStorage.setItem("user-id",    successLoginDTO.userId);
    }

    clearStorage() {
        localStorage.clear();
    }

    isLogged() {
        if (this.getToken() == null) return of({error: true});

        return this.http.get(this.endpoint + "/validate-token");
    }

    getToken() {
        return localStorage.getItem("user-token");
    }
}
