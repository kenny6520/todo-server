import { IsString, IsOptional, Length, IsEmail, IsNotEmpty, IsArray, IsEmpty } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 10)
    readonly name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    readonly nickname?: string;

    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsString()
    @Length(4, 20)
    @IsNotEmpty()
    readonly account: string;

    @IsString()
    @Length(8, 20)
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @Length(8, 20)
    @IsNotEmpty()
    readonly rePassword: string;

    @IsString()
    @IsOptional()
    readonly avatar?: string;

    @IsOptional()
    @IsArray()
    roles?: string[];
}
