import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { ConversionFunnelsService } from './conversion.funnels.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConversionFunnelsDto } from './conversion.funnels.dto';

@Controller('conversion_funnels')
export class ConversionFunnelsController {
  constructor(private conversionFunnelsService: ConversionFunnelsService) {}

  @Get('')
  @UseGuards(AuthGuard)
  findCompany(@Request() req) {
    return this.conversionFunnelsService.findCompany(req.user.companyName);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  find(@Param('id') id: string, @Request() req) {
    return this.conversionFunnelsService.find(id, req.user.companyName);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() conversionFunnelDto: ConversionFunnelsDto, @Request() req) {
    conversionFunnelDto.companyName = req.user.companyName;
    return this.conversionFunnelsService.create(conversionFunnelDto);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  update(@Body() conversionFunnelDto: ConversionFunnelsDto, @Request() req) {
    return this.conversionFunnelsService.update(conversionFunnelDto, req.user.companyName);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.conversionFunnelsService.delete(id);
  }
}