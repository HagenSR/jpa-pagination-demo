import { Injectable } from "@angular/core";
import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from "@ngneat/elf-entities";
import { withPagination } from '@ngneat/elf-pagination';
import { PaginatedRepository } from "../generic/paginated/paginated.repository";
import { Person } from "./person.model";

@Injectable({
    providedIn: 'root'
})
export class PersonRepository extends PaginatedRepository<Person> {

    constructor() {
        super(createStore(
            { name: "people" },
            withEntities<Person>(),
            withActiveId(),
            withPagination()
        ));
    }

}