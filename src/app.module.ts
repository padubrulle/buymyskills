import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillModule } from './skill/skill.module';

@Module({
    imports: [SkillModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
