import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService, IFilters } from '@challenge/api';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'reports-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  protected readonly filters$ = new ReplaySubject<IFilters>(1);

  protected readonly gateways$ = this.dataService.gateways$;
  protected readonly projects$ = this.dataService.projects$;
  protected readonly report$ = this.dataService.report$;

  constructor(private readonly dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.loadGateways();
    this.dataService.loadProjects();
  }

  public update(filters: IFilters): void {
    this.dataService.report(filters);
  }
}
