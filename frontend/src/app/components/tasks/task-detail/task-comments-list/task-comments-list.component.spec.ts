import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentsListComponent } from './task-comments-list.component';

describe('TaskCommentsListComponent', () => {
  let component: TaskCommentsListComponent;
  let fixture: ComponentFixture<TaskCommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
