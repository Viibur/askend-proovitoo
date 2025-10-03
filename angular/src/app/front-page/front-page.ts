import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterNameDTO} from '../models/filter.model';

@Component({
  selector: 'app-front-page',
  standalone: false,
  templateUrl: './front-page.html',
  styleUrl: './front-page.css'
})
export class FrontPage implements OnInit {
  filters: FilterNameDTO[] = [];

  constructor(private readonly filterService: FilterService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterService.getFilterNames().subscribe((filters: FilterNameDTO[]) => {
      this.filters = filters;
      this.changeDetectorRef.detectChanges();
    });
  }
}
