import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealService } from '../../../shared/services/deal.service';
import { RealEstateDeal } from '../../../shared/domain/real-state-deal';
import { SharedModule } from '../../../shared/shared.module';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

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

  constructor(private formBuilder: FormBuilder, private dealService: DealService, private messageService: MessageService) {
    this.initForm();

    this.dealService.currentDeal.subscribe(value => {
      this.deal = value;
      this.dealForm.controls['name'].setValue(this.deal?.name);
      this.dealForm.controls['type'].setValue(this.deal?.type);
      this.dealForm.controls['address'].setValue(this.deal?.address);
      this.dealForm.controls['capRate'].setValue(this.deal?.capRate);
      this.dealForm.controls['noi'].setValue(this.deal?.noi);
      this.dealForm.controls['purchasePrice'].setValue(this.deal?.purchasePrice);
    });
  }

  private initForm(): void {
    this.dealForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      capRate: [0, Validators.required],
      noi: [0, Validators.required],
      purchasePrice: [0, Validators.required],
    });
  }

  submitForm(): void {
    const dealToUpdate: RealEstateDeal = {
      id: this.deal?.id || 0,
      name: this.dealForm.controls['name'].value,
      type: this.dealForm.controls['type'].value,
      address: this.dealForm.controls['address'].value,
      capRate: this.dealForm.controls['capRate'].value,
      noi: this.dealForm.controls['noi'].value,
      purchasePrice: this.dealForm.controls['purchasePrice'].value,
    }

    this.dealService.updateDeal(dealToUpdate);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deal Updated' });
  }
}
