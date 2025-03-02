import { Injectable } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { AuthRepository } from "./auth.repository";
import { Auth } from "./auth.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { trackRequestResult } from "@ngneat/elf-requests";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(readonly authRepository: AuthRepository,
        private readonly httpClient: HttpClient
    ) {
    }

    tryLogin(auth: Auth): Subscription {
        return this.get(this.getBasePath() + "/login", auth, new HttpParams())
            .pipe(tap((r) => this.authRepository.store.update(state => ({
                ...state,
                ...r,
                password: auth.password
            }))),
                trackRequestResult([this.authRepository.getStoreName()])
            )
            .subscribe();
    }

    private get(url: string, body: Auth, params: HttpParams): Observable<Auth> {
        const options = { headers: this.authRepository.createHeaders(body.username!, body.password!), params }
        return this.httpClient.get<Auth>(url, options)
    }

    getBasePath() {
        return `${environment.API_URL}/${this.authRepository.getStoreName()}`;
    }

    getHeaders() {
        return this.authRepository.getHeaders()
    }

}