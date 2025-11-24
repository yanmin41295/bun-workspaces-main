import { reactive } from 'vue';
import CommonEditor from './CommonEditor.vue';
import type { ColumnType } from 'ant-design-vue/es/table/interface';
import { Switch } from 'ant-design-vue';

interface SwitchEditorProps {
  text: any;
  value: any;
  record: Record<string, any>;
  index: number;
  column: ColumnType<any> & {
    viewTemplate?: string;
    editTemplate?: string;
    editable?: boolean;
  };
}

const SwitchEditor = (props: SwitchEditorProps, { emit }: { emit: (event: 'saveData', value: any) => void }) => {
  const state = reactive({
    data: props.value
  });

  return (
    <CommonEditor 
      value={props.value} 
      onSaveData={() => emit('saveData', state.data)} 
      text={props.text}
      column={props.column} 
      index={props.index} 
      record={props.record}>
      {{
        default: ({ state, text, column, index, record, saveData }: any) => (
          <Switch 
            checked={state.value} 
            onChange={saveData} 
            v-model:checked={state.value}
          />
        )
      }}
    </CommonEditor>
  );
};

export default SwitchEditor;