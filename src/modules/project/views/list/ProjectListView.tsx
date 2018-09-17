import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, ICurrentPage } from '@layout/interfaces';
import { setCurrentPage } from '@layout/store/actionCreators';
import { Button, Paper, Typography, WithStyles, withStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
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
  request: IProjectRegistrationAllRequest;
  response: IResponseCollection<IProject>;
  isLoading: boolean;
  isError: boolean;
  errors: string;
}

interface PropsFromDispatch {
  setCurrentPage: typeof setCurrentPage;
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class ProjectListView extends React.Component<AllProps> {
  componentWillUnmount() {
    this.props.setCurrentPage(null);
  }

  componentDidMount() {
    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Projects',
      subTitle : 'All project registrations requested by you'
    });

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
    const { classes, isLoading, response } = this.props;

    return (
      <div>
        <div>
          <Typography noWrap variant="title">
            List Of Projects
          </Typography>
          <IconButton aria-label="Refresh">
            <RefreshIcon/>
          </IconButton>
        </div>
        <Paper square elevation={1}>
          {isLoading && 
            <Typography variant="body2">loading</Typography>
          }
          {!isLoading && response && 
            <ProjectListComponent {...this.props} />
          }
          <Button 
            variant="fab" 
            color="secondary"
            aria-label="New Project"
            className={classes.fixedBotomRight} 
            onClick={() => this.props.history.push('/project/register')}
          >
            <EditIcon />
          </Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, projectQuery }: IAppState) => ({
  user: layout.user,
  request: projectQuery.request,
  response: projectQuery.response,
  isLoading: projectQuery.isLoading,
  isError: projectQuery.isError,
  errors: projectQuery.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentPage: (page: ICurrentPage | null) => dispatch(setCurrentPage(page)),
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectListView);

export default withStyles(styles)<{}>(redux);