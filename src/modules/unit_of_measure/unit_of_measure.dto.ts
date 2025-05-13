import { ApiProperty } from '@nestjs/swagger';

export class UnitOfMeasureResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Gram' })
  unitName: string;

  @ApiProperty({ example: 'g', nullable: true })
  symbol: string | null;
}
