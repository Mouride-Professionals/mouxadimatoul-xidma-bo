import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Residence } from '@core/model/residence.model';
import { ResidenceService } from '@core/service/residence/residence.service';
import { ChambreDispo } from '@core/service/stats/chambre-dispo.stats';
import { StatsService } from '@core/service/stats/stats.service';
import { TotalStats } from '@core/service/stats/total.stats';
import { ApexOptions } from 'ng-apexcharts';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    residences$: Observable<Residence[]>;
    totalStats: TotalStats | null = null;

    chambreDispoChart: ApexOptions;
    occupancyChart: ApexOptions;
    chambreDispos: ChambreDispo[] = [];

    residence = 1;
    role: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _autthService: AuthService,
        private _residenceService: ResidenceService,
        private _statService: StatsService,
        private _translocoService: TranslocoService
    ) {}

    ngOnInit(): void {
        this.role = this._autthService.getRoles()[0];
        this.residences$ = this._residenceService.getAllResidences();
        if (this._residenceService.residence) {
            this.residence = this._residenceService.residence.id;
        }
        this.onFilterData();

        this._translocoService.langChanges$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if (this.chambreDispos.length) {
                    this._prepareChartChambreDispo();
                }
                if (this.totalStats) {
                    this._prepareOccupancyChart();
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onFilterData(): void {
        forkJoin({
            total: this._statService.getTotalByResidence(this.residence),
            chambres: this._statService.getchambreDispoByResidence(this.residence),
        }).subscribe(({ total, chambres }) => {
            this.totalStats = total;
            this.chambreDispos = chambres;
            this._prepareChartChambreDispo();
            this._prepareOccupancyChart();
        });
    }

    private _prepareChartChambreDispo(): void {
        this.chambreDispoChart = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'bar',
                toolbar: { show: false },
                zoom: { enabled: false },
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
                background: { borderWidth: 0 },
            },
            grid: { borderColor: 'var(--fuse-border)' },
            labels: this.chambreDispos.map((c: ChambreDispo) => c.pavillon),
            legend: { show: false },
            plotOptions: {
                bar: { dataLabels: { position: 'top' } },
            },
            series: [
                {
                    name: this._translocoService.translate(
                        'dashboard.charts.availableRooms'
                    ),
                    data: this.chambreDispos.map((c: ChambreDispo) => c.chambres),
                },
            ],
            states: {
                hover: { filter: { type: 'darken', value: 0.75 } },
            },
            tooltip: { followCursor: true, theme: 'dark' },
            xaxis: {
                axisBorder: { show: false },
                axisTicks: { color: 'var(--fuse-border)' },
                labels: { style: { colors: 'var(--fuse-text-secondary)' } },
                tooltip: { enabled: false },
            },
            yaxis: {
                labels: {
                    offsetX: -16,
                    style: { colors: 'var(--fuse-text-secondary)' },
                },
            },
        };
    }

    private _prepareOccupancyChart(): void {
        if (!this.totalStats) return;
        const available = this.chambreDispos.reduce((sum, c) => sum + c.chambres, 0);
        const occupied = Math.max(0, this.totalStats.chambres - available);
        this.occupancyChart = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
            },
            series: [available, occupied],
            labels: [
                this._translocoService.translate('dashboard.charts.available'),
                this._translocoService.translate('dashboard.charts.occupied'),
            ],
            colors: ['#4CAF50', '#F44336'],
            legend: {
                position: 'bottom',
                labels: { colors: 'var(--fuse-text-secondary)' },
            },
            dataLabels: { enabled: true },
            tooltip: { theme: 'dark' },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: this._translocoService.translate(
                                    'dashboard.stats.rooms'
                                ),
                                color: 'var(--fuse-text-secondary)',
                            },
                        },
                    },
                },
            },
        };
    }
}
