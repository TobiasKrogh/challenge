import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUser } from '@challenge/api';

@Component({
  selector: 'challenge-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() public user: IUser | undefined;

  public get fullName(): string {
    return this.user ? `${this.user.firstName} ${this.user.lastName}` : '';
  }

  public get abbrevation(): string {
    return this.user
      ? `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`
      : '';
  }
}
