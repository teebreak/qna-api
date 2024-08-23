import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { QnaService } from '../services/qna.service';
import { Qna } from '../schemas/qna.schema';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  async create(
    @Body() createQnaDto: { question: string; answer: string },
  ): Promise<Qna> {
    return this.qnaService.create(createQnaDto.question, createQnaDto.answer);
  }

  @Get()
  async findAll(): Promise<Qna[]> {
    return this.qnaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Qna> {
    return this.qnaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQnaDto: Partial<Qna>,
  ): Promise<Qna> {
    const qna = await this.qnaService.findOne(id);
    if (qna.isEditing) {
      throw new ConflictException(
        'This question is currently being edited by another user.',
      );
    }
    await this.qnaService.setEditing(id, true);
    const updatedQna = await this.qnaService.update(id, updateQnaDto);
    await this.qnaService.setEditing(id, false);
    return updatedQna;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Qna> {
    return this.qnaService.remove(id);
  }
}
