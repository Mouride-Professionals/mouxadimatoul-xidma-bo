import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  residences$: Observable<Residence[]>;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    private _residenceService: ResidenceService) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [88, 63, 25, 41]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Les pavillons de la Résidence"
      },
      xaxis: {
        categories: ["Pavillon A", "Pavillon B",  "Pavillon C",  "Pavillon D"]
      }
    };
  }
  ngOnInit(): void {
    this.getCountResidences();

  }

  getCountResidences(): void {
    this.residences$ = this._residenceService.getAllResidences();
  }
}
