import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IProjectAssignment } from '@project/classes/response';
import { ProjectAssignmentField, ProjectUserAction } from '@project/classes/types';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { ProjectAssignmentSummary } from '../detail/shared/ProjectAssignmentSummary';

const config: CollectionConfig<IProjectAssignment, AllProps> = {
  // page
  page: (props: AllProps) => ({
    uid: AppMenu.ProjectAssignmentRequest,
    parentUid: AppMenu.ProjectAssignment,
    title: props.intl.formatMessage(projectMessage.assignment.page.listTitle),
    description : props.intl.formatMessage(projectMessage.assignment.page.listSubHeader)
  }),

  // top bar
  fields: Object.keys(ProjectAssignmentField).map(key => ({ 
    value: key, 
    name: ProjectAssignmentField[key] 
  })),
  fieldTranslator: projectRegistrationFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.projectAssignmentState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
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
    },
    {
      id: ProjectUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/project/assignments/form`)
    }
  ]),
  
  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.projectAssignmentState.all;
    const { loadAllRequest } = states.projectAssignmentDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            customerUids: undefined,
            projectTypes: undefined,
            statusTypes: undefined,
            projectUid: undefined,
            find: params.find,
            findBy: params.findBy,
            orderBy: params.orderBy,
            direction: params.direction,
            page: params.page,
            size: params.size,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.projectAssignmentState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProjectAssignment, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IProjectAssignment) => ( 
    <ProjectAssignmentSummary data={item} />
  ),

  // action component
  actionComponent: (item: IProjectAssignment, callback: CollectionHandler) => (
    <React.Fragment>
      {
        isRequestEditable(item.statusType) &&
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/project/assignments/form`, { 
            companyUid: item.customer && item.customer.companyUid, 
            assignmentUid: item.uid 
          })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/project/assignments/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type AllProps
  = WithUser
  & WithProjectAssignment
  & InjectedIntlProps;
  
const listView: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ProjectAssignmentList = compose(
  withUser,
  withProjectAssignment,
  injectIntl
)(listView);