import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '@challenge/shared';
import { MockModule, MockPipes } from 'ng-mocks';
import { MOCK_GATEWAY, MOCK_PROJECT } from '../../../testing/data.mocks';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MockModule(NgbDatepickerModule)],
      declarations: [
        MockPipes(TranslatePipe),
        FormatDatePipe,
        FiltersComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it matches snapshot', () => {
      component.gateways = {
        [MOCK_GATEWAY.gatewayId]: MOCK_GATEWAY,
      };
      component.projects = {
        [MOCK_PROJECT.projectId]: MOCK_PROJECT,
      };
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (empty data lists)', () => {
      component.gateways = null;
      component.projects = null;
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });
  });

  describe('When generating report', () => {
    let normalizedGetSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.spyOn(component.filtersChange, 'emit');
      normalizedGetSpy = jest.spyOn(component.form, 'normalized', 'get');
      normalizedGetSpy.mockReturnValue({});
      component.generate();
    });

    it('Then the event emitter emits properly', () => {
      expect(component.filtersChange.emit).toHaveBeenCalledWith({});
    });

    it('Then the normalied form data is retrieved', () => {
      expect(normalizedGetSpy).toHaveBeenCalledWith();
    });
  });
});
