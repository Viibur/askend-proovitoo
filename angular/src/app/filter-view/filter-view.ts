import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { FilterDTO } from '../models/filter.model';
import { Router, RouterLink } from '@angular/router';
import { AmountCondition, DateCondition, TitleCondition, Type } from '../models/criteria.enum';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-view',
  standalone: true,
  templateUrl: './filter-view.html',
  styleUrl: './filter-view.css',
  imports: [
    NgSelectComponent,
    FormsModule,
    RouterLink,
  ],
})
export class FilterView implements OnInit {
  filter: FilterDTO = {
    id: null,
    name: '',
    criteria: [],
    option: null,
  };
  criteriaTypes: string[] = [Type.AMOUNT, Type.TITLE, Type.DATE];
  conditions = {
    [Type.AMOUNT.valueOf()]: [AmountCondition.MORE, AmountCondition.LESS, AmountCondition.EQUALS],
    [Type.TITLE.valueOf()]: [TitleCondition.STARTS_WITH, TitleCondition.ENDS_WITH, TitleCondition.CONTAINS],
    [Type.DATE.valueOf()]: [DateCondition.FROM, DateCondition.TO, DateCondition.EQUALS],
  }

  constructor(private readonly router: Router,
      private readonly filterService: FilterService,
      private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.filterService.filterId$.value) {
      this.filterService.getFilterById(this.filterService.filterId$.value).subscribe((filter: FilterDTO) => {
        this.filter = filter;
      });
    }
  }

  onSubmit(): void {
  }

  addCriteria(): void {
    this.filter.criteria.push({
      id: null,
      type: Type.AMOUNT,
      condition: AmountCondition.MORE,
      criteriaValue: '',
      addedOrder: this.filter.criteria.length + 1,
    });
    console.log(this.filter.criteria)
  }
  protected readonly Type = Type;
}
