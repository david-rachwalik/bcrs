import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRepairComponent } from './service-repair.component';

describe('ServiceRepairComponent', () => {
  let component: ServiceRepairComponent;
  let fixture: ComponentFixture<ServiceRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRepairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
