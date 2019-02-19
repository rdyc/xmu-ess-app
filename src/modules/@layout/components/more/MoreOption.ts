import { IAppBarMenu } from '@layout/interfaces';
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

import { MoreOptionView } from './MoreOptionView';

interface IOwnOption {
  id: string;
  menuItems: IAppBarMenu[];
  onSelected: (item: IAppBarMenu) => void;
}

interface IOwnState {
  isOpen: boolean;
  selected?: IAppBarMenu;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
  setSelected: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleVisibility: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnSelected: (item: IAppBarMenu) => void;
}

export type MoreOptionProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpen: false
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setOpen: (state: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !state.isOpen    
  }),
  setSelected: (prev: IOwnState) => (menu: IAppBarMenu): IOwnState => ({
    isOpen: false,
    selected: menu
  })
};

const handlerCreators: HandleCreators<MoreOptionProps, IOwnHandler> = {
  handleVisibility: (props: MoreOptionProps) => (event: React.MouseEvent<HTMLDivElement>) => {
    props.setOpen();
  },
  handleOnSelected: (props: MoreOptionProps) => (item: IAppBarMenu) => {
    props.setSelected(item);
    props.onSelected(item);
  }
};

export const MoreOption = compose<MoreOptionProps, IOwnOption>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(MoreOptionView);