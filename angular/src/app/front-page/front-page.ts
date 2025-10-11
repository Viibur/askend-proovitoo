import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterNameDTO} from '../models/filter.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-front-page',
  standalone: false,
  templateUrl: './front-page.html',
  styleUrl: './front-page.css'
})
export class FrontPage implements OnInit {
  filters: FilterNameDTO[] = [];

  constructor(private readonly router: Router,
              private readonly filterService: FilterService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterService.getFilterNames().subscribe((filters: FilterNameDTO[]) => {
      this.filters = filters;
      this.filterService.filterIdNameList$.next(filters);
      this.changeDetectorRef.detectChanges();
    });

  }

  onFilterClick(id: number): void {
    this.filterService.filterId$.next(id);
    this.router.navigate(['/filter']);
  }

  addFilterClicked(): void {
    this.filterService.filterId$.next(null);
  }

  onFilterKeyDown($event: KeyboardEvent, id: number): void {
    if ($event.key === 'Enter') this.onFilterClick(id);
  }
}
