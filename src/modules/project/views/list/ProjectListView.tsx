import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps, SortDirection } from '@generic/types';
import { IAppUser, ICurrentPage, IListBarCallback, IListBarMenuItem } from '@layout/interfaces';
import {
  listBarAssignCallbacks,
  listBarAssignMenuItems,
  listBarClearCallbacks,
  listBarClearMenuItems,
  listModeOff,
  listModeOn,
  searchModeOff,
  searchModeOn,
  setCurrentPage,
  listBarOrderSet,
  listBarSizeSet,
  listBarDirectionSet,
} from '@layout/store/actionCreators';
import { Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ProjectListComponent } from '@project/components/projectListComponent';
import { IProjectRegistrationAllRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { ProjectRegistrationFetchAllRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { ProjectField } from '@project/types';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
  listMode: boolean;
  searchMode: boolean;
  request: IProjectRegistrationAllRequest | undefined;
  response: IResponseCollection<IProject> | undefined;
  isLoading: boolean;
  isError: boolean;
  errors: string;

  listBarReloading: boolean;
  listBarPage: number | undefined;
  listBarSize: number | undefined;
  listBarOrderBy: string | undefined;
  listBarDirection: SortDirection | undefined;
}

interface PropsFromDispatch {
  setCurrentPage: typeof setCurrentPage;
  
  searchModeOn: typeof searchModeOn;
  searchModeOff: typeof searchModeOff;

  listModeOn: typeof listModeOn;
  listModeOff: typeof listModeOff;
  
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;

  /* list bar */
  listBarAssignCallbacks: typeof listBarAssignCallbacks;
  listBarClearCallbacks: typeof listBarClearCallbacks;
  listBarAssignMenuItems: typeof listBarAssignMenuItems;
  listBarClearMenuItems: typeof listBarClearMenuItems;
  listBarOrderSet: typeof listBarOrderSet;
  listBarDirectionSet: typeof listBarDirectionSet;
  listBarSizeSet: typeof listBarSizeSet;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class ProjectListView extends React.Component<AllProps> {
  state = {
    orderBy: '',
    direction: '',
    page: 1,
    size: 10
  };

  componentWillUnmount() {
    this.props.setCurrentPage(null);
    this.props.listModeOff();
    this.props.searchModeOff();
    this.props.listBarClearCallbacks();
    this.props.listBarClearMenuItems();
  }

  componentDidMount() {
    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Projects',
      subTitle : 'All project registrations requested by you'
    });

    this.props.listModeOn();

    this.props.listBarAssignCallbacks({
      onNextCallback: this.handleOnNextCallback,
      onPrevCallback: this.handleOnPrevCallback,
      onSyncCallback: this.handleOnSyncCallback,
      onOrderCallback: this.handleOnOrderCallback,
      onDirectionCallback: this.handleOnSortCallback,
      onAddCallback: this.handleOnPrevCallback,
      onSizeCallback: this.handleOnSizeCallback,
    });

    const items = Object.keys(ProjectField).map(key => ({ id: key, name: ProjectField[key] }));

    this.props.listBarAssignMenuItems(items);

    if (this.props.response === undefined) {
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

  handleOnOrderCallback = (field: IListBarMenuItem) => {
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
    const { response } = this.props;

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
    this.props.fetchRequest({
      companyUid: this.props.user.company.uid,
      positionUid: this.props.user.position.uid,
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
    console.log(this.state);
  }

  render () {
    const { isLoading, response } = this.props;

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

const mapStateToProps = ({ layout, listBar, projectQuery }: IAppState) => ({
  user: layout.user,
  searchMode: layout.searchMode,
  ListMode: layout.listMode,
  request: projectQuery.request,
  response: projectQuery.response,
  isLoading: projectQuery.isLoading,
  isError: projectQuery.isError,
  errors: projectQuery.errors,

  listBarReloading: listBar.isReload,
  listBarPage: listBar.page,
  listBarOrderBy: listBar.orderBy,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentPage: (page: ICurrentPage | null) => dispatch(setCurrentPage(page)),
  
  searchModeOn: () => dispatch(searchModeOn()),
  searchModeOff: () => dispatch(searchModeOff()),
  
  listModeOn: () => dispatch(listModeOn()),
  listModeOff: () => dispatch(listModeOff()),
  
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),

  /* list bar */
  listBarAssignCallbacks: (callbacks: IListBarCallback) => dispatch(listBarAssignCallbacks(callbacks)),
  listBarClearCallbacks: () => dispatch(listBarClearCallbacks()),
  listBarAssignMenuItems: (menuItems: IListBarMenuItem[]) => dispatch(listBarAssignMenuItems(menuItems)),
  listBarClearMenuItems: () => dispatch(listBarClearMenuItems()),
  listBarOrderSet: (name: string) => dispatch(listBarOrderSet(name)),
  listBarSizeSet: (size: number) => dispatch(listBarSizeSet(size)),
  listBarDirectionSet: (direction: SortDirection) => dispatch(listBarDirectionSet(direction)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectListView);

export default withStyles(styles)<{}>(redux);