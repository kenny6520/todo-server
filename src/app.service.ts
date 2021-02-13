import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div>
      <h1>Hello World!</h1>
      <ul>
        <li><a href="/user">/user</a></li>
        <li><a href="/todo">/todo</a></li>
      </ul>
    </div>
    `;
  }
}
