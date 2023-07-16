import { Injectable } from '@nestjs/common';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/tags.entity'; // Import the Tag type
import { ConversionFunnelsDto } from './conversion.funnels.dto'; // Import the ConversionFunnelsDto type

export type ConversionFunnel = {
  id?: string;
  comment: string;
  companyName: string;
  tags?: Tag[];
  deleted?: boolean;
};

@Injectable()
export class ConversionFunnelsService {
  constructor(private tagsService: TagsService) {}

  async create(conversionFunnelDto: ConversionFunnelsDto): Promise<ConversionFunnel> {
    conversionFunnelDto.id = undefined;

    // find tags
    const tags = await this.findTags(conversionFunnelDto.tags, conversionFunnelDto.companyName);

    if (tags.length === 0) {
      throw new Error('No tags found');
    }

    // create conversion funnel
    const newConversionFunnel: ConversionFunnel = {
      comment: conversionFunnelDto.comment,
      companyName: conversionFunnelDto.companyName,
      tags: tags
    };

    // link tags to conversion funnel
    await this.createLinkWithTag(newConversionFunnel, tags);

    return newConversionFunnel;
  }

  async update(conversionFunnelDto: ConversionFunnelsDto, companyName: string): Promise<ConversionFunnel> {
    return {
      id: conversionFunnelDto.id,
      comment: conversionFunnelDto.comment,
      companyName: companyName
    };
  }

  async delete(id: string): Promise<ConversionFunnel> {
    return { 
      id: id,
      comment: 'Sample Comment',
      companyName: 'Sample Company',
      deleted: true
    };
  }
  
  async find(id: string, companyName: string): Promise<ConversionFunnel> {
    const conversionFunnel: ConversionFunnel = {
      id: id,
      companyName: companyName,
      comment: 'Sample Comment'
    };

    const tags = await this.getTags(conversionFunnel);
    console.log(tags);

    return conversionFunnel;
  }

  async findCompany(companyName: string): Promise<ConversionFunnel[]> {
    const conversionFunnels: ConversionFunnel[] = [
      { id: '1', companyName: companyName, comment: 'Funnel 1' },
      { id: '2', companyName: companyName, comment: 'Funnel 2' }
    ];

    for (const conversionFunnel of conversionFunnels) {
      conversionFunnel.tags = await this.getTags(conversionFunnel);
    }

    return conversionFunnels;
  }

  // private methods
  private async findTags(tagIds: string[], companyName: string): Promise<Tag[]> {
    const tags = [];
    for (const tagId of tagIds) {
      const tag = await this.tagsService.find(tagId, companyName);
      if (tag) {
        tags.push(tag);
      }
    }
    return tags;
  }

  private async createLinkWithTag(conversionFunnel: ConversionFunnel, tags: Tag[]) {
    // Perform the necessary linking operations
  }

  private async getTags(conversionFunnel: ConversionFunnel): Promise<Tag[]> {
    // Retrieve the tags associated with the conversion funnel
    return [];
  }
}
