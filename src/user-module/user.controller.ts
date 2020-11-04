import { Controller, Get, Post, Body, Delete, Param, UsePipes, ValidationPipe, ParseIntPipe, Query, ParseBoolPipe, Req, Headers, Res, HttpStatus, UseFilters, BadRequestException } from '@nestjs/common';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { User } from './interface/user';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JoiValidationPipe } from './pipe';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(
        @Param('id', ParseIntPipe) id: number,
        @Query('sort', ParseBoolPipe) sort: boolean,
        @Body() data: UserDto,
        @Req() req: Request
    ): User[] {
        return this.userService.getUsers();
    }

    @Get(':email')
    async getUser(@Param() params: UserParamsDto): Promise<User> {
        try {
            return await this.userService.getUser(params.email);
        } catch(err) {
            throw new BadRequestException('Test');
        }
        
    }

    @Post()
    // @UsePipes(new ValidationPipe())
    @UsePipes(new JoiValidationPipe({}))
    async postUser(@Body() user: UserDto): Promise<User> {
        return this.userService.addUser(user);
    }

    @Delete(':email')
    deleteUser(@Param() params: UserParamsDto): User[] {
        return this.userService.deleteUser(params.email);
    }
}