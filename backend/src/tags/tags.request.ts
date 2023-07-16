import {
    IsString,
    IsEmail,
    IsBoolean,
    IsNumber,
    IsEnum,
    IsNotEmpty,
    MinLength,
  } from 'class-validator';

export class CreateTagDto {

    @IsString()
    @IsNotEmpty()
    comment: string;
    
    @IsString()
    @IsNotEmpty()
    companyName: string;

}