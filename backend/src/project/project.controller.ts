import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Предполагается, что у вас есть такой гард

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Получение всех проектов
  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  // Получение проекта по ID
  @Get(':id')
  async getProjectById(@Param('id', ParseUUIDPipe) projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  // Создание нового проекта
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req, // Для получения userId из токена
  ) {
    const userId = req.user.userId; // Получаем userId из JWT
    return this.projectService.createProject(createProjectDto, userId);
  }

  // Обновление проекта
  @Put(':id')
  async updateProject(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req, // Для получения userId из токена
  ) {
    const userId = req.user.userId;
    return this.projectService.updateProject(projectId, updateProjectDto, userId);
  }

  // Удаление проекта
  @Delete(':id')
  async deleteProject(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Request() req, // Для получения userId из токена
  ) {
    const userId = req.user.userId;
    return this.projectService.deleteProject(projectId, userId);
  }

  // Добавление участников в проект
  @Put(':id/members')
  async addMembersToProject(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body('memberIds') memberIds: string[], // Массив с ID участников
  ) {
    return this.projectService.addMembersToProject(projectId, memberIds);
  }

  // Удаление участников из проекта
  @Delete(':id/members')
  async removeMembersFromProject(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body('memberIds') memberIds: string[], // Массив с ID участников
  ) {
    return this.projectService.removeMembersFromProject(projectId, memberIds);
  }
}
