
import { Injectable } from '@nestjs/common';
import { Task } from './interface/task';
import { TaskStoreService } from './task-store.service';

@Injectable()
export class TaskService {
    
    constructor(private readonly taskStoreService: TaskStoreService){}
    
    public async addTask(task: Task): Promise<Task> {
        task.uuid = Math.random().toString(36).substring(7);
        task.completed = false;
        task.description = 'dummy';
        task.ownder = 'Tarun';
        task.duration = 2;
        return this.taskStoreService.addTask(task);
    }

    public async getTask(id: string): Promise<Task> {
        return this.taskStoreService.getTask(id);
    }

    public async deleteTask(id: string): Promise<Task[]> {
        return this.taskStoreService.deleteTask(id);
    }
    
    public async getAllTask(): Promise<Task[]> {
        return this.taskStoreService.getAllTask();
    }

    // public async filterTask(filter): Promise<Task[]> {
    //     return this.taskStoreService.filterTask(filter);
    // }
}