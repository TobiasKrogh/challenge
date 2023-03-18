import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold } from 'jest-marbles';
import {
  MOCK_GATEWAY,
  MOCK_PROJECT,
  MOCK_REPORT,
} from '../../../testing/data.mocks';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it matches snapshot (no data provided)', () => {
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    describe('And valid data was provided (gateways)', () => {
      beforeEach(() => {
        component.total = 50;
        component.sources = [
          {
            data: [MOCK_REPORT],
            gateway: MOCK_GATEWAY,
            open: true,
            total: 27,
          },
          {
            data: [MOCK_REPORT],
            gateway: MOCK_GATEWAY,
            open: true,
            total: 23,
          },
        ];
      });

      it('Then it matches snapshot (data provided - projects)', () => {
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });

      it('Then gradient is properly set up', () => {
        expect(component['pie$']).toBeObservable(
          cold('a', {
            a: 'conic-gradient(#A259FF 194.4deg, #6497B1 194.4deg 165.6deg)',
          })
        );
      });
    });

    describe('And valid data was provided (projects)', () => {
      beforeEach(() => {
        component.total = 50;
        component.sources = [
          {
            data: [MOCK_REPORT],
            project: MOCK_PROJECT,
            open: true,
            total: 27,
          },
          {
            data: [MOCK_REPORT],
            project: MOCK_PROJECT,
            open: true,
            total: 23,
          },
        ];
      });

      it('Then it matches snapshot (data provided - projects)', () => {
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });

      it('Then gradient is properly set up', () => {
        expect(component['pie$']).toBeObservable(
          cold('a', {
            a: 'conic-gradient(#A259FF 194.4deg, #6497B1 194.4deg 165.6deg)',
          })
        );
      });
    });
  });
});
