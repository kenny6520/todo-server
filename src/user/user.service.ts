import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findAll(){
        return "user"
    }

    findOne(id: string){
        return id;
    }

    create(createUserDto){
        return createUserDto;
    }
}
