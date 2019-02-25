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

import { PopupMenuView } from './PopupMenuView';

export interface IPopupMenuOption {
  id: string;
  name: string;
  enabled: boolean;
  visible: boolean;
}

interface IOwnOption {
  id: string;
  menuItems: IPopupMenuOption[];
  selectable: boolean;
  onSelected: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  isOpen: boolean;
  selected?: IPopupMenuOption;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
  setSelected: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleVisibility: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnSelected: (item: IAppBarMenu) => void;
}

export type PopupMenuProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpen: false,
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setOpen: (state: IOwnState) => (): Partial<IOwnState> => ({
    isOpen: !state.isOpen    
  }),
  setSelected: (prev: IOwnState) => (menu: IPopupMenuOption): IOwnState => ({
    isOpen: false,
    selected: menu
  })
};

const handlerCreators: HandleCreators<PopupMenuProps, IOwnHandler> = {
  handleVisibility: (props: PopupMenuProps) => (event: React.MouseEvent<HTMLDivElement>) => {
    props.setOpen();
  },
  handleOnSelected: (props: PopupMenuProps) => (item: IPopupMenuOption) => {
    if (props.selectable) {
      props.setSelected(item);
    } else {
      props.setOpen();
    }

    props.onSelected(item);
  }
};

export const PopupMenu = compose<PopupMenuProps, IOwnOption>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(PopupMenuView);