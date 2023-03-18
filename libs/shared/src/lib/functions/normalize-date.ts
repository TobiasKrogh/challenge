import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

type TDateSource = string | NgbDateStruct;

export function normalizeDate(date: TDateSource): string {
  if (typeof date === 'object') {
    const { year, month, day } = date;
    return `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(
      2,
      '0'
    )}`;
  }

  return date;
}
