import {computed, defineComponent, ref, type SetupContext} from 'vue';

// 定义组件的 props 类型，包含泛型数据参数
interface AbstractComponentProps<T, State extends { [key: string]: (T) => JSX.Element }, S extends keyof State> {
    stateViewMap: State;
    initialState: S;
    data: T;
}

let count = {
    view: 0,
    edit: 0,
}

function useState() {
    const currentMode = ref('view');
    const handleSwitchMode = (newMode: string) => {
        console.log(`Received switch mode event, new mode: ${newMode} ${count.edit} ${count.view}`);
        currentMode.value = newMode
    }
    return {
        currentMode,
        handleSwitchMode
    }
}


export const StateView = defineComponent((props) => {
    const {currentMode, handleSwitchMode} = useState();
    console.log(`StateView: ${props.initialState}`)
    const CurrentView = props.stateViewMap[props.initialState](props.data)

    return () => (
        <CurrentView onSwitchMode={handleSwitchMode}>
        </CurrentView>
    );
})

function EditMode(props: { name: string }, context: SetupContext<{ switchMode: (newMode: string) => void }>) {
    return (<button onClick={() => {
        console.log(`change to view mode`)
        context.emit('switchMode', 'view')
    }}>EditMode: {props.name}</button>)
}

function ViewMode(props: { name: string }, context: SetupContext<{ switchMode: (newMode: string) => void }>) {
    return (<button onClick={() => {
        console.log(`change to EditMode`)
        context.emit('switchMode', 'edit')
    }}>ViewMode: {props.name}</button>)
}


export default function TestStateView(props: { name: string }) {
    const {currentMode, handleSwitchMode} = useState();

    return (<StateView data={{name: 'test'}} stateViewMap={
        {
            edit: (data) => {
                count.edit++;
                return <EditMode  {...data} />
            },
            view: (data) => {
                count.view++;
                return <ViewMode  {...data} />
            }
        }
    } initialState={currentMode.value}/>)
}