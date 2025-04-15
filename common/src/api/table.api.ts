export interface TableDefine {
    id: number;
    tableName: string;
    tableDesc: string;
    striped: boolean;
    rowDrag?: boolean;
    resizable?: boolean;
    columnDrag?: boolean;
}

export interface ColumnDefine {
    id: number;
    title: string;
    columnName: string;
    dataType: string;
    desc: string;
    defaultValue: string;

}




