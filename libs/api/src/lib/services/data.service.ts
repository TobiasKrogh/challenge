import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of, ReplaySubject, take } from 'rxjs';
import { API_BASE_PATH_TOKEN } from '../di';
import {
  IFilters,
  IGatewaysResponse,
  IProjectsResponse,
  IReport,
  IReportResponse,
  IUser,
  IUsersResponse,
  TIndexedGateways,
  TIndexedProjects,
} from '../model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiBasePath = '';

  public gateways$ = new ReplaySubject<TIndexedGateways>(1);
  public projects$ = new ReplaySubject<TIndexedProjects>(1);
  public report$ = new ReplaySubject<IReport[]>(1);
  public users$ = new ReplaySubject<IUser[]>(1);

  constructor(private readonly httpClient: HttpClient) {
    this.apiBasePath = inject(API_BASE_PATH_TOKEN);
  }

  public loadGateways(): void {
    this.httpClient
      .get<IGatewaysResponse>(`${this.apiBasePath}/gateways`)
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([])),
        map((gateways) =>
          Object.fromEntries(
            new Map(gateways.map((gateway) => [gateway.gatewayId, gateway]))
          )
        )
      )
      .subscribe((gateways) => this.gateways$.next(gateways));
  }

  public loadProjects(): void {
    this.httpClient
      .get<IProjectsResponse>(`${this.apiBasePath}/projects`)
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([])),
        map((projects) =>
          Object.fromEntries(
            new Map(projects.map((project) => [project.projectId, project]))
          )
        )
      )
      .subscribe((projects) => this.projects$.next(projects));
  }

  public report(filters: IFilters): void {
    this.httpClient
      .post<IReportResponse>(`${this.apiBasePath}/report`, filters)
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([]))
      )
      .subscribe((report) => this.report$.next(report));
  }

  public loadUsers(): void {
    this.httpClient
      .get<IUsersResponse>(`${this.apiBasePath}/users`)
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([])),
        take(1)
      )
      .subscribe((users) => this.users$.next(users));
  }
}
