import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { ProjectField } from '@project/classes/types';
import { ProjectRegistrationListView } from '@project/components/registration/list/ProjectRegistrationListView';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface OwnHandlers {
  handleGoToDetail: (projectUid: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: IListBarField) => void;
  handleChangeSort: (direction: SortDirection) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface OwnState {
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type RegisterListProps 
  = WithProjectRegistration
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<RegisterListProps, OwnState> = (props: RegisterListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.projectRegisterState.all;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy,
    direction: request && request.filter && request.filter.direction || direction,
    page: request && request.filter && request.filter.page || page || 1, 
    size: request && request.filter && request.filter.size || size || 10,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1,
  }),
  stateReloading: (prevState: OwnState) => () => ({
    page: 1,
  }),
  stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
    orderBy: field.id,
    page: 1,
  }),
  stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
    direction,
    page: 1,
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
  }),
};

const handlerCreators: HandleCreators<RegisterListProps, OwnHandlers> = {
  handleGoToDetail: (props: RegisterListProps) => (projectUid) => {
    const { history } = props;
    const { isLoading } = props.projectRegisterState.all;

    if (!isLoading) {
      history.push(`/project/details/${projectUid}`);
    } 
  },
  handleGoToNext: (props: RegisterListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: RegisterListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: RegisterListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: RegisterListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: RegisterListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: RegisterListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<RegisterListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.projectRegisterState.all;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.title'}),
      subTitle : intl.formatMessage({id: 'project.subTitle'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/project/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(ProjectField)
      .map(key => ({ id: key, name: ProjectField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: RegisterListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadAllDispose } = this.props.projectRegisterDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
    if (view && view.parentUid !== AppMenu.ProjectRegistration) {
      loadAllDispose();
    }
  }
};

const loadData = (props: RegisterListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.projectRegisterDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      filter: {
        direction,
        orderBy,
        page,
        size,
        customerUids: undefined,
        projectTypes: undefined,
        statusTypes: undefined,
        find: undefined,
        findBy: undefined,
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const RegistrationList = compose<RegisterListProps, OwnOptions>(
  withProjectRegistration,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<RegisterListProps, OwnHandlers>(handlerCreators),
  lifecycle<RegisterListProps, OwnState>(lifecycles),
)(ProjectRegistrationListView);