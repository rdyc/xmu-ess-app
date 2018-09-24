import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { ILayoutState, IListBarCallback, IListBarField, IListBarState, IView } from '@layout/interfaces';
import {
  layoutChangeView,
  layoutModeListOff,
  layoutModeListOn,
  layoutModeSearchOff,
  layoutModeSearchOn,
  listBarAssignCallbacks,
  listBarAssignFields,
  listBarChangeDirection,
  listBarChangeOrder,
  listBarChangeSize,
  listBarDispose,
  layoutSearchShow,
  layoutSearchHide,
} from '@layout/store/actions';
import { Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ProjectList } from '@project/components/list';
import { IProjectGetAllRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { projectGetAllRequest } from '@project/store/actions';
import { ProjectField } from '@project/types';
import styles from '@styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
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

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class ProjectListView extends React.Component<AllProps> {
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

    listBarDispatch.dispose();
  }

  componentDidMount() {
    const { layoutDispatch, projectState, listBarDispatch } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU19',
      title: 'Projects',
      subTitle : 'All project registrations requested by you'
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();

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
          <ProjectList {...this.props}  />
        }
      </Paper>
    );
  }
}

const mapStateToProps = ({ layout, listBar, projectGetAll }: IAppState) => ({
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

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectListView);

export default withStyles(styles)<{}>(redux);