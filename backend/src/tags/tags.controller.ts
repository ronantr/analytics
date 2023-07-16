import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TagsDto } from './tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('')
  @UseGuards(AuthGuard)
  findCompany(@Request() req) {
    return this.tagsService.findCompany(req.user.companyName);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  find(@Param('id') id: string, @Request() req) {
    return this.tagsService.find(id, req.user.companyName);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() tagDto: TagsDto, @Request() req) {
    tagDto.companyName = req.user.companyName;
    return this.tagsService.create(tagDto);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  update(@Body() tagDto: TagsDto, @Request() req) {
    return this.tagsService.update(tagDto, req.user.companyName);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.tagsService.delete(id);
  }
}