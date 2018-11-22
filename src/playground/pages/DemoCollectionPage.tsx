import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { Button } from '@material-ui/core';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField, ProjectUserAction } from '@project/classes/types';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const config: CollectionConfig<IProject, AllProps> = {
  // page info
  page: (props: AllProps) => ({
    uid: '123',
    parentUid: '012',
    title: 'Collection Page',
    description: 'Demo of collection page',
  }),
  
  // top bar
  fields: Object.keys(ProjectRegistrationField).map(key => ({ 
    value: key, 
    name: ProjectRegistrationField[key] 
  })),
  fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  hasSelection: true,
  onProcessSelection: (values: string[], callback: CollectionHandler) => {
    callback.handleRedirectTo('/playground/pages/demo/selected', { values });
  },

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.projectRegisterState.all;

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
      onClick: () => alert('go to new page here')
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (states: AllProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = states.userState;
    const { isLoading, response } = states.projectRegisterState.all;
    const { loadAllRequest } = states.projectRegisterDispatch;

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
  onUpdated: (states: AllProps, callback: CollectionHandler) => {
    const { isLoading, response } = states.projectRegisterState.all;
    
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
    <ProjectRegistrationSumarry data={item} />
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )

  // action component
  actionComponent: (item: IProject, callback: CollectionHandler) => (
    <Button 
      size="small"
      onClick={() => callback.handleRedirectTo(`/playground/pages/demo/single/${item.uid}`)}
    >
      <FormattedMessage {...layoutMessage.action.details}/>
    </Button>
  )
};

type AllProps 
  = WithUser
  & WithProjectRegistration
  & InjectedIntlProps;

const demoCollectionPage: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const DemoCollectionPage = compose(
  withUser,
  withProjectRegistration,
  injectIntl,
)(demoCollectionPage);