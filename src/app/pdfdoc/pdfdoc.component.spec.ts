import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfdocComponent } from './pdfdoc.component';

describe('PdfdocComponent', () => {
  let component: PdfdocComponent;
  let fixture: ComponentFixture<PdfdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfdocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
