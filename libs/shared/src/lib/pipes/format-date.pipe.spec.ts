import { normalizeDate } from '../functions/normalize-date';
import { FormatDatePipe } from './format-date.pipe';

jest.mock('../functions/normalize-date', () => {
  return {
    normalizeDate: jest.fn().mockReturnValue('2020-01-01'),
  };
});

describe('FormatDatePipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('When transforming', () => {
    let formatted: string;

    describe('And providing a string', () => {
      beforeEach(() => {
        formatted = pipe.transform('2020-01-01');
      });

      it('Then it returns the formatted date', () => {
        expect(formatted).toStrictEqual('01/01/2020');
      });

      it('Then it normalizes the given date', () => {
        expect(normalizeDate).toHaveBeenCalledWith('2020-01-01');
      });
    });

    describe('And providing a date struct', () => {
      beforeEach(() => {
        formatted = pipe.transform({
          day: 1,
          month: 1,
          year: 2020,
        });
      });

      it('Then it returns the formatted date', () => {
        expect(formatted).toStrictEqual('01/01/2020');
      });

      it('Then it normalizes the given date', () => {
        expect(normalizeDate).toHaveBeenCalledWith({
          day: 1,
          month: 1,
          year: 2020,
        });
      });
    });
  });
});
