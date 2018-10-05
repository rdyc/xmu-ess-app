import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { ILayoutState, IListBarCallback, IListBarField, IListBarState, IView } from '@layout/interfaces';
import {
  layoutActionCentreHide,
  layoutActionCentreShow,
  layoutChangeView,
  layoutModeListOff,
  layoutModeListOn,
  layoutModeSearchOff,
  layoutModeSearchOn,
  layoutMoreHide,
  layoutMoreShow,
  layoutSearchHide,
  layoutSearchShow,
  listBarAssignCallbacks,
  listBarAssignFields,
  listBarChangeDirection,
  listBarChangeOrder,
  listBarChangeSize,
  listBarDispose,
} from '@layout/store/actions';
import { Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { IProjectGetAllRequest } from '@project/classes/queries';
import { IProject } from '@project/classes/response';
import { ProjectField } from '@project/classes/types';
import { ProjectListComponent } from '@project/components/project';
import { projectGetAllRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  listBarState: IListBarState;
  projectState: IQueryCollectionState<IProjectGetAllRequest, IProject>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    modeSearchOn: typeof layoutModeSearchOn;
    modeSearchOff: typeof layoutModeSearchOff;
    modeListOn: typeof layoutModeListOn;
    modeListOff: typeof layoutModeListOff;
    searchShow: typeof layoutSearchShow;
    searchHide: typeof layoutSearchHide;
    actionCentreShow: typeof layoutActionCentreShow;
    actionCentreHide: typeof layoutActionCentreHide;
    moreShow: typeof layoutMoreShow;
    moreHide: typeof layoutMoreHide;
  };
  
  listBarDispatch: {
    assignCallbacks: typeof listBarAssignCallbacks,
    assignFields: typeof listBarAssignFields;
    changeOrder: typeof listBarChangeOrder;
    changeDirection: typeof listBarChangeDirection;
    changeSize: typeof listBarChangeSize;
    dispose: typeof listBarDispose;
  };  

  projectDispatch: {
    getAllRequest: typeof projectGetAllRequest;
  };
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

class ProjectList extends React.Component<AllProps> {
  state = {
    orderBy: this.props.listBarState.orderBy || '',
    direction: this.props.listBarState.direction || 'descending',
    page: this.props.listBarState.page || 1,
    size: this.props.listBarState.size || 10
  };

  componentWillUnmount() {
    const { layoutDispatch, listBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    listBarDispatch.dispose();
  }

  componentDidMount() {
    const { layoutDispatch, projectState, listBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU19',
      title: intl.formatMessage({id: 'project.title'}),
      subTitle : intl.formatMessage({id: 'project.subTitle'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    listBarDispatch.assignCallbacks({
      onNextCallback: this.handleOnNextCallback,
      onPrevCallback: this.handleOnPrevCallback,
      onSyncCallback: this.handleOnSyncCallback,
      onOrderCallback: this.handleOnOrderCallback,
      onDirectionCallback: this.handleOnSortCallback,
      onAddCallback: this.handleOnPrevCallback,
      onSizeCallback: this.handleOnSizeCallback,
    });

    const items = Object.keys(ProjectField).map(key => ({ id: key, name: ProjectField[key] }));

    listBarDispatch.assignFields(items);

    if (projectState.response === undefined) {
      this.loadData();
    }
  }

  enumToArray = (enumme: any) => {
    return Object.keys(enumme).map(key => ({ id: enumme[key], name: key }));
  }

  handleOnNextCallback = () => this.setPaging(true);

  handleOnPrevCallback = () => this.setPaging(false);

  handleOnSyncCallback = () => {
    this.state.page = 1;

    this.loadData();
  }

  handleOnOrderCallback = (field: IListBarField) => {
    this.state.page = 1;
    this.state.orderBy = field.id;

    this.loadData();
  }

  handleOnSortCallback = (direction: SortDirection) => {
    this.state.page = 1;
    this.state.direction = direction;

    this.loadData();
  }

  handleOnSizeCallback = (size: number) => {
    this.state.page = 1;
    this.state.size = size;

    this.loadData();
  }

  setPaging = (isNext: boolean) => {
    const { response } = this.props.projectState;

    if (response && response.metadata) {
      if (isNext) {
        this.state.page = response.metadata.paginate.current + 1;          
      } else {
        this.state.page = response.metadata.paginate.current - 1;
      }
      
      this.loadData();
    }
  }

  loadData = () => {
    const { layoutState, projectDispatch } = this.props;

    if (layoutState.user) {
      projectDispatch.getAllRequest({
        companyUid: layoutState.user.company.uid,
        positionUid: layoutState.user.position.uid,
        filter: {
          customerUids: undefined,
          projectTypes: undefined,
          statusTypes: undefined,
          find: undefined,
          findBy: undefined,
          direction: this.state.direction,
          orderBy: this.state.orderBy,
          page: this.state.page,
          size: this.state.size,
        }
      }); 
    }
  }

  render () {
    const { isLoading, response } = this.props.projectState;

    return (
      <Paper 
        square 
        elevation={1}
      >
        {
          isLoading && 
          !response &&
          <Typography variant="body2">loading</Typography>
        }
        {
          response && 
          <ProjectListComponent {...this.props}  />
        }
      </Paper>
    );
  }
}

export const mapStateToProps = ({ layout, listBar, projectGetAll }: IAppState) => ({
  layoutState: layout,
  listBarState: listBar,
  projectState: projectGetAll
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    modeSearchOn: () => dispatch(layoutModeSearchOn()),
    modeSearchOff: () => dispatch(layoutModeSearchOff()),
    modeListOn: () => dispatch(layoutModeListOn()),
    modeListOff: () => dispatch(layoutModeListOff()),
    searchShow: () => dispatch(layoutSearchShow()),
    searchHide: () => dispatch(layoutSearchHide()),
    actionCentreShow: () => dispatch(layoutActionCentreShow()),
    actionCentreHide: () => dispatch(layoutActionCentreHide()),
    moreShow: () => dispatch(layoutMoreShow()),
    moreHide: () => dispatch(layoutMoreHide()),
  },

  listBarDispatch: {
    assignCallbacks: (callbacks: IListBarCallback) => dispatch(listBarAssignCallbacks(callbacks)),
    assignFields: (fields: IListBarField[]) => dispatch(listBarAssignFields(fields)),
    changeOrder: (name: string) => dispatch(listBarChangeOrder(name)),
    changeSize: (size: number) => dispatch(listBarChangeSize(size)),
    changeDirection: (direction: SortDirection) => dispatch(listBarChangeDirection(direction)),
    dispose: () => dispatch(listBarDispose())
  },

  projectDispatch: {
    getAllRequest: (request: IProjectGetAllRequest) => dispatch(projectGetAllRequest(request)),
  }
});

export const ProjectListContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(ProjectList)
  )
);