import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Evenement } from '@core/model/evenement.model';
import { EvenementService } from '@core/service/evenement.service';

@Component({
  selector: 'app-form-evenement',
  templateUrl: './form-evenement.component.html',
  styleUrls: ['./form-evenement.component.scss']
})
export class FormEvenementComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  form: FormGroup;
  constructor(private _eventService: EvenementService) {
  }
  
  public get formEvent() {
    return this.form.controls;
  }
  
  ngOnInit(): void {
      this.eventForm();
  }

  eventForm(): void {
      this.form = new FormGroup({
        libelle: new FormControl('', Validators.required),
      });
  }

  saveEvent() {
      this._eventService.createEvent(this.form.value).subscribe((
        response: Evenement) => {    
          console.log(response);
        });
      location.reload();
  }
}
