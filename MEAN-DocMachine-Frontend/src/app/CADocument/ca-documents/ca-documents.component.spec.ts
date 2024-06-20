import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaDocumentsComponent } from './ca-documents.component';

describe('CaDocumentsComponent', () => {
  let component: CaDocumentsComponent;
  let fixture: ComponentFixture<CaDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
