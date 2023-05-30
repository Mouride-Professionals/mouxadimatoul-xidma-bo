import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summarize',
})
export class SummarizePipe implements PipeTransform {
    transform(text: string, limit?: number): string {
        if (!text) {
            return null;
        }
        const desiredLimit = limit ? limit : 50;
        return text.substring(0, desiredLimit).trim() + '...';
    }
}
