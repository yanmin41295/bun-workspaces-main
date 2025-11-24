import type {ColumnType} from 'ant-design-vue/es/table/interface';

export interface BodyCellType<T = {}, RecordType = any> {
    text: any;
    value: any;
    record: Record<string, any>;
    index: number;
    column: ColumnType<RecordType> & T;
}