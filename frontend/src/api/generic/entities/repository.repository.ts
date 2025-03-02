import { select, Store } from "@ngneat/elf";
import { Observable, startWith } from "rxjs";
import { joinRequestResult, RequestResult } from '@ngneat/elf-requests';
import { getEntity, selectAllEntities, selectEntity, setEntities } from '@ngneat/elf-entities';
import { filterError } from '@ngneat/elf-requests';
import { ErrorRequestResult } from "@ngneat/elf-requests/src/lib/requests-result";
import { OperationNames } from "../operation-names.enum";
import { Id } from "../id.model";

export class Repository<T extends Id> {

    constructor(public store: Store) {
    }

    // Join request result will apply the loading, error information with a request
    selectEntities(operationName: OperationNames): Observable<RequestResult<any, any> & { data: T[]; }> {
        return this.store.pipe(
            selectAllEntities(),
            joinRequestResult([this.getStoreName(), operationName], { initialStatus: 'idle' })
        );
    }

    selectLoading(operationName: OperationNames): Observable<boolean> {
        return this.selectEntities(operationName).pipe(select((state) => state.isLoading))
    }

    selectError(operationName: OperationNames): Observable<ErrorRequestResult<any>> {
        return this.selectEntities(operationName).pipe(
            filterError(),
            startWith({isError: false} as unknown as ErrorRequestResult)
        );
    }

    update(user: T) {
        this.store.update((state) => ({
            ...state,
            user,
        }));
    }

    select(): Observable<T[]> {
        return this.store.pipe(selectAllEntities())
    }

    selectStoreValue(): Observable<T> {
        return this.store.value
    }

    selectById(id: string): Observable<T> {
        return this.store.pipe(selectEntity(id))
    }

    getById(id: string): T {
        return this.store.query(getEntity(id));
    }

    set(objs: T[]) {
        this.store.update(setEntities(objs));
    }


    getStoreName(): string {
        return this.store.name;
    }

    getValue() {
        return this.store.getValue();
    }
}