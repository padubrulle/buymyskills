import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
@PrimaryGeneratedColumn()
@PrimaryColumn()
id: number;

@Column()
name: string;
}
