import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  async getTasks({ title, description }: TaskFilterDto): Promise<Task[]> {
    return this.taskRepository.find({ where: { title, description } });
  }

  createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    } as Task);

    return this.taskRepository.save(task);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('task was not found');
    }

    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new NotFoundException('task was not found');
    }

    task.status = status;
    return this.taskRepository.save(task);
  }

  deleteTaskById(id: string): void {
    this.taskRepository.delete({ id });
  }
}
