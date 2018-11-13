import { Layout } from '@layout/components/base';
import { CollectionCallback, CollectionConfig, CollectionPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import * as React from 'react';
import { compose } from 'recompose';

const projectFields = Object.keys(ProjectRegistrationField).map(key => ({ 
  id: key, 
  name: ProjectRegistrationField[key] 
}));

const config: CollectionConfig<IProject, AllProps> = {
  uid: '123',
  parentUid: '012',
  title: 'Collection Page',
  description: 'Demo of collection page',
  fields: projectFields,
  allowSearch: true,
  allowSelect: true,
  hasRedirection: true,
  onLoad: (states: AllProps, callback: CollectionCallback) => {
    const { user } = states.userState;
    const { isLoading, response } = states.projectRegisterState.all;
    const { loadAllRequest } = states.projectRegisterDispatch;

    if (user && !isLoading) {
      if (!response) {
        loadAllRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      } else {
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AllProps, callback: CollectionCallback) => {
    const { isLoading, response } = states.projectRegisterState.all;
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IProject, index: number) => ({
    key: index,
    primary: item.uid,
    secondary: item.name
  }),
  onRedirect: (item: IProject): string => {
    return `/playground/pages/demo/collection/${item.uid}`;
  }
};

type AllProps 
  = WithUser
  & WithProjectRegistration;

const demoCollectionPage: React.SFC<AllProps> = props => (
  <Layout>
    <CollectionPage
      config={config}
      innerProps={props}
    />
  </Layout>
);

export const DemoCollectionPage = compose(
  withUser,
  withProjectRegistration
)(demoCollectionPage);