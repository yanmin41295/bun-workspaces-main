import type { SortColumn } from '@/components/Notion/sort';

export interface DataCell<T> {
  data: T,
  id: string,
  // columnKey: string,
  // viewType: string,
  // dataType: string,
  // rowKey: string,
  // width: number,
  // minWidth: number,
  // maxWidth: number,
  // resizable: boolean,
}

export interface DataRow {
  rowType: 'data' | 'header' | 'footer',
  cellData: DataCell<any>[]
}


export interface DataColumn {
  id: string;
  name: string;
  title: string;
  width: number;
  minWidth?: number;
  maxWidth?: number;
}


export function useColumn() {
  const columns = reactive<DataColumn[]>([
    {
      id: 'name',
      name: 'name',
      title: '姓名',
      width: 100,
      minWidth: 80,
      maxWidth: 200,
    },
    {
      id: 'age',
      name: 'age',
      title: '年龄',
      width: 100,
    },
  ]);

  function handleColumnResize(column: DataColumn, width: number) {

  }

  return { columns, handleColumnResize };
}

