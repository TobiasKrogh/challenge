import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormatAmountPipe,
  FormatDatePipe,
  MessageComponent,
} from '@challenge/shared';
import { AmountComponent } from './components/amount/amount.component';
import { ChartComponent } from './components/chart/chart.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MainComponent } from './components/main/main.component';
import { OutputComponent } from './components/output/output.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [
    FiltersComponent,
    MainComponent,
    OutputComponent,
    AmountComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    TranslateModule.forChild(),
    NgbDatepickerModule,
    MessageComponent,
    FormatAmountPipe,
    FormatDatePipe,
  ],
})
export class ReportsModule {}
