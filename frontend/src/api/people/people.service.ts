import { Injectable } from "@angular/core";
import { DirectCrudService } from "../generic/direct-crud.service";
import { PersonRepository } from "./people.repository";
import { Person } from "./person.model";
import { PaginatedSearchService } from "../generic/paginated-search/paginated-search.service";
import { PaginationData } from "@ngneat/elf-pagination";
import { HttpParams } from "@angular/common/http";
import { SearchCriteria } from "./search-criteria.model";


@Injectable({
    providedIn: 'root'
})
export class PersonService extends PaginatedSearchService<Person> {

    constructor(
        readonly direct: DirectCrudService,
        readonly personRepository: PersonRepository) {
        super(direct, personRepository)
    }

    override sort = "firstName,asc";


  protected override convertToJpaPage(page: PaginationData<number>, otherParams: any): HttpParams {
    const searchCriteria = otherParams as unknown as SearchCriteria;
    var params = super.convertToJpaPage(page, {})
        .append("firstName", searchCriteria.firstName ?? '')
        .append("lastName", searchCriteria.lastName ?? '')
        .append("email", searchCriteria.email ?? '');
    return params;
}
}