import type {SetupContext} from 'vue'
import type {Component} from "@vue/runtime-dom";

type FComponentProps = {
    editable?: boolean;
    viewTemplate?: string;
    editTemplate?: string;
    dataType: string
}

type Events = {
    sendMessage(message: string): void
}

export default function FComponent(props: FComponentProps, context: SetupContext<Events>) {
    return (
        <button onClick={() => context.emit('sendMessage', props.message)}>
            {props.message} {' '}
        </button>
    )
}

FComponent.props = {
    message: {
        type: String,
        required: true
    }
}

FComponent.emits = {
    sendMessage: (value: unknown) => typeof value === 'string'
}