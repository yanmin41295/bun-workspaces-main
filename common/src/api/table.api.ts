import {type Api} from "./controller.api.ts";

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


export abstract class TableDefindeApi implements Api<TableDefindeApi> {
    getApiUrl() {
        return {
            namespace: "/users",
            methods: {
                // todo 支持方法，描述等
                "findByUserId": '/userId',
            }
        }
    }

    abstract findByUserId(userInfo: { userId: string; }): Promise<User>;
}


