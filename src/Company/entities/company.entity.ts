import { Recruiter } from "src/recruiter/entities/recruiter.entity";
import { Talent } from "src/talent/entities/talent.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('companies')
export class Company {
    @PrimaryColumn("uuid")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
    
    @Column()
    industry: string;

    @OneToMany(() => Recruiter, (recruiter) => recruiter.company)
    recruiters: Recruiter[];

    @OneToMany(() => Talent, (talent) => talent.current_company)
    talents: Talent[];
}
