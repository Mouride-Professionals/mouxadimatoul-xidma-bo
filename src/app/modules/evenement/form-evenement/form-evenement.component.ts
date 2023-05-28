import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  evenement: Evenement;
  isEdit = false;
  titre: string = "Ajouter un nouveau événement";

  constructor(
    private _matDialogRef: MatDialogRef<FormEvenementComponent>,
    private _eventService: EvenementService,
    @Inject(MAT_DIALOG_DATA) private data: Evenement) {
  }
  
  public get formEvent() {
    return this.form.controls;
  }
  
  ngOnInit(): void {
      this.eventForm();
      if(this.data){
        this.isEdit = true;
        this.titre = 'Modifier un événement';
      }
  }

  eventForm(): void {
      this.form = new FormGroup({
        libelle: new FormControl(this.data?.libelle, Validators.required),
      });
  }

  saveEvent() : void {
    if(this.form.invalid){
      return;
    }
    if(!this.isEdit){
      this._eventService.createEvent(this.form.value).subscribe((res: Evenement) => {
        this._matDialogRef.close(true);        
      });
    }
    else{
      const _data: Evenement = {
        ...this.data,
        ...this.form.value
      };  
      this._eventService.updateEvent(_data).subscribe((res: Evenement) => {    
        this._matDialogRef.close(true);         
      });
    }
  }
}
