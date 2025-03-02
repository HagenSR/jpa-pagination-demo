import { Observable } from "rxjs";
import { HttpParams } from '@angular/common/http'

export interface CrudService {
    get<T>(url: string, params: HttpParams): Observable<T>
    delete<T>(url: string, params: HttpParams): Observable<T>
    post<T>(url: string, body: T, params: HttpParams): Observable<T>
    put<T>(url: string, body: T, params: HttpParams): Observable<T>
}