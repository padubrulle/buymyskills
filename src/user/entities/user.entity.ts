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

    @Column()
    phone: string;

    @Column({type: 'enum', enum: ['recruiter', 'talent']})
    role: 'recruiter' | 'talent';

    @OneToOne(() => Recruiter, (recruiter) => recruiter.user)
    recruiter: Recruiter;

    @OneToOne(() => Talent, (talent) => talent.user)
    talent: Talent;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    timezone: string;

    @Column({nullable: true})
    language: string;

    @Column()
    is_verified: boolean;

    @Column({nullable: true})
    last_login: Date;

    @Column({nullable: true})
    failed_login_attempts: number;
}
