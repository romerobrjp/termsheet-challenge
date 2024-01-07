import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

const PRIMENG_MODULES = [
  ButtonModule,
  TableModule,
  DropdownModule,
  TagModule,
  PanelModule,
  CardModule,
  InputTextModule,
  ToastModule,
  ToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ...PRIMENG_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...PRIMENG_MODULES,
  ],
})
export class SharedModule { }
