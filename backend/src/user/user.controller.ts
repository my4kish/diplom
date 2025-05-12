import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getCurrentUser(@Req() req) {
    const userId = req.user.userId;
    return this.userService.getCurrentUser(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id); // ⬅️ без +
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto); // ⬅️ без +
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const currentUserId = req.user.userId; // или req.user.id, в зависимости от JwtStrategy

    if (id === currentUserId) {
      throw new BadRequestException('You cannot delete yourself');
    }
    return this.userService.remove(id);
  }
}
