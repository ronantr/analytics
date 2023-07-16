import {
    IsString,
    IsEmail,
    IsBoolean,
    IsNumber,
    IsEnum,
    IsNotEmpty,
    MinLength,
    IsArray,
  } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    //@IsNotEmpty()
    companyKBIS: string;

    @IsString()
    //@IsNotEmpty()
    companyURL: string;

    @IsArray()
    @IsNotEmpty()
    roles: string;

    @IsBoolean()
    isVerified: boolean;

}
export class UpdateUserDto {
    @IsString()
    username: string;
    
    @IsString()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    companyKBIS: string;

    @IsString()
    companyURL: string;

    @IsBoolean()
    isVerified: boolean;

    @IsString()
    roles: string;
}