import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LabelValue } from '../../shared/domain/label-value';
import { RealEstateDeal } from '../../shared/domain/real-state-deal';
import { DealService } from '../../shared/services/deal.service';
import { SharedModule } from '../../shared/shared.module';
import * as DealActions from '../../store/deal.actions';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { CapitalizePipe } from "../../shared/pipes/capitalize.pipe";
import { HighlightDirective } from '../../shared/directives/highlight.directive';


@Component({
    selector: 'app-deals',
    standalone: true,
    imports: [SharedModule, DialogModule, ReactiveFormsModule, CapitalizePipe, HighlightDirective],
    templateUrl: './deals.component.html',
    styleUrl: './deals.component.scss'
})
export class DealsComponent implements OnInit, OnDestroy {
  deals: RealEstateDeal[] = [];
  typesOptions: LabelValue[] = [];
  showDialog: boolean = false;
  newDealForm!: FormGroup;
  // @ContentChild('dealFormInputs') dealFormInputsTemplateRef!: TemplateRef<any>;
  @ViewChild('dataTableRef') dataTableRef: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dealService: DealService,
    private store: Store<{ deal: { deal: RealEstateDeal } }>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
    this.typesOptions = [
      { label: 'Acquisition', value: 'Acquisition' },
      { label: 'Lease', value: 'Lease' },
      { label: 'Development', value: 'Development' },
    ];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dealService.deals$.subscribe({
        next: (deals) => {
          if (!deals || deals.length === 0) {
            this.deals = this.dealService.generateListOfDeals(52);
            this.dealService.deals$ = this.deals;
          }
          else {
            this.deals = deals;
          }
        }
      }))

    this.initForm();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription?.unsubscribe();
    }
  }

  private initForm() {
    this.newDealForm = this.formBuilder.group({
      newDealFormSections: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          type: ['', Validators.required],
          address: ['', Validators.required],
          capRate: ['', Validators.required],
          noi: ['', Validators.required],
          purchasePrice: ['', Validators.required],
        })
      ]),
    });
  }

  getSeverity(dealType: string): string {
    switch (dealType) {
      case 'Acquisition':
        return 'success';
      case 'Lease':
        return 'primary';
      case 'Development':
        return 'warning';
      default:
        return 'info';
    }
  }

  viewDeal($event: any, deal: RealEstateDeal) {
    this.selectDeal(deal);
    this.router.navigate([`deal/${deal.id}`]);
  }

  goEditDeal($event: any, deal: RealEstateDeal) {
    this.selectDeal(deal);
    this.router.navigate([`deal/${deal.id}/edit`]);
  }

  selectDeal(deal: RealEstateDeal): void {
    this.dealService.saveDeal(deal);
    this.store.dispatch(DealActions.saveDeal({ deal: deal }));
  }

  refreshPaginator() {
    this.dataTableRef.paginate({ first: 0, rows: this.dataTableRef.rows });
  }

  // 'Add New Deal' dialog -->

  openNew() {
    this.showDialog = true;
  }

  hideDialog() {
    this.showDialog = false;
  }

  submitForm() {
    if (this.newDealForm.valid) {
      const formSections = this.newDealForm.get('newDealFormSections') as FormArray;
  
      for (let i = 1; i <= formSections.length; i++) {
        this.dealService.addDeal({
          id: this.deals.length + 1,
          ...formSections.at(i - 1).value
        });
      }
  
      // Reset form, refresh paginator, close dialog
      this.newDealForm.reset();
      // this.refreshPaginator();
      this.dataTableRef.first = 0; // Go to the first page
      this.dataTableRef.reset(); // Reset filters if applicable
      this.showDialog = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${formSections.length} Deals created` });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error while trying to create Deals. Try again later.` });
    }
  }

  get newDealFormSections(): FormArray {
    return this.newDealForm.get('newDealFormSections') as FormArray;
  }

  addNewDealFormSection(): void {
    this.newDealFormSections.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        address: ['', Validators.required],
        capRate: [0, Validators.required],
        noi: [0, Validators.required],
        purchasePrice: [0, Validators.required],
      })
    );
  }

  deleteNewDealFormSection(formIndex: number): void {
    this.newDealFormSections.removeAt(formIndex);
  }

  getAsValidFormGroup(newDealForm: AbstractControl): FormGroup {
    return newDealForm as FormGroup;
  }

  isAllSectionsValid(): boolean {
    return this.newDealFormSections.controls.every(section => section.valid);
  }
  
  hasRequiredError(section: any): boolean {
    return section?.get('name')?.errors?.['required'] && section?.get('name')?.touched;
  }
}
