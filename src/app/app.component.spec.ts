import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            setDefaultLang: jest.fn(),
            use: jest.fn(),
          },
        },
      ],
      declarations: [
        MockComponents(HeaderComponent, NavigationComponent, FooterComponent),
        AppComponent,
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);

    fixture = TestBed.createComponent(AppComponent);
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

    it('Then it sets up language defaults', () => {
      fixture.detectChanges();
      expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
      expect(translateService.use).toHaveBeenCalledWith('en');
    });
  });
});
