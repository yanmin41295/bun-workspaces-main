import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {db} from "../drizzleDb.ts";
import {User} from "@mono/common/src/api/UserApi.ts";

export const usersTable = sqliteTable("t_user", {
    id: int().primaryKey({autoIncrement: true}),
    username: text().notNull(),
    age: int().notNull(),
});


export class UserSchema {
    async findUsers() {
        return db.select().from(usersTable);
    }

    async addUser(user: User) {
        return db.insert(usersTable).values(user)
    }
}

export const userSchema = new UserSchema()