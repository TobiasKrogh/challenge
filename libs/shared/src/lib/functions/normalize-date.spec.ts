import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { normalizeDate } from './normalize-date';

const MOCK_DATE_STRING = '2020-01-01';
const MOCK_DATE_STRUCT: NgbDateStruct = {
  day: 1,
  month: 1,
  year: 2020,
};

describe('When normalizing dates', () => {
  it('Then strings are returned directly', () => {
    expect(normalizeDate(MOCK_DATE_STRING)).toBe(MOCK_DATE_STRING);
  });

  it('Then date structs are converted', () => {
    expect(normalizeDate(MOCK_DATE_STRUCT)).toStrictEqual(MOCK_DATE_STRING);
  });
});
