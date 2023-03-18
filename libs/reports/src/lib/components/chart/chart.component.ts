import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
} from 'rxjs';
import { IChartData } from '../../model/chart-slice.interface';
import { IReportByGateway } from '../../model/report-by-gateway.interface';
import { IReportByProject } from '../../model/report-by-project.interface';

type TChartSource = IReportByGateway | IReportByProject;

const COLORS = ['#A259FF', '#6497B1', 'FFC107', '#F24E1E', '#1BC5BD'];

@Component({
  selector: 'reports-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  private sources$ = new ReplaySubject<TChartSource[]>(1);
  private total$ = new ReplaySubject<number>(1);

  @Input() set sources(data: TChartSource[] | undefined) {
    if (data) {
      this.sources$.next(data);
    }
  }

  @Input() set total(amount: number) {
    if (amount) {
      this.total$.next(amount);
    }
  }

  protected readonly data$: Observable<IChartData[]> = combineLatest([
    this.sources$,
    this.total$,
  ]).pipe(
    map(([sources, total]) => {
      let lastPercentage = 0;
      return sources.map((source, index) => {
        let label = '';

        if (this.isReportByGateway(source)) {
          label = source.gateway.name;
        }

        if (this.isReportByProject(source)) {
          label = source.project.name;
        }

        const percentage = Math.round((source.total / total) * 100);

        const degree = Math.max(
          0,
          Math.round(this.getDegree(lastPercentage + percentage)) - 180
        );
        lastPercentage = percentage;

        let adjustedDegree = Math.max(0, degree - 10);
        if (degree >= 180) {
          adjustedDegree = degree + 180 - this.getDegree(percentage) - 10;
        }

        return {
          color: COLORS[index],
          degree,
          label,
          labelTransform: `rotate(${adjustedDegree}deg) translate(104px) rotate(-${adjustedDegree}deg)`,
          percentage,
        };
      });
    }),
    shareReplay(1)
  );

  protected readonly pie$ = this.data$.pipe(
    map((data) => {
      let current = '';
      const slices = data
        .map(({ color, percentage }) => {
          const degree = this.getDegree(percentage);
          const slice = `${color} ${current}${degree}deg`;
          current = `${degree}deg `;
          return slice;
        })
        .join(', ');
      return `conic-gradient(${slices})`;
    }),
    shareReplay(1)
  );

  private isReportByGateway(source: TChartSource): source is IReportByGateway {
    return 'gateway' in source;
  }

  private isReportByProject(source: TChartSource): source is IReportByProject {
    return 'project' in source;
  }

  private getDegree(percentage: number): number {
    return (360 / 100) * percentage;
  }
}
