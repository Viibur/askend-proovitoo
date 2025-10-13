import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FilterService} from '../services/filter.service';
import {FilterDTO} from '../models/filter.model';
import {Router} from '@angular/router';
import {AmountCondition, DateCondition, TitleCondition, Type} from '../models/criteria.enum';
import {NgSelectComponent} from '@ng-select/ng-select';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CriteriaDTO} from '../models/criteria.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-view',
  standalone: true,
  templateUrl: './filter-view.html',
  styleUrl: './filter-view.css',
  imports: [
    NgSelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FilterView implements OnInit {
  protected readonly Type = Type;
  filterForm: FormGroup;
  criteriaTypes: string[] = [Type.AMOUNT, Type.TITLE, Type.DATE];
  conditions: { [key: string]: AmountCondition[] | TitleCondition[] | DateCondition[] } = {
    [Type.AMOUNT.valueOf()]: [AmountCondition.MORE, AmountCondition.LESS, AmountCondition.EQUALS],
    [Type.TITLE.valueOf()]: [TitleCondition.STARTS_WITH, TitleCondition.ENDS_WITH, TitleCondition.CONTAINS],
    [Type.DATE.valueOf()]: [DateCondition.FROM, DateCondition.TO, DateCondition.EQUALS],
  };
  isModalView: boolean = true;

  constructor(private readonly router: Router,
              private readonly ngbModal: NgbModal,
              private readonly formBuilder: FormBuilder,
              private readonly filterService: FilterService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    this.filterForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      option: [1, Validators.required],
      criteria: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    if (this.filterService.filterId$.value) {
      this.filterService.getFilterById(this.filterService.filterId$.value).subscribe((filter: FilterDTO) => {
        const criteriaArray: FormArray = this.formBuilder.array([]);
        filter.criteria.forEach((criteria: CriteriaDTO, i) => {
          criteriaArray.push(this.formBuilder.group({
            id: [criteria.id ?? null],
            type: [criteria.type, Validators.required],
            condition: [criteria.condition, Validators.required],
            criteriaValue: [criteria.criteriaValue, Validators.required],
          }));
        });
        this.filterForm.setControl('criteria', criteriaArray);
        this.filterForm.patchValue({
          id: filter.id,
          name: filter.name,
          option: filter.option,
        });
        this.changeDetectorRef.detectChanges();
      });
    } else {
      this.addCriteria();
    }
    this.isModalView = this.filterService.isModalView$.value;
  }

  get criteria(): FormArray {
    return this.filterForm.get('criteria') as FormArray;
  }

  get criteriaGroups(): FormGroup[] {
    return (this.filterForm.get('criteria') as FormArray).controls as FormGroup[];
  }

  onSubmit(): void {
    if (this.filterForm.invalid) {
      return;
    }
    this.filterService.saveFilter(this.filterForm.value).subscribe({
      next: () => {
        if (this.isModalView) {
          this.ngbModal.dismissAll();
        } else {
          this.router.navigate(['/']);
        }
      },
    });
  }

  addCriteria(): void {
    this.criteria.push(this.formBuilder.group({
      type: [Type.AMOUNT, Validators.required],
      condition: [AmountCondition.MORE, Validators.required],
      criteriaValue: ['', Validators.required],
    }));
  }

  changeCondition(i: number): void {
    const type: string = this.criteria.at(i).get('type')?.value;
    this.criteria.at(i).patchValue({
      condition: this.conditions[type][0],
      criteriaValue: '',
    });
  }

  closeClicked(): void {
    if (this.isModalView) {
      this.ngbModal.dismissAll();
    } else {
      this.router.navigate(['/']);
    }
  }
}
