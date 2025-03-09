import { DirectCrudService } from "../direct-crud.service";
import { PaginationData } from "@ngneat/elf-pagination";
import { Id } from "../id.model";
import { PaginatedSearchRepository } from "./paginated-search.repository";
import { PaginatedService } from "../paginated/paginated.service";

export abstract class PaginatedSearchService<T extends Id> extends PaginatedService<T> {

  protected constructor(
    override readonly directCrud: DirectCrudService,
    protected override pageinatedRepository: PaginatedSearchRepository<T>) {
    super(directCrud, pageinatedRepository)
  }

    searchPage(pageParams: PaginationData<number>, otherParams: any = {} ) {
      this.getPage(pageParams, otherParams, 'search')
    }

    override getFirstPage(otherParams: any = {}) {
      this.latestParams.next(otherParams)
      return this.getPage({ perPage: 5, currentPage: 0, total: 0, lastPage: 0  }, otherParams, 'search')
    }
}