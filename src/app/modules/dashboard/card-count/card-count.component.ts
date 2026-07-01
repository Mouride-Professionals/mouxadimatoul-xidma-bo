import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-count',
  templateUrl: './card-count.component.html',
  styleUrls: ['./card-count.component.scss']
})
export class CardCountComponent {
  @Input() name: string = '';
  @Input() count: number = 0;
  @Input() iconName: string = '';
  @Input() iconBgClass: string = 'bg-white';
  @Input() iconColorClass: string = 'text-blue-600';
}
