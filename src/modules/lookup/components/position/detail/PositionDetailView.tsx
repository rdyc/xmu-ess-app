import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IPositionDetail } from '@lookup/classes/response';
import { PositionUserAction } from '@lookup/classes/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { PositionDetailProps } from './PositionDetail';
import { PositionInformation } from './shared/PositionInformation';

const config: SingleConfig<IPositionDetail, PositionDetailProps> = {
  // page info
  page: (props: PositionDetailProps) => ({
    uid: AppMenu.LookupPosition,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.position.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.position.page.detailSubHeader)
  }),
  // action centre
  showActionCentre: true,
  // more
  hasMore: true,
  moreOptions: (props: PositionDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: PositionUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: callback.handleForceReload
    },
    {
      id: PositionUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    },
    {
      id: PositionUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.discard),
      enabled: true,
      visible: true,
      onClick: props.handleOnDelete
    }
  ]),
  onDataLoad: (props: PositionDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupPositionState.detail;
    const { loadDetailRequest } = props.lookupPositionDispatch;

    // when user is set and not loading and has purchaseUid in route params
    if (user && !isLoading && props.match.params.positionUid) {
      // when purchaseUid was changed or response are empty or force to reload
      if ((request && request.positionUid !== props.match.params.positionUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: '',
          positionUid: props.match.params.positionUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
        callback.handleStatusType('');
      }
    }
  },
  onUpdated: (states: PositionDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupPositionState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
      callback.handleStatusType('');
    }
  },

  // primary
  primaryComponent: (data: IPositionDetail, props: PositionDetailProps) => (
    <PositionInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IPositionDetail, props: PositionDetailProps) => ([
    //
  ])
};

export const PositionDetailView: React.SFC<PositionDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <DialogConfirmation
      isOpen={props.dialogOpen}
      fullScreen={props.dialogFullScreen}
      title={props.dialogTitle}
      content={props.dialogContent}
      labelCancel={props.dialogCancelLabel}
      labelConfirm={props.dialogConfirmLabel}
      onClickCancel={props.handleOnCloseDialog}
      onClickConfirm={props.handleOnConfirm}
    />
  </SinglePage>
);