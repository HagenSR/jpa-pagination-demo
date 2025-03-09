import { tap } from "rxjs";
import { SubscriberBaseComponent } from "../../../util/ui/SubscriberBaseComponent/SubscriberBaseComponent";
import { trackRequestResult } from "@ngneat/elf-requests";
import { Repository } from "./repository.repository";
import { DirectCrudService } from "../direct-crud.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { OperationNames } from "../operation-names.enum";
import { Id } from "../id.model";

export abstract class EntityService<T extends Id> extends SubscriberBaseComponent {

  protected constructor(
    readonly directCrud: DirectCrudService,
    private repository: Repository<T>) {
    super()
  }

  get() {
    // Note: trackRequestResult will provide our store with information on the loading and error state
    // of a request. It will also do some caching logic, which can be a bit annoying as it will stop 
    // calls from going through.
    return this.directCrud.get<T[]>(`${this.getBasePath()}`, new HttpParams())
      .pipe(tap((r) => this.repository.set(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.GET], { skipCache: true })
      ).subscribe()
  }


  getById(idParam: number) {
    return this.directCrud.get<T>(this.getBasePath(), new HttpParams().append('id', idParam))
      .pipe(tap((r) => this.repository.update(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.BY_ID], { skipCache: true })
      ).subscribe()
  }

  post(obj: T) {
    return this.directCrud.post<T, T>(this.getBasePath(), obj, new HttpParams())
      .pipe(
        tap((r) => this.repository.update(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.POST], { skipCache: true })
      ).subscribe()
  }

  put(obj: T) {
    return this.directCrud.put<T, T>(this.getBasePath(), obj, new HttpParams())
      .pipe(tap((r) => this.repository.update(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.PUT], { skipCache: true })
      ).subscribe()
  }

  delete(idParam: number) {
    return this.directCrud.delete<T>(this.getBasePath(idParam.toString()), new HttpParams())
      .pipe(tap((r) => this.repository.update(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.DELETE], { skipCache: true })
      ).subscribe()
  }

  protected getBasePath(optionalPath?: string): string {
    const idPath = optionalPath ? `/${optionalPath}` : ''
    return `${environment.API_URL}/${this.repository.getStoreName()}${idPath}`
  }
}