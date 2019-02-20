import { ICollectionValue } from '@layout/classes/core';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { SearchBoxView } from './SearchBoxView';

interface ISearchOption {
  default?: string;
  fields?: ICollectionValue[];
  onApply: (find?: string, findBy?: string) => void;
}

interface IOwnState {
  find?: string;
  findBy?: string;
  isOpen: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOpen: StateHandler<IOwnState>;
  setClear: StateHandler<IOwnState>;
  setFind: StateHandler<IOwnState>;
  setFindBy: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleOnClose: () => void;
  handleOnClear: () => void;
  handleOnClickField: (findBy?: string) => void;
}

export type SearchBoxProps 
  = IOwnState 
  & IOwnStateUpdater 
  & ISearchOption 
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<SearchBoxProps, IOwnState> = (props: SearchBoxProps): IOwnState => ({
  find: props.default,
  isOpen: false
});

const stateUpdaters: StateUpdaters<SearchBoxProps, IOwnState, IOwnStateUpdater> = {
  setClear: (state: IOwnState) => (): Partial<IOwnState> => ({
    find: undefined,
    findBy: undefined
  }),
  setFind: (state: IOwnState) => (find?: string): Partial<IOwnState> => ({
    find
  }),
  setFindBy: (state: IOwnState) => (findBy?: string): Partial<IOwnState> => ({
    findBy,
    isOpen: false
  }),
  setOpen: (state: IOwnState) => (open: boolean): Partial<IOwnState> => ({
    isOpen: open
  })
};

const handlerCreators: HandleCreators<SearchBoxProps, IOwnHandler> = {
  handleOnChange: (props: SearchBoxProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setFind(value);
  },
  handleOnKeyUp: (props: SearchBoxProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.setClear();
      props.onApply();
    }

    // enter pressed
    if (event.keyCode === 13) {
      props.onApply(props.find, props.findBy);
    }
  },
  handleOnClickField: (props: SearchBoxProps) => (findBy?: string) => {
    props.setFindBy(findBy);
    props.onApply(props.find, findBy);
  },
  handleOnOpen: (props: SearchBoxProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setOpen(true);
  },
  handleOnClose: (props: SearchBoxProps) => () => {
    props.setOpen(false);
  },
  handleOnClear: (props: SearchBoxProps) => () => {
    props.setClear();
    props.onApply();
  }
};

export const SearchBox = compose<SearchBoxProps, ISearchOption>(
  setDisplayName('SearchBox'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  injectIntl
)(SearchBoxView);