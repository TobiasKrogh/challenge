import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jest-marbles';
import { API_BASE_PATH_TOKEN } from '../di';
import { IGatewaysResponse, IProjectsResponse, IUsersResponse } from '../model';
import {
  MOCK_GATEWAY,
  MOCK_GATEWAYS_RESPONSE,
  MOCK_PROJECT,
  MOCK_PROJECTS_RESPONSE,
  MOCK_REPORT,
  MOCK_REPORT_RESPONSE,
  MOCK_USER,
  MOCK_USERS_RESPONSE,
} from '../testing/data.mocks';

import { DataService } from './data.service';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;

  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_BASE_PATH_TOKEN,
          useValue: 'http://base',
        },
      ],
    });

    service = TestBed.inject(DataService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When fetching gateways', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.loadGateways();

      req = httpTestingController.expectOne(
        (request: HttpRequest<IGatewaysResponse>) =>
          request.url.startsWith('http://base/gateways')
      );
    });

    describe('And the http client returns valid data', () => {
      it('Then it converts the data', () => {
        expect(req.request.method).toBe('GET');
        req.flush(MOCK_GATEWAYS_RESPONSE);

        expect(service.gateways$).toBeObservable(
          cold('a', {
            a: {
              [MOCK_GATEWAY.gatewayId]: MOCK_GATEWAY,
            },
          })
        );
      });
    });

    describe('And the http client returns empty data', () => {
      it('Then it returns the fallback', () => {
        req.flush({});
        expect(service.gateways$).toBeObservable(cold('a', { a: {} }));
      });
    });

    describe('And the http client throws an error', () => {
      it('Then it returns the fallback', () => {
        req.error(new ProgressEvent('error'));
        expect(service.gateways$).toBeObservable(cold('a', { a: {} }));
      });
    });
  });

  describe('When fetching projects', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.loadProjects();

      req = httpTestingController.expectOne(
        (request: HttpRequest<IProjectsResponse>) =>
          request.url.startsWith('http://base/projects')
      );
    });

    describe('And the http client returns valid data', () => {
      it('Then it converts the data', () => {
        expect(req.request.method).toBe('GET');
        req.flush(MOCK_PROJECTS_RESPONSE);

        expect(service.projects$).toBeObservable(
          cold('a', {
            a: {
              [MOCK_PROJECT.projectId]: MOCK_PROJECT,
            },
          })
        );
      });
    });

    describe('And the http client returns empty data', () => {
      it('Then it returns the fallback', () => {
        req.flush({});
        expect(service.projects$).toBeObservable(cold('a', { a: {} }));
      });
    });

    describe('And the http client throws an error', () => {
      it('Then it returns the fallback', () => {
        req.error(new ProgressEvent('error'));
        expect(service.projects$).toBeObservable(cold('a', { a: {} }));
      });
    });
  });

  describe('When fetching a report', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.report({});

      req = httpTestingController.expectOne(
        (request: HttpRequest<IUsersResponse>) =>
          request.url.startsWith('http://base/report')
      );
    });

    describe('And the http client returns valid data', () => {
      it('Then it converts the data', () => {
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toStrictEqual({});
        req.flush(MOCK_REPORT_RESPONSE);

        expect(service.report$).toBeObservable(cold('a', { a: [MOCK_REPORT] }));
      });
    });

    describe('And the http client returns empty data', () => {
      it('Then it returns the fallback', () => {
        req.flush({});
        expect(service.report$).toBeObservable(cold('a', { a: [] }));
      });
    });

    describe('And the http client throws an error', () => {
      it('Then it returns the fallback', () => {
        req.error(new ProgressEvent('error'));
        expect(service.report$).toBeObservable(cold('a', { a: [] }));
      });
    });
  });

  describe('When fetching users', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.loadUsers();

      req = httpTestingController.expectOne(
        (request: HttpRequest<IUsersResponse>) =>
          request.url.startsWith('http://base/users')
      );
    });

    describe('And the http client returns valid data', () => {
      it('Then it converts the data', () => {
        expect(req.request.method).toBe('GET');
        req.flush(MOCK_USERS_RESPONSE);
        expect(service.users$).toBeObservable(cold('a', { a: [MOCK_USER] }));
      });
    });

    describe('And the http client returns empty data', () => {
      it('Then it returns the fallback', () => {
        req.flush({});
        expect(service.users$).toBeObservable(cold('a', { a: [] }));
      });
    });

    describe('And the http client throws an error', () => {
      it('Then it returns the fallback', () => {
        req.error(new ProgressEvent('error'));
        expect(service.users$).toBeObservable(cold('a', { a: [] }));
      });
    });
  });
});
