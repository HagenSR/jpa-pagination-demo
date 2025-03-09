import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsCardComponent } from "../person-card/person-card.component";
import { LoadingComponentComponent } from "../../../util/loading/loading.component";
import { OperationNames } from '../../../api/generic/operation-names.enum';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PersonService } from '../../../api/people/people.service';
import { map, Observable } from 'rxjs';
import { NotNullPipePipe } from '../../../util/pipes/not-null-pipe.pipe';

@Component({
  selector: 'app-persons-list',
  imports: [CommonModule, PersonsCardComponent, LoadingComponentComponent, PaginatorModule, NotNullPipePipe],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent {


  personService = inject(PersonService);
  isLoading$ = this.personService.personRepository.selectLoading(OperationNames.GET)
  isError$ = this.personService.personRepository.selectError(OperationNames.GET)
  totalRecords$ = this.personService.personRepository.totalRecords$

  people$ = this.personService.personRepository.getPage()
  first$:  Observable<number> = this.personService.personRepository.getPaginationData().pipe(
    map((page) => {
      return page.currentPage * page.perPage
    })
  );
  rows$: Observable<number> = this.personService.personRepository.getPaginationData().pipe(
    map((page) => page.perPage)
  );;

  onPageChange(event: PaginatorState) {
    const otherParams = this.personService.latestParams.getValue()
    this.personService.searchPage({ perPage: event.rows!, currentPage: event.page!, total: 0, lastPage: 0 }, otherParams)
  }

}
