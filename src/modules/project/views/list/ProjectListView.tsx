import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage, IListBarCallback } from '@layout/interfaces';
import { setCurrentPage, listModeOn, setListBarReload, searchModeOn, setListBarCallbacks, listModeOff, searchModeOff } from '@layout/store/actionCreators';
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
  listBarPage: number;
  listBarSize: number;
}

interface PropsFromDispatch {
  setCurrentPage: typeof setCurrentPage;
  
  searchModeOn: typeof searchModeOn;
  searchModeOff: typeof searchModeOff;

  listModeOn: typeof listModeOn;
  listModeOff: typeof listModeOff;
  
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;

  setReload: typeof setListBarReload;
  setListBarCallbacks: typeof setListBarCallbacks;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class ProjectListView extends React.Component<AllProps> {
  state = {
    page: 1,
    size: 10
  };

  componentWillUnmount() {
    this.props.setCurrentPage(null);
    this.props.listModeOff();
  }

  componentDidMount() {
    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Projects',
      subTitle : 'All project registrations requested by you'
    });

    this.props.listModeOn();

    this.props.setListBarCallbacks({
      onNextCallback: this.handleOnNextCallback,
      onPrevCallback: this.handleOnPrevCallback
    });

    if (this.props.response === undefined) {
      this.loadData();
    }
  }

  handleOnNextCallback = () => this.setPaging(true);

  handleOnPrevCallback = () => this.setPaging(false);

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
        direction: undefined,
        orderBy: undefined,
        page: this.state.page,
        size: this.state.size,
      }
    });
  }

  render () {
    const { isLoading, response } = this.props;

    return (
      <Paper square elevation={1}>
        {
          isLoading && 
          <Typography variant="body2">loading</Typography>
        }
        {
          !isLoading && 
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentPage: (page: ICurrentPage | null) => dispatch(setCurrentPage(page)),
  
  searchModeOn: () => dispatch(searchModeOn()),
  searchModeOff: () => dispatch(searchModeOff()),
  
  listModeOn: () => dispatch(listModeOn()),
  listModeOff: () => dispatch(listModeOff()),
  
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),

  setReload: (value: boolean) => dispatch(setListBarReload(value)),
  setListBarCallbacks: (callbacks: IListBarCallback) => dispatch(setListBarCallbacks(callbacks)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectListView);

export default withStyles(styles)<{}>(redux);