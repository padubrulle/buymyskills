import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Talent {
    @PrimaryColumn("uuid")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({nullable: true})
    personal_website: string;

    @Column({nullable: true})
    current_company: string;

    @ManyToMany(() => Skill, {nullable: true})
    @JoinTable()
    skills: Skill[];
}
