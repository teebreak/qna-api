import { Module } from '@nestjs/common';
import { QnaService } from './services/qna.service';
import { QnaController } from './controllers/qna.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Qna, QnaSchema } from './schemas/qna.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Qna.name, schema: QnaSchema }])],
  providers: [QnaService],
  controllers: [QnaController],
})
export class QnaModule {}
