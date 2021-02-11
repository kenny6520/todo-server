import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // sql table === 'todo'
export class Todo {
    @PrimaryGeneratedColumn() // 主要的列, 即是主键
    id: number;

    @Column()
    creator: string;

    @Column()
    creatTime: Date;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('citext')
    brief?: string;

    @Column('json', { nullable: true })
    contributors?: string[];

    @Column('json', { nullable: true })
    planlimit?: string[];

    @Column('boolean')
    completed: boolean;
}
