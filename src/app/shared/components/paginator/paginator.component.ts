import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from '@core/model/pageable.model';

@Component({
    selector: 'paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
    @Input() pageable: Pageable<any>;
    @Output() pageEvent = new EventEmitter<PageEvent>();
    pages: number[] = [];
    sliceIndex = 1;

    ngOnChanges(): void {
        this.sliceIndex = Math.ceil((this.pageable.number + 1) / 10);
        this.pages = new Array(this.pageable.totalPages)
            .fill(0)
            .map((_, i) => i + 1);
    }

    onNext(): void {
        this.pageEvent.emit({
            pageIndex: this.pageable.number + 1,
            pageSize: this.pageable.size,
            length: this.pageable.totalElements,
        });
    }

    onPrev(): void {
        this.pageEvent.emit({
            pageIndex: this.pageable.number - 1,
            pageSize: this.pageable.size,
            length: this.pageable.totalElements,
        });
    }

    onFirst(): void {
        this.pageEvent.emit({
            pageIndex: 0,
            pageSize: this.pageable.size,
            length: this.pageable.totalElements,
        });
    }

    onLast(): void {
        this.pageEvent.emit({
            pageIndex: this.pageable.totalPages - 1,
            pageSize: this.pageable.size,
            length: this.pageable.totalElements,
        });
    }

    onChoicePage(index: number): void {
        this.pageEvent.emit({
            pageIndex: index - 1,
            pageSize: this.pageable.size,
            length: this.pageable.totalElements,
        });
    }
}
