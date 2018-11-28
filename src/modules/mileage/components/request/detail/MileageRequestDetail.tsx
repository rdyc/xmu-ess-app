import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IMileageRequestDetail } from '@mileage/classes/response';
import { MileageUserAction } from '@mileage/classes/types';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

const config: SingleConfig<IMileageRequestDetail, MileageRequestDetailProps> = {
  // page info
  page: (props: MileageRequestDetailProps) => ({
    uid: AppMenu.MileageRequest,
    parentUid: AppMenu.Mileage,
    title: props.intl.formatMessage(mileageMessage.request.page.detailTitle),
    description: props.intl.formatMessage(mileageMessage.request.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: MileageRequestDetailProps) => '/mileage/requests',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: MileageRequestDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: MileageUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: MileageRequestDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.mileageRequestState.detail;
    const { loadDetailRequest } = props.mileageRequestDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.mileageUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.mileageUid !== props.match.params.mileageUid) || !response || forceReload) {
        loadDetailRequest({
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          mileageUid: props.match.params.mileageUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: MileageRequestDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.mileageRequestState.detail;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IMileageRequestDetail, props: MileageRequestDetailProps) => (
    <MileageInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IMileageRequestDetail, props: MileageRequestDetailProps) => ([
    <MileageItem items={data.items}/>,
    <WorkflowHistory data={data.workflow} />
  ])
};

interface OwnRouteParams {
  mileageUid: string;
}

type MileageRequestDetailProps 
  = WithUser
  & WithMileageRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const mileageRequestDetail: React.SFC<MileageRequestDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const MileageRequestDetail = compose(
  withRouter,
  withUser,
  withMileageRequest,
  injectIntl,
)(mileageRequestDetail);