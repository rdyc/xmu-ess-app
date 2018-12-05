import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField, MileageUserAction } from '@mileage/classes/types';
import { MileageSummary } from '@mileage/components/request/shared/MileageSummary';
import { mileageRequestFieldTranslator } from '@mileage/helper';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { MileageRequestListProps } from './MileageRequestList';

const config: CollectionConfig<IMileageRequest, MileageRequestListProps> = {
  // page info
  page: (props: MileageRequestListProps) => ({
    uid: AppMenu.MileageRequest,
    parentUid: AppMenu.Mileage,
    title: props.intl.formatMessage(mileageMessage.request.page.listTitle),
    description: props.intl.formatMessage(mileageMessage.request.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(MileageRequestField).map(key => ({
    value: key,
    name: MileageRequestField[key]
  })),
  fieldTranslator: mileageRequestFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: MileageRequestListProps): boolean => {
    let result: boolean = false;

    const { request } = props.mileageRequestState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: MileageRequestListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: MileageUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: MileageUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: props.handleOnCreate
    }
  ]),

  // events
  onDataLoad: (props: MileageRequestListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.mileageRequestState.all;
    const { loadAllRequest } = props.mileageRequestDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            direction: params.direction,
            orderBy: params.orderBy,
            page: params.page,
            size: params.size,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            find: params.find,
            findBy: params.findBy,
            isRejected : undefined,
            month: undefined,
            year: undefined,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: MileageRequestListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.mileageRequestState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IMileageRequest, index: number, props: MileageRequestListProps) => ({
    key: index,
    primary: item.uid,
    secondary: props.intl.formatDate(new Date(item.year, item.month - 1), GlobalFormat.MonthYear),
    tertiary: item.employee && item.employee.fullName || item.employeeUid,
    quaternary: `${props.intl.formatMessage(layoutMessage.text.idr)} ${props.intl.formatNumber(item.amount)}`,
    quinary: item.status && item.status.value || item.statusType,
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IMileageRequest) => ( 
    <MileageSummary data={item} />
  ),

  // action component
  actionComponent: (item: IMileageRequest, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/mileage/requests/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

export const MileageRequestListView: React.SFC<MileageRequestListProps> = props => (
  <CollectionPage
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
  </CollectionPage>
);