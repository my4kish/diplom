import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Task } from "../interfaces/models/task.model";

@Injectable({providedIn: 'root'})
export class TaskService extends ApiService<Task> {
  protected path = 'task';
}