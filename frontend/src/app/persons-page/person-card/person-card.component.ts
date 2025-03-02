import { Component, inject, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { OperationNames } from '../../../api/generic/operation-names.enum';
import { PersonService } from '../../../api/people/people.service';
import { Person } from '../../../api/people/person.model';


@Component({
  selector: 'app-person-card',
  imports: [CardModule, CommonModule, IftaLabelModule, SelectModule, DatePickerModule, FormsModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonsCardComponent implements OnInit {

  personService = inject(PersonService);
  router = inject(Router);
  public postOp = OperationNames.POST;
  public putOp = OperationNames.PUT;

  @Input({ required: true }) personId!: string | null;
  @Input({ required: true }) edit!: boolean;

  activePerson$!: Observable<Person>

  ngOnInit(): void {
    this.postOp = OperationNames.POST;
    this.putOp = OperationNames.PUT;
    if (this.personId) {
      this.activePerson$ = this.personService.personRepository.selectById(this.personId)
    }
  }
}
