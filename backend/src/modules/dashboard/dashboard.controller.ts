import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('widget')
  async getWidget(
    @Query() query: DashboardQueryDto,
  ): Promise<DashboardResponseDto> {
    return this.dashboardService.getWidget(query.city);
  }
}
