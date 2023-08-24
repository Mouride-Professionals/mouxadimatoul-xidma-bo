import { Component, Input, OnInit } from '@angular/core';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-count',
  templateUrl: './card-count.component.html',
  styleUrls: ['./card-count.component.scss']
})
export class CardCountComponent implements OnInit{
  @Input() name: string='';
  @Input() type: string='';
  @Input() nameOne: string='';
  @Input() nameTwo: string='';
  @Input() numberOne: number;
  @Input() numberTwo: number;
  @Input() textColor: string;

  residences$: Observable<Residence[]>;
  constructor(private _residenceService: ResidenceService){}

  ngOnInit(): void {
    this.getCountResidences();
  }

  getCountResidences(): void {
    this.residences$ = this._residenceService.getAllResidences();
  }

}
