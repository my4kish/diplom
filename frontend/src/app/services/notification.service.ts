import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Notification } from "../interfaces/models/notifications.model";

@Injectable({providedIn: 'root'})
export class NotificationService extends ApiService<Notification> {
  protected path = 'notification';
}