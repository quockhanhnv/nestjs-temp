import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Request, Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTask(@Res() res: Response) {
    const data = await this.taskService.getAllTask();
    return res.status(200).send(data)
  }

  // @Get('filter/data')
  // @UsePipes(new ValidationPipe({ whitelist: false, transform: true}))
  // async FilterTaskById(@Query() reqParam: QueryParamDto, @Res() res: Response) {
  //   return await this.taskService.filterTask(reqParam.filter)
  // }

  @Get(':uuid')
  @UsePipes(new ValidationPipe())
  async getTaskById(@Query() reqParam: TaskParamDto, @Res() res: Response) {
    return await this.taskService.getTask(reqParam.uuid)
  }

  @Delete(':id')
  async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response) {
    return await this.taskService.deleteTask(reqParam.uuid)

  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTask(@Body() task: TaskDto, @Res() res: Response) {
    const data = await this.taskService.addTask(task)
    return res.status(200).send(data);
  }
}
