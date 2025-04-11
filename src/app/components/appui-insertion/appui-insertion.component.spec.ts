import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppuiInsertionComponent } from './appui-insertion.component';

describe('AppuiInsertionComponent', () => {
  let component: AppuiInsertionComponent;
  let fixture: ComponentFixture<AppuiInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppuiInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppuiInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
