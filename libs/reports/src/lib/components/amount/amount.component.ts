import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'reports-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent {
  @Input() amount: number | undefined;
  @Input() suffix: string | undefined;
}
