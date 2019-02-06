import { IEmployee } from '@account/classes/response';
import { WithUser, withUser } from '@layout/hoc/withUser';
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

import { ListItemEmployeeSelectorView } from './ListItemEmployeeSelectorView';

interface IOwnOption {
  title: string;
  companyUids?: string;
  roleUids?: string;
  positionUids?: string;
  onSelected: (employee: IEmployee) => boolean;
}

interface IOwnState {
  isOpenDialog: boolean;
  selected?: IEmployee; 
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setDialog: StateHandler<IOwnState>;
  setSelected: StateHandler<IOwnState>;
  setCurrent: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleDialog: () => void;
  handleOnSelected: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnClickItem: (employee?: IEmployee) => void;
}

export type ListItemEmployeeSelectorProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isOpenDialog: false
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setDialog: (prev: IOwnState) => (): Partial<IOwnState> => ({
    isOpenDialog: !prev.isOpenDialog
  }),
  setSelected: (prev: IOwnState) => (employee?: IEmployee): Partial<IOwnState> => ({
    selected: employee
  }),
  setCurrent: (prev: IOwnState) => (employee?: IEmployee): Partial<IOwnState> => ({
    isOpenDialog: !prev.isOpenDialog,
    selected: employee
  }),
};

const handlerCreators: HandleCreators<ListItemEmployeeSelectorProps, IOwnHandler> = {
  handleDialog: (props: ListItemEmployeeSelectorProps) => () => {
    props.setDialog();
  },
  handleOnDiscard: (props: ListItemEmployeeSelectorProps) => (event: React.MouseEvent) => {
    props.setSelected();
  },
  handleOnSelected: (props: ListItemEmployeeSelectorProps) => (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.selected) {
      if (props.onSelected(props.selected)) {
        props.setSelected();
      }
    }
  },
  handleOnClickItem: (props: ListItemEmployeeSelectorProps) => (employee: IEmployee) => {
    props.setCurrent(employee);
  },
};

export const ListItemEmployeeSelector = compose<ListItemEmployeeSelectorProps, IOwnOption>(
  setDisplayName('ListItemEmployeeSelector'),
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  injectIntl
)(ListItemEmployeeSelectorView);