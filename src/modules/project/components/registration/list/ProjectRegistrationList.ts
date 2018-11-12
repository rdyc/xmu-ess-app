import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { ProjectRegistrationField } from '@project/classes/types';
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
  handleLoadData: () => void;
  handleOnSearch: (find: string | undefined, field: IListBarField | undefined) => void;
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
  find?: string | undefined;
  findBy?: string | undefined;
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setSearch: StateHandler<OwnState>;
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type ProjectRegisterListProps 
  = WithProjectRegistration
  & WithUser
  & WithLayout
  & WithAppBar
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ProjectRegisterListProps, OwnState> = (props: ProjectRegisterListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.projectRegisterState.all;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy || 'uid',
    direction: request && request.filter && request.filter.direction || direction || 'descending',
    page: request && request.filter && request.filter.page || page || 1, 
    size: request && request.filter && request.filter.size || size || 10,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  setSearch: (prevState: OwnState) => (find: string, field: IListBarField | undefined) => ({
    find,
    findBy: field ? field.id : undefined,
    page: 1
  }),
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

const handlerCreators: HandleCreators<ProjectRegisterListProps, OwnHandlers> = {
  handleLoadData: (props: ProjectRegisterListProps) => () => {
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
          find: props.find,
          findBy: props.findBy,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  },
  handleOnSearch: (props: ProjectRegisterListProps) => (find: string, field: IListBarField | undefined) => {
    props.setSearch(find, field);
    // props.handleLoadData;
  },
  handleGoToDetail: (props: ProjectRegisterListProps) => (projectUid) => {
    const { history } = props;
    const { isLoading } = props.projectRegisterState.all;

    if (!isLoading) {
      history.push(`/project/requests/${projectUid}`);
    } 
  },
  handleGoToNext: (props: ProjectRegisterListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: ProjectRegisterListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: ProjectRegisterListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    // props.handleLoadData();
  },
  handleChangeOrder: (props: ProjectRegisterListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: ProjectRegisterListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: ProjectRegisterListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegisterListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleOnSearch, handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, appBarDispatch,
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.projectRegisterState.all;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.view.registration.title'}),
      subTitle : intl.formatMessage({id: 'project.view.registration.subHeader'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    appBarDispatch.assignSearchCallback(handleOnSearch);

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/project/requests/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(ProjectRegistrationField)
      .map(key => ({ id: key, name: ProjectRegistrationField[key] }));

    appBarDispatch.assignFields(items);
    navBottomDispatch.assignFields(items);
    
    // only load data when response are empty
    if (!isLoading && !response) {
      this.props.handleLoadData();
    }
  },
  componentDidUpdate(props: ProjectRegisterListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.find !== props.find ||
      this.props.findBy !== props.findBy ||
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      this.props.handleLoadData();
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

export const ProjectRegistrationList = compose<ProjectRegisterListProps, OwnOptions>(
  withProjectRegistration,
  withUser,
  withLayout,
  withAppBar,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<ProjectRegisterListProps, OwnHandlers>(handlerCreators),
  lifecycle<ProjectRegisterListProps, OwnState>(lifecycles),
)(ProjectRegistrationListView);