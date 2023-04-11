import { NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe, MessageComponent } from '@challenge/shared';
import { MockComponents, MockPipes } from 'ng-mocks';
import {
  MOCK_GATEWAY,
  MOCK_PROJECT,
  MOCK_REPORT,
} from '../../../testing/data.mocks';
import { AmountComponent } from '../amount/amount.component';
import { ChartComponent } from '../chart/chart.component';

import { OutputComponent } from './output.component';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIf, MessageComponent],
      declarations: [
        MockComponents(AmountComponent, ChartComponent),
        MockPipes(TranslatePipe),
        FormatDatePipe,
        OutputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;

    component.gateways = {
      ['gw-1']: { ...MOCK_GATEWAY, gatewayId: 'gw-1' },
      ['gw-2']: { ...MOCK_GATEWAY, gatewayId: 'gw-2' },
    };

    component.projects = {
      ['p-1']: { ...MOCK_PROJECT, projectId: 'p-1' },
      ['p-2']: { ...MOCK_PROJECT, projectId: 'p-2' },
    };
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

    it('Then it matches snapshot (multiple projects, multiple gateways)', () => {
      component.filters = {};
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-2',
          projectId: 'p-2',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (multiple projects, multiple gateways - nullified)', () => {
      component.filters = {};
      component.gateways = null;
      component.projects = null;
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-2',
          projectId: 'p-2',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (single project, multiple gateways)', () => {
      component.filters = {
        projectId: 'p-1',
      };
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-2',
          projectId: 'p-1',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (single project, multiple gateways - nullified)', () => {
      component.filters = {
        projectId: 'p-1',
      };
      component.gateways = null;
      component.projects = null;
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-2',
          projectId: 'p-1',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (multiple projects, single gateway)', () => {
      component.filters = {
        gatewayId: 'gw-1',
      };
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-1',
          projectId: 'p-2',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (single project, single gateway)', () => {
      component.filters = {
        projectId: 'p-1',
        gatewayId: 'gw-1',
      };
      component.report = [
        {
          ...MOCK_REPORT,
          paymentId: 'first',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
        {
          ...MOCK_REPORT,
          paymentId: 'second',
          gatewayId: 'gw-1',
          projectId: 'p-1',
        },
      ];
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });
  });
});
