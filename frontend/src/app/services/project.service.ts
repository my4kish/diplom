import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { createProjectDTO, Project } from '../interfaces/models/project.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService extends ApiService<Project> {
  protected path = 'projects';
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  public loadProjects(): void {
    this.getAll().subscribe((projects) => {
      this.projectsSubject.next(projects);
    });
  }

  public createProject(project: createProjectDTO): Observable<Project> {
    return this.create(project).pipe(tap(newProject => {
      this.projectsSubject.next([...this.projectsSubject.value, newProject])
    }));
  }

  public updateProject(id: string, data: createProjectDTO): Observable<Project> {
    return this.update(id, data)
      .pipe(
        tap(updated => {
          const current = this.projectsSubject.value;
          const next = current.map(p => p.id === id ? updated : p);
          this.projectsSubject.next(next);
        })
      );
  }

  public deleteProject(id: string): Observable<void> {
    return this.delete(id)
      .pipe(
        tap(() => {
          const next = this.projectsSubject.value.filter(p => p.id !== id);
          this.projectsSubject.next(next);
        })
      );
  }
}
