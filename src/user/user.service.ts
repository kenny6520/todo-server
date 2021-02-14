import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './entities/roles.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      relations: ['roles'],
      skip: offset * offset,
      take: limit,
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: string) {
    // TODO: try中的throw会被finally捕获到, 导致信息返回错误
    // try {
    const user = this.userRepository.findOne(id, {
      relations: ['roles'], // 关联roles
    });
    if (!user) {
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

  async create(createUserDto: CreateUserDto) {
    const roles = await Promise.all(
      createUserDto.roles.map((role) => this.preloadRolesByName(role)),
    );
    const user = this.userRepository.create({ ...createUserDto, roles });
    return this.userRepository.save(user);
  }

  private async preloadRolesByName(name: string): Promise<Roles> {
    const existingRoles = await this.rolesRepository.findOne({ name });
    if (existingRoles) return existingRoles;
    return this.rolesRepository.create({ name });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const roles =
      updateUserDto.roles &&
      (await Promise.all(
        updateUserDto?.roles.map((role) => this.preloadRolesByName(role)),
      ));
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      roles,
    });
    if (!user) {
      throw new NotFoundException(`user ${id} not found`);
    }
    return this.userRepository.create(user);
  }
}
