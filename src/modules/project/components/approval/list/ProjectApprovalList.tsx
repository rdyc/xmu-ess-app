import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField, ProjectUserAction } from '@project/classes/types';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IProject, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.ProjectRegistrationApproval,
    parentUid: AppMenu.ProjectRegistration,
    title: props.intl.formatMessage(projectMessage.approval.page.listTitle),
    description: props.intl.formatMessage(projectMessage.approval.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(ProjectRegistrationField)
    .map(key => ({ 
      value: key, 
      name: ProjectRegistrationField[key] 
    })),
  fieldTranslator: projectRegistrationFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.projectApprovalState.all;

    if (request && request.filter && request.filter.query) {
      result = request.filter.query.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AllProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: ProjectUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.projectApprovalState.all;
    const { loadAllRequest } = props.projectApprovalDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            isNotify: undefined,
            status: 'pending',
            query: {
              find: params.find,
              findBy: params.findBy,
              orderBy: params.orderBy,
              direction: params.direction,
              page: params.page,
              size: params.size,
            }
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.projectApprovalState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProject, index: number, props: AllProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.name,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.project && item.project.value || item.projectType,
    quinary: item.valueIdr && props.intl.formatNumber(item.valueIdr, GlobalFormat.CurrencyDefault) || '-',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IProject) => ( 
    <ProjectRegistrationSumarry data={item} />
  ),

  // action component
  actionComponent: (item: IProject, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/project/approvals/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps 
  = WithUser
  & WithProjectApproval
  & InjectedIntlProps;

const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ProjectApprovalList = compose(
  withUser,
  withProjectApproval,
  injectIntl
)(listView);