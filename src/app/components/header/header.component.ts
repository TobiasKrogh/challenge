import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '@challenge/api';
import { map } from 'rxjs';

@Component({
  selector: 'challenge-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  protected readonly user$ = this.dataService.users$.pipe(
    map((users) => users[0])
  );

  constructor(private readonly dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.loadUsers();
  }
}
