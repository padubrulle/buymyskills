import { Company } from "src/Company/entities/company.entity";
import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('talents')
export class Talent {
    @PrimaryColumn("uuid")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => User, (user) => user.talent)
    @JoinColumn({name: "user_id"})
    user: User;

    @OneToOne(() => Company, (company) => company.talents, {nullable: true})
    @JoinColumn({name: "current_company_id"})
    current_company: Company | null;

    @Column({nullable: true})
    job_title: string;

    @Column({nullable: true})
    portfolio_url: string;

    @Column({nullable: true})
    bio: string;

    @Column({nullable: true})
    status: string;

    @Column({nullable: true})
    is_available: boolean;

    @ManyToMany(() => Skill, {nullable: true})
    @JoinTable()
    skills: Skill[];
}
