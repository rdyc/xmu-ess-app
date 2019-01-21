import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayDetail } from '@lookup/classes/response';
import { LookupUserAction } from '@lookup/classes/types';
import { Delete } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import * as React from 'react';
import { LookupHolidayDetailProps } from './LookupHolidayDetail';
import { LookupHolidayInformation } from './shared/LookupHolidayInformation';

const config: SingleConfig<ILookupHolidayDetail, LookupHolidayDetailProps> = {
  // page info
  page: (props: LookupHolidayDetailProps) => ({
    uid: AppMenu.LookupHoliday,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.holiday.page.detailTitle),
    description: props.intl.formatMessage(lookupMessage.holiday.page.detailSubHeader),
  }),
  
  // parent url
  parentUrl: (props: LookupHolidayDetailProps) => '/lookup/holidays',

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupHolidayDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: LookupUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: LookupUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Modify)
    },
    {
      id: LookupUserAction.Delete,
      name: props.intl.formatMessage(layoutMessage.action.delete),
      enabled: true,
      visible: true,
      onClick: () => props.handleOnOpenDialog(LookupUserAction.Delete)
    }
  ]),

  // events
  onDataLoad: (props: LookupHolidayDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.lookupHolidayState.detail;
    const { loadDetailRequest } = props.lookupHolidayDispatch;

    // when user is set and not loading and has holidayUid in route params
    if (user && !isLoading && props.history.location.state && props.match.params.holidayUid) {
      // when holidayUid was changed or response are empty or force to reload
      if ((request && request.holidayUid !== props.match.params.holidayUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          holidayUid: props.match.params.holidayUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: LookupHolidayDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.lookupHolidayState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: ILookupHolidayDetail) => (
    <LookupHolidayInformation data={data} />
  ),

  secondaryComponents: (data: ILookupHolidayDetail, props: LookupHolidayDetailProps) => ([
    //
  ])
};

export const LookupHolidayDetailView: React.SFC<LookupHolidayDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  >
    <React.Fragment>
      <Delete 
        action={props.action}
        isOpenDialog={props.dialogOpen}
        title={props.dialogTitle}
        content={props.dialogContent}
        labelCancel={props.dialogCancelLabel}
        labelConfirm={props.dialogConfirmLabel}
        handleDialogOpen={props.handleOnOpenDialog}
        handleDialogClose={props.handleOnCloseDialog}
        handleDialogConfirmed={props.handleOnConfirm}
        onSubmit={props.handleSubmit} 
        onSubmitSuccess={props.handleSubmitSuccess}
        onSubmitFail={props.handleSubmitFail}
      />
    </React.Fragment>
  </SinglePage>
);