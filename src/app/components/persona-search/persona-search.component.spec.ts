import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSearchComponent } from './persona-search.component';

describe('PersonaSearchComponent', () => {
  let component: PersonaSearchComponent;
  let fixture: ComponentFixture<PersonaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
