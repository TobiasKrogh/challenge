import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatAmountPipe } from '@challenge/shared';
import { MockPipes } from 'ng-mocks';

import { AmountComponent } from './amount.component';

describe('AmountComponent', () => {
  let component: AmountComponent;
  let fixture: ComponentFixture<AmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockPipes(TranslatePipe),
        FormatAmountPipe,
        AmountComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AmountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it matches snapshot (no amount given)', () => {
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (amount provided)', () => {
      component.amount = 50;
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (suffix and amount provided)', () => {
      component.amount = 50;
      component.suffix = 'suffix';
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });
  });
});
