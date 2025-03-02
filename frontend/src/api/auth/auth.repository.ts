import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { createStore, withProps, select, Store } from '@ngneat/elf';
import { Auth } from "./auth.model";
import { joinRequestResult, RequestResult } from "@ngneat/elf-requests";

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {

    store: Store;

    constructor() {
        this.store = createStore(
            { name: "auth" },
            withProps<Auth>({ id: '', username: undefined, password: undefined, authorities: [], expires: 0 })
        );
    }

    getUserId(): string | undefined {
        return this.store.getValue().id
    }

    getHeaders(): HttpHeaders {
        return this.createHeaders(this.store.getValue().username, this.store.getValue().password)
    }

    createHeaders(username: string, password: string) {
        return new HttpHeaders()
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json')
            .append('Authorization', `Basic ${btoa(username! + ':' + password!)}`)
    }

    getEntity(): Observable<RequestResult<any, any> & { data: Auth; }> {
        return this.store.pipe(
            joinRequestResult([this.getStoreName()])
        );
    }

    update(user: Auth) {
        this.store.update((state) => ({
            ...state,
            user,
        }));
    }

    selectLoading(): Observable<boolean> {
        return this.getEntity().pipe(select((state) => state.isLoading))
    }


    getStoreName(): string {
        return this.store.name;
    }
}