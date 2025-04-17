import {IsDefined, IsInt, IsOptional, IsString} from "class-validator";

export class User {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    username!: string;

    @IsOptional()
    @IsString()
    email?: string | null;
}
