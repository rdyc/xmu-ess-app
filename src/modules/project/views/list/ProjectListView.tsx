import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setCurrentPage, setSearchMode, setListMode } from '@layout/store/actionCreators';
import { Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ProjectListComponent } from '@project/components/projectListComponent';
import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';
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
  request: IProjectRegistrationAllRequest;
  response: IResponseCollection<IProject>;
  isLoading: boolean;
  isError: boolean;
  errors: string;
}

interface PropsFromDispatch {
  setCurrentPage: typeof setCurrentPage;
  setSearchMode: typeof setSearchMode;
  setListMode: typeof setListMode;
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class ProjectListView extends React.Component<AllProps> {
  componentWillUnmount() {
    this.props.setCurrentPage(null);
    this.props.setListMode(false);
    this.props.setSearchMode(false);
  }

  componentDidMount() {
    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Projects',
      subTitle : 'All project registrations requested by you'
    });

    this.props.setListMode(true);

    this.loadData(undefined);
  }

  loadData = (reqfilter: IProjectRegistrationAllFilter | undefined): void => {
    this.props.fetchRequest({
      companyUid: this.props.user.company.uid,
      positionUid: this.props.user.position.uid,
      filter: reqfilter
    });
  }

  render () {
    const { isLoading, response } = this.props;

    return (
      <Paper square elevation={1}>
        {isLoading && 
          <Typography variant="body2">loading</Typography>
        }
        {!isLoading && response && 
          <ProjectListComponent {...this.props} />
        }
        {/* {!searchMode &&
          <Slide 
            mountOnEnter 
            unmountOnExit
            direction="up" 
            in={!searchMode} 
          >
            <Button 
              variant="fab" 
              color="secondary"
              aria-label="New Project"
              className={classes.fixedBotomRight} 
              onClick={() => this.props.history.push('/project/register')}
            >
              <EditIcon />
            </Button>
          </Slide>
        } */}
      </Paper>
    );
  }
}

const mapStateToProps = ({ layout, projectQuery }: IAppState) => ({
  user: layout.user,
  searchMode: layout.searchMode,
  ListMode: layout.listMode,
  request: projectQuery.request,
  response: projectQuery.response,
  isLoading: projectQuery.isLoading,
  isError: projectQuery.isError,
  errors: projectQuery.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentPage: (page: ICurrentPage | null) => dispatch(setCurrentPage(page)),
  setSearchMode: (enabled: boolean) => dispatch(setSearchMode(enabled)),
  setListMode: (enabled: boolean) => dispatch(setListMode(enabled)),
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectListView);

export default withStyles(styles)<{}>(redux);