import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FilterDTO, FilterNameDTO} from '../models/filter.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) {
  }

  getFilterNames(): Observable<FilterNameDTO[]> {
    return this.http.get<FilterNameDTO[]>('http://localhost:8080/filter_names');
  }

  getFilterById(id: number): Observable<FilterDTO> {
    return this.http.get<FilterDTO>('http://localhost:8080/filter/' + id);
  }

  saveFilter(filter: FilterDTO): Observable<void> {
    return this.http.post<void>('http://localhost:8080/add_filter', filter)
  }

  private readonly _filterIdNameList$: BehaviorSubject<FilterNameDTO[]> = new BehaviorSubject<FilterNameDTO[]>([]);
  private readonly _filterId$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private readonly _isModalView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get filterIdNameList$(): BehaviorSubject<FilterNameDTO[]> {
    return this._filterIdNameList$;
  }

  get filterId$(): BehaviorSubject<number | null> {
    return this._filterId$;
  }

  get isModalView$(): BehaviorSubject<boolean> {
    return this._isModalView$;
  }
}
