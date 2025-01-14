import { ApiProperty } from '@nestjs/swagger';
import { Recruiter } from "src/recruiter/entities/recruiter.entity";
import { Talent } from "src/talent/entities/talent.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn("uuid")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        example: 'Johndoe@google.fr',
        description: 'User mail address'
    })
    @Column()
    email: string;

    @ApiProperty({
        example: 'Password123456!',
        description: 'The user password'
    })
    @Column()
    password: string;

    @ApiProperty({
        example: 'John',
        description: 'The user first name'
    })
    @Column()
    first_name: string;

    @ApiProperty({
        example: 'Doe',
        description: 'The user last name'
    })
    @Column()
    last_name: string;

    @ApiProperty({
        example: '0612345678',
        description: 'The user phone number'
    })
    @Column({nullable: true})
    phone: string;

    @ApiProperty({
        enum: ['recruiter', 'talent']
    })
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

    @ApiProperty({
        example: 'France',
        description: 'The user country'
    })
    @Column({nullable: true})
    country: string;

    @ApiProperty({
        example: 'Paris',
        description: 'The user city'
    })
    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    timezone: string;

    @ApiProperty({
        example: 'French',
        description: 'The user language'
    })
    @Column({nullable: true})
    language: string;

    @ApiProperty({
        example: 'true',
        description: 'The user verified his account'
    })
    @Column({default: false})
    is_verified: boolean;

    @ApiProperty({
        example: '2024-12-31',
        description: 'The user last login date'
    })
    @Column({nullable: true})
    last_login: string;

    @ApiProperty({
        example: '2',
        description: 'The user failed login attempts'
    })
    @Column({default: 0})
    failed_login_attempts: number;
}

