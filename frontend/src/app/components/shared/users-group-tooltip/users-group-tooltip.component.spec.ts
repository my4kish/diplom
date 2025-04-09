import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGroupTooltipComponent } from './users-group-tooltip.component';

describe('UsersGroupTooltipComponent', () => {
  let component: UsersGroupTooltipComponent;
  let fixture: ComponentFixture<UsersGroupTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersGroupTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
