import * as React from 'react';
import {
    compose,
    lifecycle,
    mapper,
    ReactLifeCycleFunctions,
    StateHandler,
    StateHandlerMap,
    StateUpdaters,
    withStateHandlers
} from 'recompose';

type Outter = {
    initialCount: number;
};

type State = {
    counter: number;
};

interface Updaters extends StateHandlerMap<State> {
    increment: StateHandler<State>;
    decrement: StateHandler<State>;
}

type Props
    = Outter
    & State
    & Updaters;

const app: React.SFC<Props> = props => {
    return (
        <div>
            <span>{props.counter}</span>
            <button onClick={(e) => {
                e.preventDefault();
                props.increment(2);
            }}>
                increment
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                props.decrement(1);
            }}>
                decrement
            </button>
        </div>
    );
};

const createProps: mapper<Outter, State>
    = (props: Outter): State => ({ counter: props.initialCount });

const stateUpdaters: StateUpdaters<Outter, State, Updaters> = {
    increment: (prev: State): StateHandler<State> => (
        (value: number): Partial<State> => ({
            counter: prev.counter + value,
        })
    ),
    decrement: (prev: State): StateHandler<State> => (
        (value: number): Partial<State> => ({
            counter: prev.counter - value,
        })
    ),
};

const lifeCycleFunctions: ReactLifeCycleFunctions<Props, {}> = {
    componentWillMount() { console.log('component will mount'); },
    componentDidMount() { console.log('component did mount'); },
};

const App = compose<Props, Outter>( // composeを使ってまとめる
    withStateHandlers<State, Updaters, Outter>(createProps, stateUpdaters),
    lifecycle<Props, {}>(lifeCycleFunctions), // lifecycleまできたときにはStateは隠れてるので第二ジェネリック引数は{}でOK
)(app);

export default App;