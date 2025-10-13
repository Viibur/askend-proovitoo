import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterNameDTO} from '../models/filter.model';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilterView} from '../filter-view/filter-view';

@Component({
  selector: 'app-front-page',
  standalone: false,
  templateUrl: './front-page.html',
  styleUrl: './front-page.css'
})
export class FrontPage implements OnInit {
  filters: FilterNameDTO[] = [];
  isModalView: boolean = false;

  constructor(private readonly router: Router,
              private readonly ngbModal: NgbModal,
              private readonly filterService: FilterService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterService.getFilterNames().subscribe((filters: FilterNameDTO[]) => {
      this.filters = filters;
      this.filterService.filterIdNameList$.next(filters);
      this.changeDetectorRef.detectChanges();
    });
    this.filterService.isModalView$.subscribe(isModalView => {
      this.isModalView = isModalView;
    });
  }

  onFilterClick(id?: number | undefined): void {
    if (id) {
      this.filterService.filterId$.next(id);
    }
    this.filterService.isModalView$.next(this.isModalView);
    if (this.isModalView) {
      this.ngbModal.open(FilterView, { size: 'xl' })
    } else {
      this.router.navigate(['/filter']);
    }
  }

  onFilterKeyDown($event: KeyboardEvent, id: number): void {
    if ($event.key === 'Enter') this.onFilterClick(id);
  }
}
