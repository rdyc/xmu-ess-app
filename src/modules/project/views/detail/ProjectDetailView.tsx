import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ILayoutState, IView } from '@layout/interfaces';
import { layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
import { Typography, WithStyles, withStyles } from '@material-ui/core';
import { ProjectDetail } from '@project/components/list/ProjectDetail';
import { IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProjectDetail } from '@project/interfaces/response';
import { projectGetByIdRequest, projectGetByIdDispose } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

interface PropsFromState extends RouteComponentProps<void>, InjectedIntlProps, WithStyles<typeof styles> {
  layoutState: ILayoutState;
  projectState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
  };
  projectDispatch: {
    getByIdRequest: typeof projectGetByIdRequest;
    getByIdDispose: typeof projectGetByIdDispose;
  };
}

interface RouteParams {
  projectUid: string;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams> & ConnectedReduxProps;
  
class ProjectDetailView extends React.Component<AllProps> {
  componentWillUnmount() {
    const { layoutDispatch, projectDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    projectDispatch.getByIdDispose();
  }

  componentDidMount() {
    const { layoutDispatch } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU19',
      title: 'Project Details',
      subTitle : 'Detail project registration'
    });

    layoutDispatch.navBackShow();

    this.loadData();
  }

  loadData = (): void => {
    const { layoutState, projectDispatch, match } = this.props;
    
    if (layoutState.user) {
      projectDispatch.getByIdRequest({
        companyUid: layoutState.user.company.uid,
        positionUid: layoutState.user.position.uid,
        projectUid: match.params.projectUid
      });
    }
  }

  render () {
    const { isLoading, response } = this.props.projectState;

    return (
      <div>
        {
          isLoading && 
          !response &&
          <Typography variant="body2">loading</Typography>
        }
        {
          response && 
          <ProjectDetail {...this.props}  />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ layout, projectGetById }: IAppState) => ({
  layoutState: layout,
  projectState: projectGetById
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  layoutDispatch: {
    changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
    navBackShow: () => dispatch(layoutNavBackShow()),
    navBackHide: () => dispatch(layoutNavBackHide()),
  },
  projectDispatch: {
    getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
    getByIdDispose: () => dispatch(projectGetByIdDispose()),
  },
});

const redux = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProjectDetailView));

export default withStyles(styles)<{}>(redux);