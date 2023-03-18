import { FiltersForm } from './filters.form';

describe('FiltersForm', () => {
  let form: FiltersForm;

  beforeEach(() => {
    form = new FiltersForm();
  });

  it('should create', () => {
    expect(form).toBeTruthy();
  });

  describe('When fetch normalized value', () => {
    it('Then null values are filtered', () => {
      form.patchValue({
        from: 'date',
        gatewayId: null,
        projectId: null,
        to: null,
      });
      expect(form.normalized).toStrictEqual({ from: 'date' });
    });

    it('Then date structs are converted', () => {
      form.patchValue({
        from: {
          day: 1,
          month: 1,
          year: 2020,
        },
        gatewayId: 'gatewayId',
        projectId: null,
        to: null,
      });
      expect(form.normalized).toStrictEqual({
        from: '2020-01-01',
        gatewayId: 'gatewayId',
      });
    });
  });

  describe('When fetch from date', () => {
    it('Then it returns value if set', () => {
      form.patchValue({ from: 'date' });
      expect(form.from).toStrictEqual('date');
    });

    it('Then it returns undefined if not set', () => {
      form.patchValue({ from: null });
      expect(form.from).toBeUndefined();
    });
  });

  describe('When fetch to date', () => {
    it('Then it returns value if set', () => {
      form.patchValue({ to: 'date' });
      expect(form.to).toStrictEqual('date');
    });

    it('Then it returns undefined if not set', () => {
      form.patchValue({ to: null });
      expect(form.to).toBeUndefined();
    });
  });

  describe('When resetting a control', () => {
    it('Then the form value is patched properly', () => {
      form.patchValue({ from: 'date' });
      form.resetControl('from');
      expect(form.normalized).toStrictEqual({});
    });
  });
});
