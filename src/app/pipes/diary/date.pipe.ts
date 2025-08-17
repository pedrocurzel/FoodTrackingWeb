import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'date'
})
export class DatePipe implements PipeTransform {
    /**
     * Transform the iso string to a dd/MM/yyyy format.
     * @param isoStringDate 
     * @returns a dd/MM/yyyy string.
     */
    transform(isoStringDate?: string): unknown {
        if (!isoStringDate) {
            return "";
        }

        const date = new Date(isoStringDate);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');;
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

}
