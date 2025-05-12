import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Comment } from "../interfaces/models/comment.model";

@Injectable({providedIn: 'root'})
export class CommentService extends ApiService<Comment> {
  protected path = 'comment';
}