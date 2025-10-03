import {Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterDTO} from '../models/filter.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-view',
  standalone: false,
  templateUrl: './filter-view.html',
  styleUrl: './filter-view.css'
})
export class FilterView implements OnInit {

  constructor(private readonly router: Router,
              private readonly filterService: FilterService) {
  }

  ngOnInit(): void {
    let id;
    if (this.filterService.filterId$.value) {
      id = this.filterService.filterId$.value;
    } else {
      id = Number(this.router.url.at(-1))
    }
    this.filterService.getFilterById(id).subscribe((filter: FilterDTO) => {
      console.log(filter)
    });
  }
}
