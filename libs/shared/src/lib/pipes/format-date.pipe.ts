import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { normalizeDate } from '../functions/normalize-date';

type TDateSource = string | NgbDateStruct;

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: TDateSource): string {
    const [year, month, day] = normalizeDate(date).split('-');
    return `${day}/${month}/${year}`;
  }
}
