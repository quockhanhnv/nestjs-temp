
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interface/task';

@Injectable()
export class TaskStoreService {
    public tasks: Task[] = [];
    
    public async addTask(task: Task): Promise<Task> {
        this.tasks.push(task)
        return Promise.resolve(task);
    }

    public async getTask(id: string): Promise<Task> {
        const task = this.tasks.filter(i => i.uuid === id);

        if(task && task.length > 0) {
            return Promise.resolve(task[0]);
        }

        throw new NotFoundException('Task not found');
    }

    public async deleteTask(id: string): Promise<Task[]> {
        const task = this.tasks.filter(i => i.uuid === id);

        if(task.length === 0) {
            throw new NotFoundException('Task not found');
        }

        const newTasks = this.tasks.filter(i => i.uuid !== id);
        this.tasks = newTasks;
        return Promise.resolve(this.tasks);
    }

    public async getAllTask(): Promise<Task[]> {
        return Promise.resolve(this.tasks);
    }
}