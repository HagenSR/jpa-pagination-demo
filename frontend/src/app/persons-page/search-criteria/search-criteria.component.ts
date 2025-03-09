import { SearchCriteria } from '../../../api/people/search-criteria.model';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorRequestResult } from '@ngneat/elf-requests/src/lib/requests-result';
import { Observable, Subscription, combineLatest, filter, map, skipWhile, take, tap } from 'rxjs';
import { AuthService } from '../../../api/auth/auth.service';
import { OperationNames } from '../../../api/generic/operation-names.enum';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { LoadingComponentComponent } from '../../../util/loading/loading.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PersonService } from '../../../api/people/people.service';


@Component({
  selector: 'app-search-criteria',
  imports: [CommonModule, CardModule, IftaLabelModule, SelectModule, DatePickerModule, InputNumberModule, FormsModule, ReactiveFormsModule, ButtonModule, LoadingComponentComponent, RouterModule, InputTextModule],
  templateUrl: './search-criteria.component.html',
  styleUrl: './search-criteria.component.scss'
})
export class SearchCriteriaComponent {
  private readonly route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  personService = inject(PersonService);

  operationLoading$!: Observable<boolean>
  operationError$!: Observable<ErrorRequestResult<any>>
  searchForm!: FormGroup;
  reloadObservable!: Subscription

  ngOnInit() {
    this.operationLoading$ = this.personService.personRepository.selectLoading(OperationNames.GET)
    this.operationError$ = this.personService.personRepository.selectError(OperationNames.GET)
      this.searchForm = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      })
    }

  search() {
    var search: SearchCriteria = this.searchForm.value
    this.personService.getFirstPage(search)
  }
}