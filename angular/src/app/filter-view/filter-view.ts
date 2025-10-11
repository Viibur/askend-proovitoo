import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterDTO} from '../models/filter.model';
import {Router, RouterLink} from '@angular/router';
import {AmountCondition, DateCondition, TitleCondition, Type} from '../models/criteria.enum';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {CriteriaDTO} from '../models/criteria.model';

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
  protected readonly Type = Type;
  filter: FilterDTO = {
    id: null,
    name: '',
    criteria: [],
    option: 1,
  };

  criteriaTypes: string[] = [Type.AMOUNT, Type.TITLE, Type.DATE];
  conditions: {[key: string] : AmountCondition[] | TitleCondition[] | DateCondition[]} = {
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
        this.changeDetectorRef.detectChanges()
      });
    } else {
      this.addCriteria();
    }
  }

  onSubmit(): void {
    if (!this.isFilterValid()) return;
    this.filterService.saveFilter(this.filter).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  addCriteria(): void {
    this.filter.criteria.push({
      id: null,
      type: Type.AMOUNT,
      condition: AmountCondition.MORE,
      criteriaValue: '',
      addedOrder: this.filter.criteria.length + 1,
    });
  }

  changeCondition(filterCriteria: CriteriaDTO): void {
    filterCriteria.condition = this.conditions[filterCriteria.type][0];
    filterCriteria.criteriaValue = ''
  }

  isFilterValid(): boolean {
    if (this.filter.name && this.filter.option && this.areCriteriaValid()) {
      return true;
    }
    return false;
  }

  areCriteriaValid(): boolean {
    for (const criteria of this.filter.criteria) {
      if (!criteria.criteriaValue) {
        return false;
      }
    }
    return true;
  }
}
