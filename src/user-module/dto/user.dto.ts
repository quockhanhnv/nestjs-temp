import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string
}

export class UserParamsDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
}