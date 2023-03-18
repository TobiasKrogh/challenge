import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'shared-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
})
export class MessageComponent {
  @Input() public title: string | undefined;
  @Input() public text: string | undefined;

  @HostBinding('class.title--with-subline') private readonly withSubline = true;
}
