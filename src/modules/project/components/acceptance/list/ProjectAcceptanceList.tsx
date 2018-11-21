import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu, IAppUser } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IProjectAssignmentDetail, IProjectAssignmentDetailItem } from '@project/classes/response';
import { ProjectAssignmentField, ProjectUserAction } from '@project/classes/types';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { ProjectAcceptanceSummary } from '../detail/ProjectAcceptanceSummary';

const parseAcceptance = (items: IProjectAssignmentDetailItem[] | null, user: IAppUser | undefined): string => {
  if (user && items) {
    // find any items with submitted status for current user uid
    const pending = items.filter(item =>
      item.employeeUid === user.uid &&
      item.statusType === WorkflowStatusType.Submitted
    );

    return pending.length > 0 ? `Pending` : 'Complete';
  } 
    
  return '';
};

const config: CollectionConfig<IProjectAssignmentDetail, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.ProjectAssignmentAcceptance,
    parentUid: AppMenu.ProjectAssignment,
    title: props.intl.formatMessage(projectMessage.acceptance.page.listTitle),
    description : props.intl.formatMessage(projectMessage.acceptance.page.listSubHeader)
  }),

  // top bar
  fields: Object.keys(ProjectAssignmentField).map(key => ({ 
    value: key, 
    name: ProjectAssignmentField[key] 
  })),
  fieldTranslator: projectRegistrationFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: AllProps): boolean => {
    let result: boolean = false;

    const { request } = props.projectAcceptanceState.all;

    if (request && request.filter && request.filter.query && request.filter.query.find) {
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

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (props: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.projectAcceptanceState.all;
    const { loadAllRequest } = props.projectAcceptanceDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            // status: 'pending',
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
    const { isLoading, response } = props.projectAcceptanceState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProjectAssignmentDetail, index: number, props: AllProps) => ({
    key: index,
    primary: item.name,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.uid,
    quinary: parseAcceptance(item.items, props.userState.user),
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IProjectAssignmentDetail) => ( 
    <ProjectAcceptanceSummary data={item} />
  ),

  // action component
  actionComponent: (item: IProjectAssignmentDetail, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/project/acceptances/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps
  = WithUser
  & WithProjectAcceptance
  & InjectedIntlProps;
  
const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ProjectAcceptanceList = compose(
  withUser,
  withProjectAcceptance,
  injectIntl
)(listView);