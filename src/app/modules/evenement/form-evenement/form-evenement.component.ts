import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-evenement',
  templateUrl: './form-evenement.component.html',
  styleUrls: ['./form-evenement.component.scss']
})
export class FormEvenementComponent implements OnInit {
  formFieldHelpers: string[] = [''];
  form: FormGroup;
  constructor() {
  }
  ngOnInit(): void {
      this.eventForm();
  }
  eventForm(): void {
      this.form = new FormGroup({
        event: new FormControl('', Validators.required),
      });
  }

  saveEvent() {
      console.log('form event', this.form.value);
  }
}
