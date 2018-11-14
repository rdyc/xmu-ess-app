import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
  CollectionPageProps,
} from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField, ProjectUserAction } from '@project/classes/types';
import { projectRegistrationFieldTranslator } from '@project/helper';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import * as React from 'react';
import { compose } from 'recompose';

const projectFields = Object.keys(ProjectRegistrationField).map(key => ({ 
  id: key, 
  name: ProjectRegistrationField[key] 
}));

const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
  {
    id: ProjectUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => props.setForceReload()
  },
  {
    id: ProjectUserAction.Create,
    name: props.intl.formatMessage(layoutMessage.action.create),
    enabled: true,
    visible: true,
    onClick: () => console.log('asdas')
  }
]);

const config: CollectionConfig<IProject, AllProps> = {
  // page
  uid: '123',
  parentUid: '012',
  title: 'Collection Page',
  description: 'Demo of collection page',
  
  // top bar
  fields: projectFields,
  fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  hasSelection: true,
  selectionProcessing: (values: string[]) => {
    alert(values.toString());
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

  // more
  hasMore: true,
  moreOptions: menuOptions,
  
  // redirection
  hasRedirection: true,
  onRedirect: (item: IProject): string => {
    return `/playground/pages/demo/collection/${item.uid}`;
  },

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
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProject, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name
  })
};

type AllProps 
  = WithUser
  & WithProjectRegistration;

const demoCollectionPage: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const DemoCollectionPage = compose(
  withUser,
  withProjectRegistration
)(demoCollectionPage);