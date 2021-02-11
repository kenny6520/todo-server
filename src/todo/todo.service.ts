import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ){}

    async findAll(query){
        const { limit , offset } = query;
        const start = (+offset) * (+limit);

        const [data, length] = await this.todoRepository.findAndCount({ 
            skip: start,
            take: +limit
        });

        return { data, length, limit: +limit, offset: +offset, skip: start }
        // return this.todoRepository.find();
    }

    async findOne(id:string){
        const todo = await this.todoRepository.findOne(id);
        if(!todo){
            throw new NotFoundException(`todo ${id} not found`)
        }
        return todo;
    }

    create(createTodoDto: CreateTodoDto) {
        const todo = this.todoRepository.create(createTodoDto);
        return this.todoRepository.save(todo);
    }

    async update(id:string, updateTodoDto: UpdateTodoDto) {
        const todo = await this.todoRepository.preload({ id: +id, ...updateTodoDto });
        if (!todo) {
            throw new NotFoundException(`todo ${id} not found`)
        }
        return this.todoRepository.save(todo);
    }

    async remove(id:string){
        const todo = await this.findOne(id);
        return this.todoRepository.remove(todo);
    }
}
