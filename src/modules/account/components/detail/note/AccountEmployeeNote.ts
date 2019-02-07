import { IEmployeeNote } from '@account/classes/response/employeeNote';
import { AccountEmployeeNoteFormData } from '@account/components/editor/form/note/AccountEmployeeNoteContainer';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeNoteView } from './AccountEmployeeNoteView';

type EditAction = 'update' | 'delete';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  formMode: FormMode | undefined;
  isReload: boolean | false;
  noteId?: string;
  isOpenDialog: boolean;
  isOpenMenu: boolean;
  noteItemIndex?: string | undefined;
  editAction?: EditAction | undefined;
  initialValues?: AccountEmployeeNoteFormData;
  page: number;
  size: number;
}

interface OwnHandlers {
  handleMenuOpen: (note: IEmployeeNote, index: number) => void;
  handleMenuClose: () => void;
  handleDialogClose: () => void;
  handleNew: () => void;
  handleEdit: (editAction: EditAction) => void;
  handleReload: () => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangePage: (page: number) => void;
  handleChangeSize: (size: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeNoteProps
  = WithUser
  & WithLayout
  & WithStyles<typeof styles>
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>
  & WithAccountEmployeeNote;

const createProps: mapper<AccountEmployeeNoteProps, OwnState> = (props: AccountEmployeeNoteProps): OwnState => {
  const { page, size } = props;
  const { request } = props.accountEmployeeNoteState.all;
  return {
    formMode: undefined,
    editAction: undefined,
    isOpenDialog: false,
    isOpenMenu: false,
    isReload: false,
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AccountEmployeeNoteProps, OwnHandlers> = {
  handleMenuOpen: (props: AccountEmployeeNoteProps) => (note: IEmployeeNote, index: number) => {
    const { stateUpdate } = props;

    stateUpdate({
      noteId: note.id,
      isOpenMenu: true,
      noteItemIndex: index,
      initialValues: {
        note: {
          id: note.id,
          employeeUid: props.match.params.employeeUid,
          text: note.text
        }
      }
    });
  },
  handleMenuClose: (props: AccountEmployeeNoteProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      noteId: undefined,
      isOpenMenu: false,
      noteItemIndex: undefined,
      initialValues: undefined
    });
  },
  handleDialogClose: (props: AccountEmployeeNoteProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      isOpenDialog: false,
      formMode: undefined,
      editAction: undefined
    });
  },
  handleNew: (props: AccountEmployeeNoteProps) => () => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.New,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: undefined,
      noteId: undefined,
      initialValues: {
        note: {
          id: undefined,
          employeeUid: props.match.params.employeeUid,
          text: undefined,
        }
      }
    });
  },
  handleEdit: (props: AccountEmployeeNoteProps) => (action: EditAction) => {
    const { stateUpdate } = props;

    stateUpdate({
      formMode: FormMode.Edit,
      isOpenDialog: true,
      isOpenMenu: false,
      editAction: action
    });
  },
  handleReload: (props: AccountEmployeeNoteProps) => () => {
    props.stateUpdate({
      isReload: true
    });
  },

  handleGoToNext: (props: AccountEmployeeNoteProps) => () => {
    props.stateUpdate({
      page: props.page + 1
    });
  },
  handleGoToPrevious: (props: AccountEmployeeNoteProps) => () => {
    props.stateUpdate({
      page: props.page - 1
    });
  },
  handleChangePage: (props: AccountEmployeeNoteProps) => (page: number) => {
    props.stateUpdate({
      page
    });
  },
  handleChangeSize: (props: AccountEmployeeNoteProps) => (size: number) => {
    props.stateUpdate({
      size,
      page: 1
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteProps, OwnState> = {
  componentWillUpdate(props: AccountEmployeeNoteProps, state: OwnState) {
    if (
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(props);
    }
    if (props.isReload) {
      loadData(props);

      props.stateUpdate({
        isReload: false
      });
    }
  }
};

const loadData = (props: AccountEmployeeNoteProps): void => {
  const { page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.accountEmployeeNoteDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      employeeUid: props.match.params.employeeUid,
      filter: {
        page,
        size,
        direction: 'ascending',
      }
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });    
  }
};

export const AccountEmployeeNote = compose<AccountEmployeeNoteProps, {}>(
  withUser,
  withRouter,
  withLayout,
  withStyles(styles),
  injectIntl,
  withAccountEmployeeNote,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeNoteProps, OwnHandlers>(handlerCreators),
  lifecycle<AccountEmployeeNoteProps, OwnState>(lifecycles)
)(AccountEmployeeNoteView);