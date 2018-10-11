import AppMenu from '@constants/AppMenu';
import { IBaseChanges } from '@generic/interfaces';
import withLayout, { WithLayout } from '@layout/hoc/withLayout';
import withNavBottom, { WithNavBottom } from '@layout/hoc/withNavBottom';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import { ProjectField } from '@project/classes/types';
import withApiProjectRegistrationAll, { WithApiProjectRegistrationAllHandler } from '@project/enhancers/registration/withApiProjectRegistrationAll';
import withProjectRegistrationAll, { WithProjectRegistrationAll } from '@project/enhancers/registration/withProjectRegistrationAll';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps 
  = WithProjectRegistrationAll
  & WithLayout
  & WithNavBottom
  & WithApiProjectRegistrationAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const registrationList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.projectAllState;

  const handleClick = (projectUid: string) => {
    if (!isLoading) {
      history.push(`/project/details/${projectUid}`);
    } 
  };

  const parseChanges = (changes: IBaseChanges | null) => {
    let result = 'Unknown';
    
    if (!changes) {
      return result;
    }

    if (changes.updatedBy !== null) {
      result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
    } else {
      result = changes.created ? changes.created.fullName : changes.createdBy;
    }

    return result;
  };

  const renderProjectList = (projects: IProject[]) => {
    const len = projects.length - 1;

    return (
      projects.map((project, i) => 
        <div key={project.uid}>
          <ListItem 
            button={!isLoading} 
            key={project.uid} 
            onClick={() => handleClick(project.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {project.name}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {project.customer && project.customer.name} &bull; {project.customer && project.customer.company && project.customer.company.name} {project.contractNumber && `(PO: ${project.contractNumber})`}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {project.uid} &bull; {project.project && project.project.value} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={project.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={project.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {project.status && project.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(project.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {project.changes && moment(project.changes.updatedAt ? project.changes.updatedAt : project.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          {len !== i && <Divider />}
        </div>
      )
    );
  };
  
  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata && 
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural one="project" other="projects" value={response.metadata.total} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          }
        </ListSubheader>
      }
    >
      {
        response &&
        isArray(response.data) && 
        renderProjectList(response.data)
      }
    </List>
  );

  return (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() { 
    const { 
      handleNext, handlePrev, handleSync, 
      handleOrder, handleSize, handleSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.title'}),
      subTitle : intl.formatMessage({id: 'project.subTitle'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleNext,
      onPrevCallback: handlePrev,
      onSyncCallback: handleSync,
      onOrderCallback: handleOrder,
      onDirectionCallback: handleSort,
      onAddCallback: () => history.push('/project/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(ProjectField)
      .map(key => ({ id: key, name: ProjectField[key] }));

    navBottomDispatch.assignFields(items);
  },

  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('ProjectRegistrationList'),
  withApiProjectRegistrationAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withProjectRegistrationAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(registrationList);