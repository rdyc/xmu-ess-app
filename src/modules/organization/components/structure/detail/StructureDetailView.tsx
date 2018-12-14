import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IStructureDetail } from '@organization/classes/response/structure';
import { StructureUserAction } from '@organization/classes/types';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { isNullOrUndefined } from 'util';
import { StructureInformation } from '../shared/StructureInformation';
import { StructureItemInformation } from '../shared/StructureItemInformation';
import { OrganizationStructureDetailProps } from './StructureDetail';

const config: SingleConfig<IStructureDetail, OrganizationStructureDetailProps> = {
  // page info
  page: (props: OrganizationStructureDetailProps) => ({
    uid: AppMenu.LookupOrganizationStructure,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(organizationMessage.structure.page.detailTitle),
    description: props.intl.formatMessage(organizationMessage.structure.page.detailSubHeader)
  }),

  parentUrl: () => `/organization/structure`,

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: OrganizationStructureDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: StructureUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: StructureUserAction.Modify,
      name: props.intl.formatMessage(layoutMessage.action.modify),
      enabled: true,
      visible: true,
      onClick: props.handleOnModify
    }
  ]),

  // events
  onDataLoad: (props: OrganizationStructureDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.organizationStructureState.detail;
    const { loadDetailRequest } = props.organizationStructureDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.structureUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.structureUid !== props.match.params.structureUid) && !isNullOrUndefined(props.history.location.state) || !response || forceReload) {
        loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          structureUid: props.match.params.structureUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: OrganizationStructureDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = props.organizationStructureState.detail;

    callback.handleLoading(isLoading);

    // when got a response from api
    if (response && response.data) {
      callback.handleResponse(response);
    }
  },

  // primary
  primaryComponent: (data: IStructureDetail) => (
    <StructureInformation
      data={data}
    />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IStructureDetail) => ([
    <div>
      {
        data.reportTo &&
        <StructureItemInformation
          data={data.reportTo && data.reportTo}
        />
      }
    </div>
  ]),
};

export const StructureDetailView: React.SFC<OrganizationStructureDetailProps> = props => (
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