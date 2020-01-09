import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupLeaveList } from '@lookup/classes/response';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { InputLeaveView } from './InputLeaveView';

interface Leave {
  uid: string;
  name: string;
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  label: string; 
  disabled: boolean;
  required?: boolean;
  initialValue?: Leave | undefined;
}

interface OwnState {
  isOpen: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDialogVisibility: StateHandler<OwnState>;
}

interface OwnHandlers {
  handleDialogOpen: () => void;
  handleDialogClose: () => void;
  handleSelected: (leave: ILookupLeaveList) => void;
  getValueName: () => string;
}

export type InputLeaveProps 
  = WithUser
  & WithLookupLeave
  & OwnProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers;

const createProps: mapper<{}, OwnState> = (props: {}): OwnState => {
  return { 
    isOpen: false
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setDialogVisibility: (prevState: OwnState) => () => {
    return {
      isOpen: !prevState.isOpen
    };
  }
};

const handlerCreators: HandleCreators<InputLeaveProps, OwnHandlers> = {
  handleDialogOpen: (props: InputLeaveProps) => () => {
    props.setDialogVisibility();
  },
  handleDialogClose: (props: InputLeaveProps) => () => {
    props.setDialogVisibility();
  },
  handleSelected: (props: InputLeaveProps) => (leave: ILookupLeaveList) => {
    props.setDialogVisibility();

    props.input.onChange(leave.uid);
  },
  getValueName: (props: InputLeaveProps) => (): string => {
    const { input, initialValue } = props;
    const { response } = props.lookupLeaveState.list;
    
    let result: string = '';

    if (initialValue) {
      // load initial value
      result = initialValue.name;
    } else {
      // load from redux state
      if (response && response.data) {
        const leave = response.data.find(item => item.uid === input.value);
  
        if (!(leave === undefined || leave === null)) {
          result = leave.name;
        }
      }
    }

    return result;
  }
};

export const InputLeave = compose<InputLeaveProps, {}>(
  withUser,
  withLookupLeave,
  withStateHandlers<OwnState, OwnStateUpdaters>(createProps, stateUpdaters), 
  withHandlers<InputLeaveProps, OwnHandlers>(handlerCreators)
)(InputLeaveView);