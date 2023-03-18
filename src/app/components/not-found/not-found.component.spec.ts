import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageComponent } from '@challenge/shared';
import { MockPipes } from 'ng-mocks';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
      declarations: [MockPipes(TranslatePipe), NotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it matches snapshot', () => {
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });
  });
});
