import { Injectable } from "@angular/core";
import { DirectCrudService } from "../generic/direct-crud.service";
import { PersonRepository } from "./people.repository";
import { PaginatedService } from "../generic/paginated/paginated.service";
import { Person } from "./person.model";


@Injectable({
    providedIn: 'root'
})
export class PersonService extends PaginatedService<Person> {

    constructor(
        readonly direct: DirectCrudService,
        readonly personRepository: PersonRepository) {
        super(direct, personRepository)
    }

    override sort = "firstName,asc";
}