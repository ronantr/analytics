import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { TagsDto } from './tags.dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(tagDto: TagsDto): Promise<Tag> {
    const tag = this.tagRepository.create(tagDto);
    return this.tagRepository.save(tag);
  }

  async update(tagDto: TagsDto, companyName: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: {
        id: tagDto.id,
        companyName: companyName,
      },
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    tag.comment = tagDto.comment;
    return this.tagRepository.save(tag);
  }

  async delete(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });

    if (!tag) {
      throw new Error('Tag not found');
    }

    tag.deleted = true;
    return this.tagRepository.save(tag);
  }

  async find(id: string, companyName: string): Promise<Tag> {
    return this.tagRepository.findOne({
      where: {
        id: id,
        companyName: companyName,
      },
    });
  }

  async findCompany(companyName: string): Promise<Tag[]> {
    return this.tagRepository.find({
      where: {
        companyName: companyName,
        deleted: false,
      },
    });
  }
}
