import { Recruiter } from "src/recruiter/entities/recruiter.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { Talent } from "src/talent/entities/talent.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
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
    phone: string;

    @Column({type: 'enum', enum: ['recruiter', 'talent']})
    role: 'recruiter' | 'talent';

    @OneToOne(() => Recruiter, (recruiter) => recruiter.user)
    recruiter: Recruiter;

    @OneToOne(() => Talent, (talent) => talent.user, {cascade: true})
    talent: Talent;

    @Column({default: new Date().toJSON()})
    created_at: string;

    @Column({default: new Date().toJSON()})
    updated_at: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    timezone: string;

    @Column({nullable: true})
    language: string;

    @Column({default: false})
    is_verified: boolean;

    @Column({nullable: true})
    last_login: string;

    @Column({default: 0})
    failed_login_attempts: number;
}
