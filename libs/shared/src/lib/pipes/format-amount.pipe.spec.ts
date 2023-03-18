import { FormatAmountPipe } from './format-amount.pipe';

describe('FormatAmountPipe', () => {
  let pipe: FormatAmountPipe;
  let formatter: Intl.NumberFormat;

  beforeEach(() => {
    pipe = new FormatAmountPipe();
    formatter = Intl.NumberFormat('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('When transforming', () => {
    let formatted: string;

    beforeEach(() => {
      jest.spyOn(Intl, 'NumberFormat').mockReturnValue(formatter);
      jest.spyOn(formatter, 'format').mockReturnValue('formatted');

      formatted = pipe.transform(1234);
    });

    it('Then it returns the formatted string', () => {
      expect(formatted).toStrictEqual('formatted');
    });

    it('Then it requests a number formatter', () => {
      expect(Intl.NumberFormat).toHaveBeenCalledWith('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });

    it('Then it formats using the returned formatter', () => {
      expect(formatter.format).toHaveBeenCalledWith(1234);
    });
  });
});
