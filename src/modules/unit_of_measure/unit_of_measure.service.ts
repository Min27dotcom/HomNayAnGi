import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitOfMeasure } from './entities/unit_of_measure.entities';
import { UnitOfMeasureResponseDto } from './unit_of_measure.dto';

@Injectable()
export class UnitOfMeasureService {
  constructor(
    @InjectRepository(UnitOfMeasure)
    private readonly unitRepo: Repository<UnitOfMeasure>,
  ) {}

  async getAllUnits(): Promise<UnitOfMeasureResponseDto[]> {
    const units = await this.unitRepo.find();

    return units.map((unit) => ({
      id: unit.id,
      unitName: unit.unitName,
      symbol: unit.symbol,
    }));
  }
}
