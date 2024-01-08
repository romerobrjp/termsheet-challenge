import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealAddDialogComponent } from './deal-add-dialog.component';

describe('DealAddDialogComponent', () => {
  let component: DealAddDialogComponent;
  let fixture: ComponentFixture<DealAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
