import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class FindProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  limit: number = 200;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @IsOptional()

  search: string = '';
}
