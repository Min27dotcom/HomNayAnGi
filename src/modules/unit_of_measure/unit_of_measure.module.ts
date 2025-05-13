import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitOfMeasure } from './entities/unit_of_measure.entities';
import { UnitOfMeasureResponseDto } from './unit_of_measure.dto';
import { UnitOfMeasureService } from './unit_of_measure.service';
import { UnitOfMeasureController } from './unit_of_measure.controller';
import { AuthModule } from '../auth/auth.module';
import { Account } from '../account/entities/account.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitOfMeasure, Account]),
    AuthModule, // ✅ cần thiết để inject được AccountRepository cho AuthGuard
  ],
  controllers: [UnitOfMeasureController],
  providers: [UnitOfMeasureService],
  exports: [UnitOfMeasureService],
})
export class UnitOfMeasureModule {}

