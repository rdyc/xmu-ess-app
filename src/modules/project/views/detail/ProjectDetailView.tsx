import { IAppState, IResponseSingle } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppUser, IView } from '@layout/interfaces';
import { WithStyles, Paper, withStyles } from '@material-ui/core';
import { IProject } from '@project/interfaces/response';
import { ProjectRegistrationFetchRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { IProjectRegistrationRequest } from '@project/interfaces/queries';
import { layoutChangeView, layoutNavBackShow } from '@layout/store/actions';

interface PropsFromState extends RouteComponentProps<void>, WithStyles<typeof styles> {
  user: IAppUser;
  navBack: boolean;
  request: IProjectRegistrationRequest;
  response: IResponseSingle<IProject>;
  isLoading: boolean;
  isError: boolean;
  errors: string;
}

interface PropsFromDispatch {
  setCurrentPage: typeof layoutChangeView;
  setNavBack: typeof layoutNavBackShow;
  fetchRequest: typeof ProjectRegistrationFetchRequest;
}

interface RouteParams {
  projectUid: string;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams> & ConnectedReduxProps;
  
class ProjectDetailView extends React.Component<AllProps> {
  componentWillUnmount() {
    this.props.setCurrentPage(null);
    this.props.setNavBack();
  }

  componentDidMount() {
    const { match } = this.props;

    console.log(match);

    this.props.setCurrentPage({
      menuUid: 'MNU19',
      title: 'Project Detail',
      subTitle : 'Detail project registration'
    });

    this.props.setNavBack();

    this.loadData();
  }

  loadData = (): void => {
    const { user, match } = this.props;
    
    this.props.fetchRequest({
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      projectUid: match.params.projectUid
    });
  }

  render () {
    const { isLoading, response } = this.props;

    return (
      <Paper square elevation={0}>
        {isLoading && <div>loading</div>}
        {!isLoading && response && <div>{response.data.maxHours}</div>}
      </Paper>
    );
  }
}

const mapStateToProps = ({ layout, projectQuery }: IAppState) => ({
  user: layout.user,
  navBack: layout.isNavBackVisible,
  request: projectQuery.request,
  response: projectQuery.response,
  isLoading: projectQuery.isLoading,
  isError: projectQuery.isError,
  errors: projectQuery.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentPage: (page: IView | null) => dispatch(layoutChangeView(page)),
  setNavBack: () => dispatch(layoutNavBackShow()),
  fetchRequest: (request: IProjectRegistrationRequest) => dispatch(ProjectRegistrationFetchRequest(request)),
});

const redux = connect(mapStateToProps, mapDispatchToProps)(ProjectDetailView);

export default withStyles(styles)<{}>(redux);