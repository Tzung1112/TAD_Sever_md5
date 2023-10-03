import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ReceiptsService {
  constructor(@InjectRepository(Receipt) private receipts: Repository<Receipt>){}
  create(createReceiptDto: CreateReceiptDto) {
    return 'This action adds a new receipt';
  }

  async findAll() {
    try {
      const results = await this.receipts.find({
        relations:{
          user:true
        }
      });
      return {
        status: true,
        data: results,
        message: "find ok!"
      }
    } catch (err) {

      throw new HttpException("Loi service", HttpStatus.BAD_REQUEST)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
