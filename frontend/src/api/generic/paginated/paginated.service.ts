import { tap } from "rxjs";
import { trackRequestResult } from "@ngneat/elf-requests";
import { DirectCrudService } from "../direct-crud.service";
import { HttpParams } from "@angular/common/http";
import { OperationNames } from "../operation-names.enum";
import { Page } from "../page/page";
import { PaginationData } from "@ngneat/elf-pagination";
import { Id } from "../id.model";
import { EntityService } from "../entities/entity.service";
import { PaginatedRepository } from "./paginated.repository";

export abstract class PaginatedService<T extends Id> extends EntityService<T> {

  protected constructor(
    override readonly directCrud: DirectCrudService,
    private pageinatedRepository: PaginatedRepository<T>) {
    super(directCrud, pageinatedRepository)
  }

  sort: string = ""

  // see comment on updatePage for why I skip cache
  getPage(pageParams: PaginationData<number> ) {
    const jpaPage = this.convertToJpaPage(pageParams)
    return this.directCrud.get<Page<T>>(`${this.getBasePath()}`, jpaPage)
      .pipe(
        tap((r) => {
        const pageinationData = this.convertToPage(r)
        this.pageinatedRepository.updatePage(pageinationData);
      }),
        trackRequestResult([this.pageinatedRepository.getStoreName(), OperationNames.GET], { skipCache: true })
      ).subscribe()
  }

  getFirstPage() {
    return this.getPage({ perPage: 10, currentPage: 0, total: 0, lastPage: 10  })
  }

  override post(obj: T) {
    this.pageinatedRepository.clearPages()
    return super.post(obj);
  }

  override put(obj: T) {
    this.pageinatedRepository.clearPages()
    return super.put(obj)
  }

  override delete(idParam: number) {
    this.pageinatedRepository.clearPages()
    return super.delete(idParam)
  }

  // Also annoying is that JPA, Elf and PrimeNG all use slightly different verbage for pageSize, total pages, etc
  protected convertToPage(jpaPage: Page<T>): PaginationData<number>  & { data: T[] } {
      const pageData: PaginationData<number>  & { data: T[] } = {
        total: jpaPage.page.totalElements,
        perPage: jpaPage.page.size,
        lastPage: jpaPage.page.totalPages,
        currentPage: jpaPage.page.number,
        data: jpaPage.content
      }
      return pageData;
  }

  protected convertToJpaPage(page: PaginationData<number>): HttpParams {
    var params = new HttpParams()
        .append("page", page.currentPage)
        .append("size", page.perPage)
        .append("sort", this.sort);
    return params;
}
}