import AppMenu from '@constants/AppMenu';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField, ProjectUserAction } from '@project/classes/types';
import { ProjectSumarry } from '@project/components/registration/detail/shared/ProjectSummary';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IProject, ProjectRegisterListProps> = {
  // page
  page: (props: ProjectRegisterListProps) => ({
    uid: AppMenu.ProjectRegistrationRequest,
    parentUid: AppMenu.ProjectRegistration,
    title: props.intl.formatMessage(projectMessage.registration.page.listTitle),
    description: props.intl.formatMessage(projectMessage.registration.page.listSubHeader),
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
  searchStatus: (props: ProjectRegisterListProps): boolean => {
    let result: boolean = false;

    const { request } = props.projectRegisterState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: ProjectRegisterListProps, callback: CollectionHandler): IAppBarMenu[] => ([
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
      onClick: () => callback.handleRedirectTo(`/project/requests/form`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (props: ProjectRegisterListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.projectRegisterState.all;
    const { loadAllRequest } = props.projectRegisterDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          filter: {
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
  onUpdated: (props: ProjectRegisterListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.projectRegisterState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProject, index: number) => ({
    key: index,
    primary: item.name,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.customer && item.customer.name || item.customerUid,
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IProject) => ( 
    <ProjectSumarry data={item} />
  ),

  // action component
  actionComponent: (item: IProject, callback: CollectionHandler, ) => (
    <React.Fragment>
      {
        isRequestEditable(item.statusType) &&
        <Button 
          size="small"
          onClick={() => callback.handleRedirectTo(`/project/requests/form`, { uid: item.uid })}
        >
          <FormattedMessage {...layoutMessage.action.modify}/>
        </Button>
      }

      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/project/requests/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  )
};

type ProjectRegisterListProps 
  = WithUser
  & WithProjectRegistration
  & InjectedIntlProps;

const ProjectRegistrationListView: React.SFC<ProjectRegisterListProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const ProjectCollectionRequest = compose(
  withUser,
  withProjectRegistration,
  injectIntl
)(ProjectRegistrationListView);