import { select, Store } from "@ngneat/elf";
import { Observable, startWith } from "rxjs";
import { joinRequestResult, RequestResult } from '@ngneat/elf-requests';
import { filterError } from '@ngneat/elf-requests';
import { ErrorRequestResult } from "@ngneat/elf-requests/src/lib/requests-result";
import { OperationNames } from "../operation-names.enum";

export class SingleEntityRepository<T> {

    constructor(protected store: Store) {
    }

    getEntity(operationName: OperationNames): Observable<RequestResult<any, any> & { data: T; }> {
        return this.store.pipe(
            joinRequestResult([this.getStoreName(), operationName], { initialStatus: 'idle' })
        );
    }

    selectLoading(operationName: OperationNames): Observable<boolean> {
        return this.getEntity(operationName).pipe(select((state) => state.isLoading))
    }

    selectError(operationName: OperationNames): Observable<ErrorRequestResult<any>> {
        return this.getEntity(operationName).pipe(
            filterError(),
            startWith({isError: false} as unknown as ErrorRequestResult)
        );
    }

    update(newstate: T) {
        this.store.update((state) => ({
            ...newstate
        }));
    }

    select(): Observable<T> {
        return this.store.pipe()
    }

    getStoreName(): string {
        return this.store.name;
    }

    getValue() {
        return this.store.getValue();
    }
}