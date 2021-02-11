import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Get("/:id")
    findOne(@Param("id") id){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Patch('/:id')
    updateUser(@Body() body){
    }
}
