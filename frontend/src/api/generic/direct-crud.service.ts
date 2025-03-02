import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DirectCrudService implements CrudService {

    constructor(private readonly httpClient: HttpClient,
        private readonly authService: AuthService) {

    }

    get<R>(url: string, params: HttpParams): Observable<R> {
        const options = { headers: this.authService.getHeaders(), params }
        return this.httpClient.get<R>(url, options)
    }

    delete<R>(url: string, params: HttpParams): Observable<R> {
        const options = { headers: this.authService.getHeaders(), params }
        return this.httpClient.delete<R>(url, options)
    }

    post<P, R = P>(url: string, body: P, params: HttpParams): Observable<R> {
        const options = { headers: this.authService.getHeaders(), params }
        return this.httpClient.post<R>(url, body, options)
    }

    put<P, R = P>(url: string, body: P, params: HttpParams): Observable<R> {
        const options = { headers: this.authService.getHeaders(), params }
        return this.httpClient.put<R>(url, body, options);
    }
}