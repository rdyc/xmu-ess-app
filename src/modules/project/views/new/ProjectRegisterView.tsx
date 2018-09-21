import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, IView } from '@layout/interfaces';
import { layoutChangeView } from '@layout/store/actions';
import { Button, Paper, WithStyles, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
  setCurrentPage: typeof layoutChangeView;
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class ProjectRegisterView extends React.Component<AllProps> {
  componentWillUnmount() {
    this.props.setCurrentPage(null);
  }

  componentDidMount() {
    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Project Registration',
      subTitle : 'Creating a new project'
    });

    // this.loadData(undefined);
  }

  // loadData = (reqfilter: IProjectRegistrationAllFilter | undefined): void => {
  //   this.props.fetchRequest({
  //     companyUid: this.props.user.company.uid,
  //     positionUid: this.props.user.position.uid,
  //     filter: reqfilter
  //   });
  // }

  render () {
    const { classes, isLoading } = this.props;

    return (
      <Paper square elevation={0}>
        {isLoading && <div>loading</div>}
        {/* {!isLoading && response && <ProjectListComponent {...this.props} />} */}
        <Button 
          variant="fab" 
          color="primary"
          className={classes.fixedBotomRight} 
          onClick={() => this.props.history.push('/project/request')}
        >
          <AddIcon />
        </Button>
      </Paper>
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
  setCurrentPage: (page: IView | null) => dispatch(layoutChangeView(page)),
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectRegisterView);

export default withStyles(styles)<{}>(redux);