import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IFilters } from '@challenge/api';
import { normalizeDate } from '@challenge/shared';

export class FiltersForm extends FormGroup {
  constructor() {
    super({
      gatewayId: new FormControl(''),
      projectId: new FormControl(''),
      from: new FormControl(''),
      to: new FormControl(''),
    });
  }

  public get normalized(): IFilters {
    return Object.fromEntries(
      new Map(
        Object.entries(this.controls)
          .filter(([, { value }]) => !!value)
          .map(([key, control]) => [key, normalizeDate(control.value)])
      )
    );
  }

  public get from(): NgbDateStruct | undefined {
    return this.value.from ?? undefined;
  }

  public get to(): NgbDateStruct | undefined {
    return this.value.to ?? undefined;
  }

  public resetControl(target: string): void {
    return this.patchValue({ [target]: null });
  }
}
