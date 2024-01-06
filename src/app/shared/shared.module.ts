import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const PRIMENG_MODULES = [
  ButtonModule,
  TableModule,
  DropdownModule,
  TagModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    ...PRIMENG_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...PRIMENG_MODULES,
  ],
})
export class SharedModule { }
