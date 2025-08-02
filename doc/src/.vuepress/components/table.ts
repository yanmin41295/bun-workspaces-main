import type {DefaultRecordType} from "ant-design-vue/es/vc-table/interface.js";
import {ColumnType} from "ant-design-vue/es/table/interface.js";

export interface DataColumn<T = any> {
    title?: string;
    fixed?: boolean;
    width?: string | number;
    resizable?: boolean;
    minWidth?: number
    maxWidth?: number
    align?: 'left' | 'right' | 'center'
    customRender: string
    key: string
    visible?: boolean
    data: T
}
