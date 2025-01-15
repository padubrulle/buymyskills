import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export abstract class UpdateUserDto{
    @ApiProperty({ example : 'johndoe@google.fr', required: true})
    email?: string;
    @ApiProperty({ example : 'Password123456!', required: true})
    password?: string;
    @ApiProperty({ example : 'John', required: true})
    first_name?: string;
    @ApiProperty({ example : 'Doe', required: true})
    last_name?: string;
    @ApiPropertyOptional({ example : '0612345678'})
    phone?: string;
    @ApiProperty({ example : 'recruiter', required: true})
    role?: 'recruiter' | 'talent';
    @ApiHideProperty()
    updated_at: string;
    @ApiPropertyOptional({ example : 'France'})
    country?: string;
    @ApiPropertyOptional({ example : 'Paris'})
    city?: string;
    @ApiPropertyOptional({ example : 'GMT+1'})
    timezone?: string;
    @ApiPropertyOptional({ example : 'French'})
    language?: string;
    @ApiProperty({ example : true, required: true})
    is_verified: boolean;
    @ApiPropertyOptional({ example : '2024-12-31'})
    last_login?: string;
    @ApiPropertyOptional({ example : 0})
    failed_login_attempts?: number;
}