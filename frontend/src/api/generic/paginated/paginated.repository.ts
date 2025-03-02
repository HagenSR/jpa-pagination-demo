import { BehaviorSubject } from "rxjs";
import { deleteAllPages, PaginationData, selectCurrentPageEntities, setPage, updatePaginationData } from "@ngneat/elf-pagination";
import { Id } from "../id.model";
import { Repository } from "../entities/repository.repository";
import { upsertEntities } from "@ngneat/elf-entities";

export class PaginatedRepository<T extends Id> extends Repository<T> {

    totalRecords$ = new BehaviorSubject(0);
    
    // will only select entities that have been set to the current page
    getPage() {
        return this.store.pipe(selectCurrentPageEntities());
    }

    clearPages() {
        this.store.update(deleteAllPages());
    }

    // Updates what page we are on. setPage determines what page an entity belongs to.
    // Also note the call to updatePaginationData here. If we use elf caching, which can remember what pages 
    // have been loaded and not retrieve them, the page we are on will not be updated through this call. This becomes
    // more annoying if the user happens to change the page size. I would recommend turning off page caching and have JPA 
    // handle page information and return it to the front end.
    updatePage(response: PaginationData & { data: T[] }) {
        const { data, ...paginationData } = response;
        this.totalRecords$.next(response.total)
        this.store.update(
            upsertEntities(data),
            updatePaginationData(paginationData),
            setPage(
                response.currentPage,
                data.map((c) => c.id)
        ));
    }
}