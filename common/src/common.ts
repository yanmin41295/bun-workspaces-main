export function createClass<T extends { new(...args: any[]): any }>(c: T) {
    return new class extends c {
        constructor(...args: any[]) {
            super(args);
        }
    }
}

class IndexedArray<T> extends Array<T> {
    // 用于存储哈希索引的对象
    private index: { [key: string]: number[] } = {};

    // 重写 push 方法，在添加元素时更新索引
    push(...items: T[]): number {
        const startIndex = this.length;
        const result = super.push(...items);
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const key = String(item);
            if (!this.index[key]) {
                this.index[key] = [];
            }
            this.index[key].push(startIndex + i);
        }
        return result;
    }

    // 创建哈希索引的方法
    createIndex(): void {
        this.index = {};
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            const key = String(item);
            if (!this.index[key]) {
                this.index[key] = [];
            }
            this.index[key].push(i);
        }
    }

    // 通过索引查找数据的方法
    findByIndex(key: string): T[] {
        const indices = this.index[key];
        if (!indices) {
            return [];
        }
        return indices.map(index => this[index]);
    }

    // 获取索引对象
    getIndex(): { [key: string]: number[] } {
        return this.index;
    }
}

// 使用示例
const indexedArray = new IndexedArray<number>();
indexedArray.push(1, 2, 3, 2);
// 创建索引
indexedArray.createIndex();
console.log("索引对象:", indexedArray.getIndex());
// 通过索引查找值为 2 的元素
const result = indexedArray.findByIndex('2');
console.log("值为 2 的元素:", result);