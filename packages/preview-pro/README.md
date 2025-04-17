# Ant Design Vue Pro Layout

This template should help get you started developing with Vue 3 and Ant Design Vue 2 in Vite.

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual
`h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from
VSCode command palette.

# 数据视图

表格是一个视图，核心操作是增删改查，这种操作对应后端数据库的一张或多张表，每一个表格视图这些操作对应后端的视图controller实现

数据表行数据

每一列的数据类型为boolean,number,string,object及他们的数组类型

> 所有的数据显示逻辑都是有个数据源，然后通过组件显示出来，然后进入编辑视图，编辑保存

| 数据类型      | viewTemplate                                                                          | editTemplate               |
|-----------|---------------------------------------------------------------------------------------|----------------------------|
| boolean   | default 显示字面量 true/false<br />component 组件模板    内置： switch tag icon ; custom          | 内置： switch ; custom        |
| string    | default 显示字面量<br />component 组件模板    内置： tag ，**segmented**，image（此时数据值为图片地址）; custom | default 内置： 无; custom      |
| number    | default 显示字面量<br />component 组件模板    内置： tag ; custom                                 |                            |
| object    | component 组件模板    内置： dataIndex （显示对象的某个基本类型的属性值）; custom                             | 内置： dataIndex（编辑后保存对象的属性值） |
| boolean[] | default 显示字面量 true/false逗号拼接                                                          |                            |
| string[]  | Timeline                                                                              |                            |
| number[]  |                                                                                       |                            |
| object[]  | Timeline                                                                              |                            |

# 功能

# - 自定义表格列

列类型包括：

自定义表格过滤器

自定义排序

单元格自定义编辑功能

行自定义编辑功能
