// 使用动态导入实现懒加载
import {defineAsyncComponent} from 'vue';
import {StringCommonEditor} from "@/components/table/column/CommonEditorTsx";

export const ReadComponentMap: Record<string, any> = {
    string: defineAsyncComponent(() => import('./column/StringRead.vue')),
    CommonRead: defineAsyncComponent(() => import('./column/CommonRead.vue'))
}

export const EditComponentMap: Record<string, any> = {
    StringEditor: defineAsyncComponent(() => import('./column/StringEditor.vue')),
    DateEditor: defineAsyncComponent(() => import('./column/DateEditor.vue')),
    StringCommonEditor: StringCommonEditor,
}