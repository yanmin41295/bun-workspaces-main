import type {SortColumn} from '@/components/Notion/sort';
import type {ColumnType, DefaultRecordType} from "@surely-vue/table/dist/src/components/interface";
import {mock} from "mockjs";

export function log<T>(value: T, label: string = ''): T {
    console.log(label + " " + JSON.stringify(value));
    return value;
}


export function findOne<T, B extends true | undefined>(list: T[], filter: (item: T) => boolean, confirm?: B): B extends true ? T : (T | undefined) {
    return list.find(filter) as T;
}

export interface TableData extends DefaultRecordType {
    id: string;
    name: string;
    age: number;
}

export interface TableHeader extends ColumnType {
    id: string;
    name: string;
    dataIndex: string;
    dataType: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime' | 'label' | 'labels' | 'select' | 'dict';
    viewTemplate?: string,
    editable?: boolean | 'cellEditorSlot',
    editTemplate?: string,
    title: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
}


export function useTable() {
    const dataSource = reactive<TableData[]>(mock({
        'dataSource|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            'key|+1': '@id',
            'name|+1': "@cname",
            'gender': "@pick(['男', '女'])",
            'age': '@integer(18, 60)',
            'birthday': '@date',
            'address': '@city(true)',
            "tags": ["@ctitle(3, 5)", "@ctitle(3, 5)", "@ctitle(3, 5)"],
        }]
    }).dataSource);

    const columns: TableHeader[] = [
        {
            id: 'name',
            name: 'name',
            dataIndex: 'name',
            dataType: 'string',
            viewTemplate: 'string',
            editable: true,
            initValue: '',
            title: '姓名',
        },
        {
            id: 'age',
            dataIndex: 'age',
            dataType: 'number',
            viewTemplate: 'number',
            name: 'age',
            initValue: 0,
            editable: true,
            title: '年龄',
        },
        {
            id: 'birthday',
            dataIndex: 'birthday',
            dataType: 'date',
            viewTemplate: 'date',
            editTemplate: 'date',
            initValue: 0,
            name: 'birthday',
            editable: 'cellEditorSlot',
            title: '生日',
        },
        {
            id: 'gender',
            dataIndex: 'gender',
            dataType: 'number',
            viewTemplate: 'label',
            name: 'gender',
            initValue: 0,
            editable: true,
            title: '性别',
        },
        {
            id: 'address',
            dataIndex: 'address',
            dataType: 'string',
            viewTemplate: 'string',
            name: 'address',
            initValue: '',
            title: '住址',
        }, {
            id: 'tags',
            dataIndex: 'tags',
            dataType: 'labels',
            viewTemplate: 'labels',
            editTemplate: 'labels',
            name: 'tags',
            initValue: [],
            editable: 'cellEditorSlot',
            title: '标签',
        },
    ];
    return {
        columns, dataSource
    }
}