import { Body, Controller, Patch, Post, Param, Res, HttpStatus, HttpException, Get, Delete, Query } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Post()
    async create(@Body() createTodoDto: CreateTodoDto, @Res() response){
        const createTodoResult = await this.todoService.create(createTodoDto);
        // if(!createTodoResult){
        //     throw new HttpException({
        //         message: `Failed to create a todo record, It is detected that your data passed to dd to verify, it may be an error on the server side, please contact relevant personnel`,
        //         dto: createTodoDto,
        //     }, HttpStatus.BAD_REQUEST)
        // }
        return response.status(HttpStatus.OK).send(createTodoResult);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto){
        return await this.todoService.update(id, updateTodoDto);
    }

    @Get()
    findAll(@Query() query: { limit: string, offset: string }){
        return this.todoService.findAll(query);
    }

    @Get(":id")
    findOne(@Param("id") id: string){
        return this.todoService.findOne(id);
    }

    @Delete(":id")
    remove(@Param("id") id: string){
        return this.todoService.remove(id);
    }
}
