import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), // до 5МБ на файл
          new FileTypeValidator({ fileType: 'image/' }), // только изображения
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.taskService.create(createTaskDto, files);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('my')
  findByUser(@Request() req) {
    const userId = req.user.userId;
    return this.taskService.findByUser(userId);
  }

  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.taskService.findByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.taskService.findByProject(projectId);
  }

  @Get('project/:projectId/my')
  findByUserAndProject(@Param('projectId') projectId: string, @Request() req) {
    const userId = req.user.userId;
    return this.taskService.findByUserAndProject(userId, projectId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.taskService.update(id, {
      ...updateTaskDto,
      assignedToId: updateTaskDto.assignedToId || userId,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
