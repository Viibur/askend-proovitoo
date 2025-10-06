import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { FilterDTO } from '../models/filter.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-view',
  standalone: false,
  templateUrl: './filter-view.html',
  styleUrl: './filter-view.css',
})
export class FilterView implements OnInit {
  filter!: FilterDTO;

  constructor(private readonly router: Router,
      private readonly filterService: FilterService,
      private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.filterService.filterId$.value) {
      this.filterService.getFilterById(this.filterService.filterId$.value).subscribe((filter: FilterDTO) => {
        this.filter = filter;
      });
    } else {
      this.filter = {
        id: null,
        name: '',
        criteria: [],
        option: null,
      };
    }
  }

  onSubmit(): void {
  }

  onClose(): void {

  }

  addCriteria(): void {
    this.filter.criteria.push({
      id: null,
      type: 'AMOUNT',
      condition: 'MORE',
      criteriaValue: '',
    });
  }
}
