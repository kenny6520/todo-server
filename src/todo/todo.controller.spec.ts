import * as request from "supertest";
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoModule } from './todo.module';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  // let todoController: TodoController;
  // let todoService: TodoService;

  let app: INestApplication;
  let todoService = {
    findAll(){
      return []
    }
  };

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [TodoModule],
    //   controllers: [TodoController],
    //   providers: [TodoService],
    // }).compile();

    // todoController = module.get<TodoController>(TodoController);
    // todoService = module.get<TodoService>(TodoService);

    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule]
    })
    .overrideProvider(TodoService)
    .useValue(todoService)
    .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('findAll', () => {
    it("GET todo, should return an array", () => {
      return request(app.getHttpServer())
        .get('todo')
        .expect(200)
        .expect({
          data: todoService.findAll()
        })
    })
  })
});
