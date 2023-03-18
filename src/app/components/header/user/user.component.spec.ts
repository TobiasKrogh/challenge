import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MOCK_USER } from '../../../../testing/data.mocks';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it matches snapshot (no user provided)', () => {
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });

    it('Then it matches snapshot (user provided)', () => {
      component.user = MOCK_USER;
      fixture.detectChanges();
      expect(fixture.debugElement).toMatchSnapshot();
    });
  });
});
