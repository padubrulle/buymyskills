import { Company } from "src/Company/entities/company.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('recruiters')
export class Recruiter {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    job_title: string;

    @OneToOne(() => User, (user) => user.role)
    @JoinColumn({name: "id"})
    user: User;

    @OneToMany(() => Company, (company) => company.recruiters, { onDelete: 'CASCADE'})
    @JoinColumn({name: "company_id"})
    company: Company;
}
