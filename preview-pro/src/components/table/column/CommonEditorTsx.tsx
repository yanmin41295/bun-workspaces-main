import {reactive, ref} from 'vue';
import {onClickOutside} from '@vueuse/core';
import {Input} from 'ant-design-vue';

interface CommonEditorProps {
    text: any;
    value: any;
    record: Record<string, any>;
    index: number;
    column: any;
}

export default function CommonEditorTsx(props: CommonEditorProps, {emit, slots}: {
    emit: (event: 'saveData', value: any) => void,
    slots: any
}) {
    const state = reactive({
        value: props.value
    });
    const target = ref<HTMLElement | null>(null);
    const saveData = () => {
        emit('saveData', state.value);
    };

    // 应用 onClickOutside 指令
    onClickOutside(target, () => {
        saveData();
    });

    return (
        <div ref={target}>
            {slots.default?.({
                text: props.text,
                value: props.value,
                record: props.record,
                index: props.index,
                column: props.column,
                saveData
            })}
        </div>
    );
};

export function StringCommonEditor(props: CommonEditorProps, {emit}: {
    emit: (event: 'saveData', value: any) => void
}) {
    const state = reactive({
        value: props.value
    });
    return CommonEditorTsx(props, {
        emit: (event: 'saveData', value: any) => {
            emit(event, state.value);
        }, slots: {
            default: ({saveData}: any) => (
                <Input v-model={state.value} OnkeyUpEnter={saveData}/>
            )
        }
    });
}
