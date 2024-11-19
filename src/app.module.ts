import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill/entities/skill.entity';
import { DataSource } from 'typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { RecruiterModule } from './recruiter/recruiter.module';
import 'dotenv/config'
import { Recruiter } from './recruiter/entities/recruiter.entity';

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
      entities: [Skill, Category, Recruiter],
      synchronize: true,
      autoLoadEntities: true,
    }),
    SkillModule,
    CategoryModule,
    RecruiterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
