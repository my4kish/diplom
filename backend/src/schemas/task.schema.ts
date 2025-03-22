import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Project } from './project.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['new', 'in_progress', 'completed', 'overdue'], required: true })
  status: string;

  @Prop({ enum: ['low', 'medium', 'high'], required: true })
  priority: string;

  @Prop()
  dueDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  assignedTo: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true })
  projectId: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);