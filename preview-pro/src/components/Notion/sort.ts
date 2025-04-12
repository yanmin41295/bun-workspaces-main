export interface SortColumn {
  id: string;
  columnKey: string;
  name: string;
  tag?: string;
  direction: 'asc' | 'desc';
  sortType: string;
}

export function useSort() {
  const sortList = reactive<SortColumn[]>([
    {
      id: 'name',
      columnKey: 'name',
      name: '姓名',
      tag: '姓名',
      direction: 'asc',
      sortType: 'string',
    },
    {
      id: 'age',
      columnKey: 'age',
      name: '年龄',
      tag: '年龄',
      direction: 'desc',
      sortType: 'string',
    },
  ]);

  function handleSortClick(item: SortColumn) {
    console.log(item);
    let data = sortList.find((i: SortColumn) => i.id === item.id);
    if (!data) {
      return;
    }
    if (item.direction === 'asc') {
      data.direction = 'desc';
    } else if (item.direction === 'desc') {
      data.direction = 'asc';
    }
  }

  return { handleSortClick, sortList };
}


