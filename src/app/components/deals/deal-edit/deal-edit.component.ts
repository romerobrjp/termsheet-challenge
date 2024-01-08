import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealService } from '../../../shared/services/deal.service';
import { RealEstateDeal } from '../../../shared/domain/real-state-deal';
import { SharedModule } from '../../../shared/shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { LabelValue } from '../../../shared/domain/label-value';

@Component({
  selector: 'app-deal-edit',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, ToolbarModule],
  templateUrl: './deal-edit.component.html',
  styleUrl: './deal-edit.component.scss'
})
export class DealEditComponent {
  dealForm: FormGroup = {} as FormGroup;
  deal: RealEstateDeal | null = null;
  typesOptions: LabelValue[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dealService: DealService,
    private messageService: MessageService
  ) {
    this.initForm();

    // Update form input values with current deal from DealService
    this.dealService.currentDeal.subscribe(value => {
      this.deal = value;
      this.dealForm.get('name')?.patchValue(this.deal?.name);
      this.dealForm.get('type')?.patchValue(this.deal?.type);
      this.dealForm.get('address')?.patchValue(this.deal?.address);
      this.dealForm.get('capRate')?.patchValue(this.deal?.capRate);
      this.dealForm.get('noi')?.patchValue(this.deal?.noi);
      this.dealForm.get('purchasePrice')?.patchValue(this.deal?.purchasePrice);
    });

    this.typesOptions = [
      { label: 'Acquisition', value: 'Acquisition' },
      { label: 'Lease', value: 'Lease' },
      { label: 'Development', value: 'Development' },
    ];
  }

  private initForm(): void {
    this.dealForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      capRate: ['', Validators.required],
      noi: ['', Validators.required],
      purchasePrice: ['', Validators.required],
    });
  }

  submitForm(): void {
    const dealToUpdate: RealEstateDeal = {
      id: this.deal?.id || 0,
      name: this.dealForm.get('name')?.value,
      type: this.dealForm.get('type')?.value,
      address: this.dealForm.get('address')?.value,
      capRate: this.dealForm.get('capRate')?.value,
      noi: this.dealForm.get('noi')?.value,
      purchasePrice: this.dealForm.get('purchasePrice')?.value,
    }

    this.dealService.updateDeal(dealToUpdate);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deal Updated' });
  }

  hasRequiredError(formControlName: string): boolean {
    return this.dealForm?.get(formControlName)?.errors?.['required'] && this.dealForm?.get(formControlName)?.touched;
  }
}
