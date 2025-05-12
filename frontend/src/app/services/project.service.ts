import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Project } from "../interfaces/models/project.model";

@Injectable({providedIn: 'root'})
export class ProjectService extends ApiService<Project> {
  protected path = 'project';
}