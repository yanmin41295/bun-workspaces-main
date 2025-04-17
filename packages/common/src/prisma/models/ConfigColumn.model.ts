import {IsBoolean, IsDefined, IsInt, IsString} from "class-validator";

export class ConfigColumn {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    title!: string;

    @IsDefined()
    @IsString()
    desc!: string;

    @IsDefined()
    @IsInt()
    tableId!: number;

    @IsDefined()
    @IsString()
    dataType!: string;

    @IsDefined()
    @IsString()
    dataIndex!: string;

    @IsDefined()
    @IsBoolean()
    isShow!: boolean;

    @IsDefined()
    @IsBoolean()
    isEdit!: boolean;

    @IsDefined()
    @IsInt()
    order!: number;
}
