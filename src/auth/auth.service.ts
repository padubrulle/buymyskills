import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ){}

    /**
     * Need to be changed
     * @param email 
     * @param password
     * @return any atm 
     */
    async signIn(
        email: string, 
        pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        console.log(user)
        if(!await bcrypt.compare(pass, user.password)){
            throw new UnauthorizedException();
        }

        const payload = { 
            sub: user.id,
            email: user.email,
            firstname: user.first_name
        }

        return { 
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
