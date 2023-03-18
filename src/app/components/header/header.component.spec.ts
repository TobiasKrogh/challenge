import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '@challenge/api';
import { MockComponents } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { MOCK_USER } from '../../../testing/data.mocks';

import { HeaderComponent } from './header.component';
import { UserComponent } from './user/user.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let dataService: DataService;
  const users$ = new BehaviorSubject([MOCK_USER]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataService,
          useValue: {
            loadUsers: jest.fn(),
            users$,
          },
        },
      ],
      declarations: [MockComponents(UserComponent), HeaderComponent],
    }).compileComponents();

    dataService = TestBed.inject(DataService);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('When rendering', () => {
    it('Then it loads users', () => {
      fixture.detectChanges();
      expect(dataService.loadUsers).toHaveBeenCalledWith();
    });

    describe('And user is found', () => {
      it('Then it matches snapshot', () => {
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });
    });

    describe('And no user is found', () => {
      beforeEach(() => {
        users$.next([]);
      });

      it('Then it matches snapshot', () => {
        fixture.detectChanges();
        expect(fixture.debugElement).toMatchSnapshot();
      });
    });
  });
});
