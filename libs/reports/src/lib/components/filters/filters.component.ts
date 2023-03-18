import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  IFilters,
  IGateway,
  IProject,
  TIndexedGateways,
  TIndexedProjects,
} from '@challenge/api';
import { FiltersForm } from './filters.form';

@Component({
  selector: 'reports-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Output() filtersChange = new EventEmitter<IFilters>();

  @Input() gateways: TIndexedGateways | null = {};
  @Input() projects: TIndexedProjects | null = {};

  public minDate: NgbDateStruct = {
    year: 2021,
    month: 1,
    day: 1,
  };

  public maxDate: NgbDateStruct = {
    year: 2021,
    month: 12,
    day: 31,
  };

  public form = new FiltersForm();

  public generate(): void {
    this.filtersChange.emit(this.form.normalized);
  }

  public get gatewaysAsArray(): IGateway[] {
    return Object.values(this.gateways ?? {});
  }

  public get projectsAsArray(): IProject[] {
    return Object.values(this.projects ?? {});
  }
}
