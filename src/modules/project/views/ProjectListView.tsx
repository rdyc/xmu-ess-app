import { IAppState, IResponseCollection } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser } from '@layout/interfaces';
import { WithStyles, Paper } from '@material-ui/core';
import { IProject } from '@project/interfaces/response';
import { ProjectRegistrationFetchAllRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { IProjectRegistrationAllRequest } from '@project/interfaces/queries';
import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';
import { ProjectListComponent } from '@project/components/projectListComponent';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
  request: IProjectRegistrationAllRequest;
  response: IResponseCollection<IProject>;
  isLoading: boolean;
  isError: boolean;
  errors: string;
}

interface PropsFromDispatch {
  fetchRequest: typeof ProjectRegistrationFetchAllRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;
  
class ProjectListView extends React.Component<AllProps> {
  componentDidMount() {
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
      <Paper square elevation={0}>
        {isLoading && <div>loading</div>}
        {!isLoading && response && <ProjectListComponent {...this.props} />}
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
  fetchRequest: (request: IProjectRegistrationAllRequest) => dispatch(ProjectRegistrationFetchAllRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListView);