import { ApiProperty } from "@nestjs/swagger";

export abstract class CreateUserDto{
    id?: string;
    @ApiProperty({ example : 'johndoe@google.fr', required: true})
    email: string;
    @ApiProperty({ example : 'Password123456!', required: true})
    password: string;
    @ApiProperty({ example : 'John', required: true})
    first_name: string;
    @ApiProperty({ example : 'Doe', required: true})
    last_name: string;
    @ApiProperty({ example : '0612345678', required: false})
    phone?: string;
    @ApiProperty({ example : 'recruiter', required: true})
    role: 'recruiter' | 'talent';
    created_at: string;
    updated_at: string;
    @ApiProperty({ example : 'France', required: false})
    country?: string;
    @ApiProperty({ example : 'Paris', required: false})
    city?: string;
    @ApiProperty({ example : 'GMT+1', required: false})
    timezone?: string;
    @ApiProperty({ example : 'French', required: false})
    language?: string;
    @ApiProperty({ example : true, required: true})
    is_verified: boolean;
    @ApiProperty({ example : '2024-12-31', required: false})
    last_login?: string;
    @ApiProperty({ example : 0, required: false})
    failed_login_attempts?: number;
}