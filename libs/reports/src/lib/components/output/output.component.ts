import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  IFilters,
  IReport,
  TIndexedGateways,
  TIndexedProjects,
} from '@challenge/api';
import { IReportByGateway } from '../../model/report-by-gateway.interface';
import { IReportByProject } from '../../model/report-by-project.interface';

@Component({
  selector: 'reports-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputComponent {
  @Input() public filters: IFilters | null | undefined;
  @Input() public gateways: TIndexedGateways | null = {};
  @Input() public projects: TIndexedProjects | null = {};

  public reportByGateway: IReportByGateway[] = [];
  public reportByProject: IReportByProject[] = [];

  protected total = 0;

  @Input() public set report(data: IReport[]) {
    this.reset();
    data = data.sort((a, b) => a.created.localeCompare(b.created));

    if (this.filters?.projectId && !this.filters.gatewayId) {
      this.reportByGateway = Object.values(this.gateways ?? {}).reduce(
        (acc: IReportByGateway[], gateway) => {
          const reduced = data.filter(
            ({ gatewayId }) => gatewayId === gateway.gatewayId
          );

          if (reduced.length) {
            acc.push({
              data: reduced,
              gateway,
              open: acc.length === 0,
              total: this.calculateTotal(reduced),
            });
          }

          return acc;
        },
        []
      );
    } else {
      this.reportByProject = Object.values(this.projects ?? {}).reduce(
        (acc: IReportByProject[], project) => {
          const reduced = data.filter(
            ({ projectId }) => projectId === project.projectId
          );

          if (reduced.length) {
            acc.push({
              data: reduced,
              open: acc.length === 0,
              project,
              total: this.calculateTotal(reduced),
            });
          }

          return acc;
        },
        []
      );
    }

    this.total = this.calculateTotal(data);
  }

  @HostBinding('class.show-chart')
  public get showChart(): boolean {
    return (
      (!!this.filters?.projectId && !this.filters?.gatewayId) ||
      (!this.filters?.projectId && !!this.filters?.gatewayId)
    );
  }

  public get showGateway(): boolean {
    return !this.filters?.gatewayId;
  }

  public get isSingleGatewayAndProject(): boolean {
    return !!this.filters?.projectId && !!this.filters?.gatewayId;
  }

  private reset(): void {
    this.reportByGateway = [];
    this.reportByProject = [];
  }

  public trackByPaymentId(_index: number, entry: IReport): string {
    return entry.paymentId;
  }

  private calculateTotal(data: IReport[]): number {
    return data.reduce((acc, entry) => acc + entry.amount, 0);
  }
}
