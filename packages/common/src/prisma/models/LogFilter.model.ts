import { IsInt, IsDefined, IsString } from "class-validator";

export class LogFilter {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    filter!: string;

    @IsDefined()
    @IsInt()
    logId!: number;
}
