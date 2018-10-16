// import * as React from 'react';
// import { compose, lifecycle, pure, StateHandler, StateHandlerMap, withStateHandlers, withReducer } from 'recompose';
// import { Message, Transition } from 'semantic-ui-react';

// import './FlashMessage.css';

// export interface FlashMessageProps {
//   message: string;
//   isWarning?: boolean;
// }

// interface StateProps {
//   visible: boolean;
// }

// type StateHandlerProps = StateHandlerMap<StateProps> & {
//   display(): StateHandler<StateProps>;
//   erase(): StateHandler<StateProps>;
// };

// type EnhancedFlashMessageProps =
//   FlashMessageProps &
//   StateProps &
//   StateHandlerProps;

// const FlashMessage: React.SFC<EnhancedFlashMessageProps> = ({
//   message = '',
//   isWarning = false,
//   visible,
//   erase,
// }) => (
//   <>
//     <Transition
//       visible={visible}
//       animation="fade"
//       duration={800}
//     >
//       <Message
//         className="flash-message"
//         positive={!isWarning}
//         negative={isWarning}
//         onDismiss={erase}
//       >
//         {message}
//       </Message>
//     </Transition>
//   </>
// );

// export default compose<
//   EnhancedFlashMessageProps,
//   FlashMessageProps
// >(
//   withStateHandlers<
//     StateProps,
//     StateHandlerProps,
//     FlashMessageProps
//   >(
//     (props) => ({
//       ...props,
//       visible: false,
//     }),
//     {
//       display: (state, props) => () => ({
//         visible: true,
//       }),
//       erase: (state, props) => () => ({
//         visible: false,
//       }),
//     },
//   ),
//   lifecycle<EnhancedFlashMessageProps, {}, {}>({
//     componentDidMount() {
//       const { message, display, erase } = this.props;
//       if (message) {
//         display();
//         setTimeout(() => erase(), 3000);
//       }
//     },
//   }),
//   withReducer<>()
//   pure,
// )(FlashMessage);

/*
const { withStateHandlers, withReducer, StateHandlerMap } = Recompose;

console.clear()

////////////////////////////////////////
//
// Common part
//

interface ToggleState {
  enabled: boolean;
}

////////////////////////////////////////
//
// withStateHandlers example
//

interface ToggleHandler extends StateHandlerMap<ToggleState> {
  onClick: () => ToggleState;
}

const ToggleButtonSHBase: React.StatelessComponent<ToggleState & ToggleHandler> = ({ enabled, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      fontSize:'x-large',
      backgroundColor: enabled ? 'lightblue' : 'silver',
    }}
  >
    {enabled ? '💡Turned on!' : 'Push me'}
  </button>
);

const ToggleButtonSH = withStateHandlers<ToggleState, ToggleHandler>(
  { enabled: false },
  {
    onClick: (state: ToggleState) => () => {
      return { enabled: !state.enabled }
    },
  }
)(ToggleButtonSHBase);

////////////////////////////////////////
//
// withReducer example
//

enum ToggleActionNames {
  TOGGLE = 'TOGGLE',
}

interface ToggleAction {
  type: ToggleActionNames;
}

type ToggleReducer = (state: ToggleState, action: ToggleAction) => ToggleState;

const ToggleButtonRBase: React.StatelessComponent<{ state: ToggleState, dispatch: ToggleReducer}> = ({ state, dispatch, children }) => (
  <button
    onClick={() => dispatch({ type: ToggleActionNames.TOGGLE })}
    style={{
      fontSize:'x-large',
      backgroundColor: state.enabled ? 'lightgreen' : 'silver',
    }}
  >
    {state.enabled ? '💡Turned on!' : 'Push me'}
  </button>
);

const toggleReducer: ToggleReducer = (state: ToggleState, action: ToggleAction) => {
  switch (action.type) {
    case ToggleActionNames.TOGGLE:
      return { enabled: !state.enabled };
    default:
      return { enabled: false };
  }
};

const ToggleButtonR = withReducer<{}, ToggleState, ToggleAction, 'state', 'dispatch'>(
  'state', 'dispatch', toggleReducer, { enabled: false }
)(ToggleButtonRBase);

// render both components

ReactDOM.render(
  (<div>
    <h3>withStateHandlers</h3>
    <ToggleButtonSH />
    <h3>withReducer</h3>
    <ToggleButtonR />
  </div>),
  document.querySelector('#root'));
*/