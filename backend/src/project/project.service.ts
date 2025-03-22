import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // 1. Создаем проект
    const newProject = new this.projectModel(createProjectDto);
    const savedProject = await newProject.save();

    // 2. Обновляем всех пользователей из `team`, добавляя им `projectId`
    if (createProjectDto.team && createProjectDto.team.length > 0) {
      await this.userModel.updateMany(
        { _id: { $in: createProjectDto.team } }, // Ищем всех пользователей из `team`
        { $push: { projects: savedProject._id } }, // Добавляем `projectId`
      );
    }

    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('team').exec();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('team')
      .exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  // async update(
  //   id: string,
  //   updateProjectDto: UpdateProjectDto,
  // ): Promise<Project> {
  //   const updatedProject = await this.projectModel
  //     .findByIdAndUpdate(id, updateProjectDto, { new: true })
  //     .exec();
  //   if (!updatedProject) {
  //     throw new NotFoundException(`Project with ID ${id} not found`);
  //   }
  //   return updatedProject;
  // }
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    // 1. Найти проект, чтобы получить текущий список пользователей (team)
    const existingProject = await this.projectModel.findById(id).exec();
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const oldTeam = existingProject.team.map((userId) => userId.toString()); // Преобразуем ObjectId в строки
    const newTeam = updateProjectDto.team?.map((userId) => userId.toString()) || []; // Преобразуем новый список в строки

    // 2. Обновить сам проект
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID ${id} not found after update`);
    }

    // 3. Найти пользователей, которых удалили из `team`
    const removedUsers = oldTeam.filter((userId) => !newTeam.includes(userId));

    if (removedUsers.length > 0) {
      await this.userModel.updateMany(
        { _id: { $in: removedUsers } }, // Ищем всех пользователей, которые были удалены
        { $pull: { projects: id } } // Удаляем у них `projectId`
      );
    }

    // 4. Найти пользователей, которых добавили в `team`
    const addedUsers = newTeam.filter((userId) => !oldTeam.includes(userId));
  
    if (addedUsers.length > 0) {
      await this.userModel.updateMany(
        { _id: { $in: addedUsers } }, // Ищем новых пользователей
        { $addToSet: { projects: id } } // Добавляем `projectId`, избегая дубликатов
      );
    }

    return updatedProject;
  }

  async delete(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return deletedProject;
  }
}
