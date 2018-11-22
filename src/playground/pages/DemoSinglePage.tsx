import { ProjectType } from '@common/classes/types';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import { IProjectDetail } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectDocument } from '@project/components/registration/detail/shared/ProjectDocument';
import { ProjectInformation } from '@project/components/registration/detail/shared/ProjectInformation';
import { ProjectSales } from '@project/components/registration/detail/shared/ProjectSales';
import { ProjectSite } from '@project/components/registration/detail/shared/ProjectSite';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

const config: SingleConfig<IProjectDetail, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: '234',
    parentUid: '232',
    title: 'Single Page',
    description: 'Demo of single page',
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: ProjectUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => alert('go to modify page here')
    },
    {
      id: ProjectUserAction.ManageSites,
      name: props.intl.formatMessage(projectMessage.registration.option.site),
      enabled: true,
      visible: true,
      onClick: () => alert('go to site page here')
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.projectRegisterState.detail;
    const { loadDetailRequest } = props.projectRegisterDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.projectUid) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          projectUid: props.match.params.projectUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: SingleHandler) => {
    const { isLoading, response } = states.projectRegisterState.detail;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IProjectDetail, props: AllProps) => (
    <ProjectInformation data={data} />
  ),

  // secondary
  secondaryComponents: (data: IProjectDetail, props: AllProps) => ([
    <ProjectDocument 
      title={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectTitle : projectMessage.registration.section.documentPreSalesTitle)}
      subHeader={props.intl.formatMessage(data.projectType === ProjectType.Project ? projectMessage.registration.section.documentProjectSubHeader : projectMessage.registration.section.documentPreSalesSubHeader)}
      data={data.projectType === ProjectType.Project ? data.documents : data.documentPreSales}
    />,
    <ProjectSales data={data.sales} />,
    <ProjectSite data={data.sites} />,
    <WorkflowHistory data={data.workflow} />
  ])
};

interface OwnRouteParams {
  projectUid: string;
}

type AllProps 
  = WithUser
  & WithProjectRegistration
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const demoSinglePage: React.SFC<AllProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const DemoSinglePage = compose(
  withRouter,
  withUser,
  withProjectRegistration,
  injectIntl,
)(demoSinglePage);