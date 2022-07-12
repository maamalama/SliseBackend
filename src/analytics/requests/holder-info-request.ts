import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class HolderInfoRequest {
  @ApiProperty({ type: String })
  @IsString()
  collectionName: string;
  @ApiProperty({ type: String, required: false })
  @IsString()
  contractAddress?: string;
  @ArrayMinSize(1)
  @IsArray()
  @IsString({ each: true })
  @Length(42,42, {
    each: true
  })
  //@Transform(({ value }) => value.split(','))
  @ApiProperty({ type: [String] })
  @Type(() => String)
  addresses: string[];
}