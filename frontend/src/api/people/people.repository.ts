import { Injectable } from "@angular/core";
import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from "@ngneat/elf-entities";
import { withPagination } from '@ngneat/elf-pagination';
import { Person } from "./person.model";
import { PaginatedSearchRepository } from "../generic/paginated-search/paginated-search.repository";

@Injectable({
    providedIn: 'root'
})
export class PersonRepository extends PaginatedSearchRepository<Person> {

    constructor() {
        super(createStore(
            { name: "people" },
            withEntities<Person>(),
            withActiveId(),
            withPagination()
        ));
    }

}