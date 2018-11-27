import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageExceptionDetail } from '@lookup/classes/response';
import { MileageExceptionUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { MileageExceptionDetailProps } from './MileageExceptionDetail';
import { MileageExceptionInformation } from './MileageExceptionInformation';

const config: SingleConfig<IMileageExceptionDetail, MileageExceptionDetailProps> = {
  // page info
  page: (props: MileageExceptionDetailProps) => ({
    uid: AppMenu.LookupMileageException,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.mileageException.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.mileageException.page.detailSubHeader),
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: MileageExceptionDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: MileageExceptionUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: MileageExceptionUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: state.statusType !== undefined,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: MileageExceptionDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.mileageExceptionState.detail;
    const { loadDetailRequest } = props.mileageExceptionDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.mileageExceptionUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.mileageExceptionUid !== props.match.params.mileageExceptionUid) || !response || forceReload) {
        loadDetailRequest({
          mileageExceptionUid: props.match.params.mileageExceptionUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: MileageExceptionDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.mileageExceptionState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: IMileageExceptionDetail) => (
    <MileageExceptionInformation data={data} />
  ),

  secondaryComponents: (data: IMileageExceptionDetail, props: MileageExceptionDetailProps) => ([
    //
  ])
};

export const MileageExceptionDetailView: React.SFC<MileageExceptionDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);