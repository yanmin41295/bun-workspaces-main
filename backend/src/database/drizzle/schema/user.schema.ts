import {int, text} from "drizzle-orm/sqlite-core";
import {db, useTableDefine} from "../drizzleDb.ts";
import {User} from "@mono/common/src/api/UserApi.ts";
import {SQLiteInsertValue} from "drizzle-orm/sqlite-core/query-builders/insert";
import {SQLiteTable} from "drizzle-orm/sqlite-core/table";

export const usersTable = useTableDefine<User>('users', {
    id: int().primaryKey({autoIncrement: true}),
    username: text().notNull(),
    age: int().notNull(),
})
usersTable
export class UserSchema {

    async findUsers() {
        return db.select().from(usersTable);
    }

    async findByName(name: string) {
        let user = await db.select().from(usersTable)
        let user0 = user[0];
    }

    async addUser(user: User) {
        let users = await this.findUsers()
        return db.insert(usersTable).values(user)
    }
}

export const userSchema = new UserSchema()


// 定义通用的 CRUD 类
export class GenericCRUD<T extends SQLiteInsertValue<SQLiteTable>> {
    constructor(private table: any) {
    }

    // 创建记录
    async create(item: T) {
        return db.insert(this.table).values(item).returning();
    }

    // 查找所有记录
    async findAll() {
        return db.select().from(this.table);
    }

    // 根据 ID 查找记录
    async findById(id: number) {
        return db.select().from(this.table).where({id});
    }

    // 根据条件查找记录
    async findByCondition(condition: any) {
        return db.select().from(this.table).where(condition);
    }

    // 更新记录
    async update(id: number, item: Partial<T>) {
        return db.update(this.table).set(item).where({id}).returning();
    }

    // 删除记录
    async delete(id: number) {
        return db.delete(this.table).where({id}).returning();
    }
}

// 创建 User 表的 CRUD 实例
export const userCRUD = new GenericCRUD<User>(usersTable);


