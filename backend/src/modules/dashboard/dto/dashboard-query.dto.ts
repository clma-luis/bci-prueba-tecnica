import { IsString, IsNotEmpty } from 'class-validator';

export class DashboardQueryDto {
  @IsString()
  @IsNotEmpty()
  city: string;
}
