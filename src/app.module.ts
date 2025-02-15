import { Module } from '@nestjs/common';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill/entities/skill.entity';
import { DataSource } from 'typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { RecruiterModule } from './recruiter/recruiter.module';
import 'dotenv/config'
import { Recruiter } from './recruiter/entities/recruiter.entity';
import { Talent } from './talent/entities/talent.entity';
import { TalentModule } from './talent/talent.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      schema: process.env.SCHEMA,
      database: process.env.DATABASE,
      entities: [Skill, Category, Recruiter, Talent, User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SkillModule,
    CategoryModule,
    RecruiterModule,
    TalentModule,
    CompanyModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
