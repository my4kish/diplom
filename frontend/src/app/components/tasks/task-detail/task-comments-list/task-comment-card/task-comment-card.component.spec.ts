import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentCardComponent } from './task-comment-card.component';

describe('TaskCommentCardComponent', () => {
  let component: TaskCommentCardComponent;
  let fixture: ComponentFixture<TaskCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
