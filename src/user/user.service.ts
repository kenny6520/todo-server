import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){}

    findAll(){
        return this.userRepository.find()
    }

    findOne(id: string){
        // TODO: try中的throw会被finally捕获到, 导致信息返回错误
        // try {
            const user = this.userRepository.findOne(id);
            if (!user){
                throw new NotFoundException(`User ${id} not found`);
            }
            return user;
        // } finally  {
        //     throw new HttpException({
        //         id,
        //         message: `QueryFailedError: invalid input syntax for type uuid: ${id}`
        //     }, HttpStatus.BAD_REQUEST)
        // }
    }

    create(createUserDto: CreateUserDto){
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
}
