import { tap } from "rxjs";
import { SubscriberBaseComponent } from "../../../util/ui/SubscriberBaseComponent/SubscriberBaseComponent";
import { trackRequestResult } from "@ngneat/elf-requests";
import { DirectCrudService } from "../direct-crud.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { OperationNames } from "../operation-names.enum";
import { SingleEntityRepository } from "./single-entity.repository";

export abstract class SingleEntityService<T> extends SubscriberBaseComponent {

  protected constructor(
    readonly directCrud: DirectCrudService,
    private repository: SingleEntityRepository<T>) {
    super()
  }

  get() {
    return this.directCrud.get<T>(`${this.getBasePath()}`, new HttpParams())
      .pipe(tap((r) => this.repository.update(r)),
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
    return this.directCrud.delete<T>(this.getBasePath(), new HttpParams().append('id', idParam))
      .pipe(tap((r) => this.repository.update(r)),
        trackRequestResult([this.repository.getStoreName(), OperationNames.DELETE], { skipCache: true })
      ).subscribe()
  }

  protected getBasePath(id?: string): string {
    const idPath = id ? `/${id}` : ''
    return `${environment.API_URL}/${this.repository.getStoreName()}${idPath}`
  }
}