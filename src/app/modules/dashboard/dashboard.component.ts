import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';

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


export class DashboardComponent {
  public chartOptions: Partial<ChartOptions>;
  constructor() {
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
}
