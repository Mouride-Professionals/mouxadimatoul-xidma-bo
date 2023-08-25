import { Component, OnInit } from '@angular/core';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ChambreDispo } from '@core/service/stats/chambre-dispo.stats';
import { StatsService } from '@core/service/stats/stats.service';
import { TotalStats } from '@core/service/stats/total.stats';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexOptions,
    ApexTitleSubtitle,
    ApexXAxis,
} from 'ng-apexcharts';
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
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    residences$: Observable<Residence[]>;
    total$: Observable<TotalStats>;

    chambreDispoChart: ApexOptions;
    chambreDispos: ChambreDispo[] = [];

    residence = 1;

    constructor(
        private _residenceService: ResidenceService,
        private _statService: StatsService
    ) {}

    ngOnInit(): void {
        this.residences$ = this._residenceService.getAllResidences();
        this.onFilterData();
    }

    onFilterData(): void {
        this.total$ = this._statService.getTotalByResidence(this.residence);
        this._statService
            .getchambreDispoByResidence(this.residence)
            .subscribe((res: ChambreDispo[]) => {
                this.chambreDispos = res;
                this._prepareChartChambreDispo();
            });
    }

    private _prepareChartChambreDispo(): void {
        this.chambreDispoChart = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'bar',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#4CAF50'],
            dataLabels: {
                enabled: true,
                offsetY: -22,
                style: {
                    fontSize: '12px',
                    colors: ['#4CAF50'],
                },
                enabledOnSeries: [0],
                background: {
                    borderWidth: 0,
                },
            },
            grid: {
                borderColor: 'var(--fuse-border)',
            },
            labels: this.chambreDispos.map((c: ChambreDispo) => c.pavillon),
            legend: {
                show: false,
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                },
            },
            series: [
                {
                    name: 'Chambre disponible',
                    data: this.chambreDispos.map(
                        (c: ChambreDispo) => c.chambres
                    ),
                },
            ],
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75,
                    },
                },
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    color: 'var(--fuse-border)',
                },
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
            },
        };
    }
}
