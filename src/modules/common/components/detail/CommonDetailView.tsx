import { ISystemDetail } from '@common/classes/response';
import { CommonUserAction } from '@common/classes/types';
import { categoryTypeTranslator } from '@common/helper';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';
import { CommonDetailProps } from './CommonDetail';
import { CommonInformation } from './shared/CommonInformation';

const config: SingleConfig<ISystemDetail, CommonDetailProps> = {
  // page info
  page: (props: CommonDetailProps) => ({
    uid: AppMenu.Common,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(commonMessage.system.page.detailTitle),
    description : props.intl.formatMessage(commonMessage.system.page.detailSubTitle)
  }),
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: CommonDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: CommonUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: CommonUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: CommonDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.commonSystemState.detail;
    const { systemDetailRequest } = props.commonDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.category && props.match.params.typeId) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.id !== props.match.params.typeId) || !response || forceReload) {
        systemDetailRequest({
          category: categoryTypeTranslator(props.match.params.category),
          id: props.match.params.typeId
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: CommonDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.commonSystemState.detail;
    
    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: ISystemDetail) => (
    <CommonInformation data={data} />
  ),
  
  // secondary (multiple components are allowed)
  secondaryComponents: (data: ISystemDetail, props: CommonDetailProps) => ([
  ]),
};

export const CommonDetailView: React.SFC<CommonDetailProps> = props => (
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