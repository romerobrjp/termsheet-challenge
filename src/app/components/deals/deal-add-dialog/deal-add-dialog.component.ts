import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealEstateDeal } from '../../../shared/domain/real-state-deal';
import { ToolbarModule } from 'primeng/toolbar';
import { DealService } from '../../../shared/services/deal.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-deal-add-dialog',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, ToolbarModule, DialogModule],
  templateUrl: './deal-add-dialog.component.html',
  styleUrl: './deal-add-dialog.component.scss'
})
export class DealAddDialogComponent implements OnInit, OnDestroy {
  newDealFormGroup: FormGroup = {} as FormGroup;
  deal: RealEstateDeal | null = null;
  submitted: boolean = false;
  ref: DynamicDialogRef | undefined;


  constructor(private dealService: DealService, public dialogService: DialogService, public messageService: MessageService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitForm() {
    console.log('>> submitForm...');
    this.submitted = true;
  }

  show() {
    // this.ref = this.dialogService.open(ProductListDemo, { header: 'Select a Product' });

    // this.ref.onClose.subscribe((product: Product) => {
    //   if (product) {
    //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
    //   }
    // });
  }

  closeDialog() {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
