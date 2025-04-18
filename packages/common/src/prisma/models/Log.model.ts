import { IsInt, IsDefined, IsString, IsDate } from "class-validator";

export class Log {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    service!: string;

    @IsDefined()
    @IsInt()
    pid!: number;

    @IsDefined()
    @IsDate()
    time!: Date;

    @IsDefined()
    @IsString()
    level!: string;

    @IsDefined()
    @IsString()
    label1!: string;

    @IsDefined()
    @IsString()
    label2!: string;

    @IsDefined()
    @IsString()
    label3!: string;

    @IsDefined()
    @IsString()
    message!: string;
}
