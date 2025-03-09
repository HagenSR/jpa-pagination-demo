import { Component, inject, OnInit } from '@angular/core';
import { PersonsListComponent } from "./persons-list/persons-list.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../api/people/people.service';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';

@Component({
  selector: 'app-person-page',
  imports: [PersonsListComponent, ButtonModule, CommonModule, RouterModule, SearchCriteriaComponent],
  templateUrl: './person-page.component.html',
  styleUrl: './person-page.component.scss'
})
export class PersonsPageComponent implements OnInit {

  private personService = inject(PersonService);

  ngOnInit(): void {
    this.personService.getFirstPage()
  }
}
