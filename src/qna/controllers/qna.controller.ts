import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
    await this.qnaService.setEditing(id, updateQnaDto.isEditing);
    return await this.qnaService.update(id, updateQnaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Qna> {
    return this.qnaService.remove(id);
  }
}
