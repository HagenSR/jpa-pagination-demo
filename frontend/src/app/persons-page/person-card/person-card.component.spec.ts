import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsCardComponent } from './person-card.component';

describe('PersonsCardComponent', () => {
  let component: PersonsCardComponent;
  let fixture: ComponentFixture<PersonsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
