import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FilterDTO, FilterNameDTO} from '../models/filter.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {
  }

  getFilters(): Observable<FilterDTO[]> {
    return this.http.get<FilterDTO[]>('http://localhost:8080/filters');
  }

  getFilterNames(): Observable<FilterNameDTO[]> {
    return this.http.get<FilterNameDTO[]>('http://localhost:8080/filter_names');
  }

  getFilterById(id: number): Observable<FilterDTO> {
    return this.http.get<FilterDTO>('http://localhost:8080/filter/' + id);
  }

  private readonly _filterId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  get filterId$(): BehaviorSubject<number | null> {
    return this._filterId$;
  }
}
