import { NgIf } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { DataService } from '@challenge/api';
import { MessageComponent } from '@challenge/shared';
import { MockComponents, MockPipes } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import {
  MOCK_GATEWAY,
  MOCK_PROJECT,
  MOCK_REPORT,
} from '../../../testing/data.mocks';
import { FiltersComponent } from '../filters/filters.component';
import { OutputComponent } from '../output/output.component';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let dataService: DataService;

  const gateways$ = new ReplaySubject(1);
  const projects$ = new ReplaySubject(1);
  const report$ = new ReplaySubject(1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIf, MessageComponent],
      providers: [
        {
          provide: DataService,
          useValue: {
            loadGateways: jest.fn(),
            loadProjects: jest.fn(),
            report: jest.fn(),
            gateways$,
            projects$,
            report$,
          },
        },
      ],
      declarations: [
        MockComponents(FiltersComponent, OutputComponent),
        MockPipes(TranslatePipe),
        MainComponent,
      ],
    }).compileComponents();

    dataService = TestBed.inject(DataService);

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    gateways$.next([MOCK_GATEWAY]);
    projects$.next([MOCK_PROJECT]);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it loads gateways and projects', () => {
      fixture.detectChanges();
      expect(dataService.loadGateways).toHaveBeenCalledWith();
      expect(dataService.loadProjects).toHaveBeenCalledWith();
    });

    describe('And no report was generated', () => {
      it('Then it matches snapshot', () => {
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });
    });

    describe('And report was generated', () => {
      it('Then it matches snapshot', () => {
        report$.next([MOCK_REPORT]);
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });
    });
  });

  describe('When updating', () => {
    it('Then it refreshes report', () => {
      component.update({});
      expect(dataService.report).toHaveBeenCalledWith({});
    });
  });
});
