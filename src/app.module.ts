import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QnaModule } from './qna/qna.module';
import * as env from 'dotenv';

@Module({
  imports: [MongooseModule.forRoot(env['MONGO_URI']), QnaModule],
})
export class AppModule {}
