import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsCardComponent } from "../person-card/person-card.component";
import { LoadingComponentComponent } from "../../../util/loading/loading.component";
import { OperationNames } from '../../../api/generic/operation-names.enum';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PersonService } from '../../../api/people/people.service';

@Component({
  selector: 'app-persons-list',
  imports: [CommonModule, PersonsCardComponent, LoadingComponentComponent, PaginatorModule],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent {


  personService = inject(PersonService);
  isLoading$ = this.personService.personRepository.selectLoading(OperationNames.GET)
  isError$ = this.personService.personRepository.selectError(OperationNames.GET)
  totalRecords$ = this.personService.personRepository.totalRecords$

  first: number = 0;
  rows: number = 10;

  people$ = this.personService.personRepository.getPage()

  onPageChange(event: PaginatorState) {
    this.personService.getPage({ perPage: event.rows!, currentPage: event.page!, total: 0, lastPage: 10 })
    this.first = event.first!;
    this.rows = event.rows!;
  }

}
