import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INavigationTarget } from '../../model/navigation-target.interface';

@Component({
  selector: 'challenge-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  protected readonly navigationTargets: INavigationTarget[] = [
    { link: '/calculations', label: 'Calc', ref: 'calculations' },
    { link: '/apps', label: 'Apps', ref: 'apps' },
    { link: '/external', label: 'Ext', ref: 'external' },
    { link: '/reports', label: 'Reports', ref: 'reports' },
    { link: '/logout', label: 'Logout', ref: 'logout' },
  ];
}
