import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: User, token: string }> {

    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) {throw new BadRequestException('This email already exist');}

    const newUser = new this.userModel({
      name: createUserDto.name,
      role: createUserDto.role,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });

    const token = this.jwtService.sign({email: createUserDto.email});

    await newUser.save();
    
    return { user: newUser, token };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({email}).exec();
    if (!user) {
      throw new NotFoundException(`User with this email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
