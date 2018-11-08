import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/Persona';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona/persona.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.css']
})
export class PersonaCreateComponent implements OnInit {

  persona: Persona;

  constructor(
    private route: ActivatedRoute,
    private personaService: PersonaService,
    private location: Location) {}

  ngOnInit() {
    this.persona = new Persona();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.personaService.addPersona(this.persona)
      .subscribe(() => this.goBack());
  }

}
