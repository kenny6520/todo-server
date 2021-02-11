import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
 
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @LI NOTE: 不使用配置文件 链接数据库
// const noConfigFile = TypeOrmModule.forRoot({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "admin",
//   password: "livs.john123",
//   database: "postgres", // 这是数据库类型不是数据库中 server 名
//   autoLoadEntities: true,
//   synchronize: true // 生产环境中禁用此选项
// })

@Module({
  imports: [
    UserModule,
    TodoModule,
    // noConfigFile,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection){}
}
