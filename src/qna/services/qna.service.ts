import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Qna, QnaDocument } from '../schemas/qna.schema';

@Injectable()
export class QnaService {
  constructor(@InjectModel(Qna.name) private qnaModel: Model<QnaDocument>) {}

  async create(question: string, answer: string): Promise<Qna> {
    const newQna = new this.qnaModel({ question, answer });
    return newQna.save();
  }

  async findAll(): Promise<Qna[]> {
    return this.qnaModel.find().exec();
  }

  async findOne(id: string): Promise<Qna> {
    return this.qnaModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Qna>): Promise<Qna> {
    return this.qnaModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Qna> {
    return this.qnaModel.findByIdAndDelete(id).exec();
  }
}
