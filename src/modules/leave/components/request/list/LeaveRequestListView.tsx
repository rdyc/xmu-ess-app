import { ICollectionValue } from '@layout/classes/core';
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
import { ILeaveRequest } from '@leave/classes/response';
import { LeaveRequestField, LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveSummary } from '@leave/components/request/detail/shared/LeaveSummary';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { Button } from '@material-ui/core';
import { projectRegistrationFieldTranslator } from '@project/helper';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

const leaveFields: ICollectionValue[] = Object.keys(LeaveRequestField).map(key => ({ 
  value: key, 
  name: LeaveRequestField[key] 
}));

const menuOptions = (props: CollectionPageProps): IAppBarMenu[] => ([
  {
    id: LeaveRequestUserAction.Refresh,
    name: props.intl.formatMessage(layoutMessage.action.refresh),
    enabled: true,
    visible: true,
    onClick: () => props.setForceReload(true)
  },
  {
    id: LeaveRequestUserAction.Create,
    name: props.intl.formatMessage(layoutMessage.action.create),
    enabled: true,
    visible: true,
    onClick: () => console.log('asdas')
  }
]);

const config: CollectionConfig<ILeaveRequest, AllProps> = {
  // page info
  uid: '123',
  parentUid: '012',
  title: 'Collection Page',
  description: 'Demo of collection page',
  
  // top bar
  fields: leaveFields,
  fieldTranslator: projectRegistrationFieldTranslator,

  // selection
  hasSelection: false,
  selectionProcessing: (values: string[]) => {
    alert(values.toString());
  },

  // searching
  hasSearching: true,
  searchStatus: (states: AllProps): boolean => {
    let result: boolean = false;

    const { request } = states.leaveRequestState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: menuOptions,
  
  // redirection
  hasRedirection: true,
  onRedirect: (item: ILeaveRequest): string => {
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
    const { isLoading, response } = states.leaveRequestState.all;
    const { loadAllRequest } = states.leaveRequestDispatch;

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
    const { isLoading, response } = states.leaveRequestState.all;
    
    callback.setLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ILeaveRequest, index: number) => ({
    key: index,
    primary: item.reason,
    secondary: item.leave && item.leave.value || item.leaveType,
    tertiary: item.regular && item.regular.leave && item.regular.leave.name || 'N/A',
    quaternary: item.uid,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ILeaveRequest) => ( 
    <LeaveSummary data={item} />
  ),

  // action component
  actionComponent: (item: ILeaveRequest) => (
    <Button 
      size="small"
      onClick={() => alert(`go to ${item.uid}`)}
    >
      <FormattedMessage {...layoutMessage.action.details}/>
    </Button>
  ),

  // custom row render: uncomment to see different
  // onRowRender: (item: IProject, index: number) => (
  //   <div key={index}>{item.name}</div>
  // )
};

type AllProps 
  = WithUser
  & WithLeaveRequest;

const demoCollectionPage: React.SFC<AllProps> = props => (
  <CollectionPage
    config={config}
    connectedProps={props}
  />
);

export const DemoCollectionPage = compose(
  withUser,
  withLeaveRequest
)(demoCollectionPage);