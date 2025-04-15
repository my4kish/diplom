import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateCardComponent } from './project-create-card.component';

describe('ProjectCreateCardComponent', () => {
  let component: ProjectCreateCardComponent;
  let fixture: ComponentFixture<ProjectCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
