import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IDiem } from '@lookup/classes/response';
import { LookupDiemField } from '@lookup/classes/types/diem/DiemField';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupDiemSummary } from '../detail/shared/LookupDiemSummary';
import { LookupDiemFilter } from './LookupDiemFilter';
import { LookupDiemListProps } from './LookupDiemList';

const config: CollectionConfig<IDiem, LookupDiemListProps> = {
  // page
  page: (props: LookupDiemListProps) => ({
    uid: AppMenu.LookupDiem,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.lookupDiem.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.lookupDiem.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(LookupDiemField)
    .map(key => ({
      value: key,
      name: LookupDiemField[key]
    })),

  // searching
  hasSearching: true,
  searchStatus: (props: LookupDiemListProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupDiemState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: LookupDiemListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: DiemUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: DiemUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/diemvalue/form`)
    }
  ]),

  // data filter
  filter: {
    orderBy: 'uid',
    direction: 'descending'
  },

  // events
  onDataLoad: (props: LookupDiemListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupDiemState.all;
    const { loadAllRequest } = props.lookupDiemDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
          filter: {
            projectType: undefined,
            destinationType: undefined,
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
  onUpdated: (props: LookupDiemListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupDiemState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IDiem, index: number, props: LookupDiemListProps) => ({
    key: index,
    primary: item.company && item.company.name || item.companyUid ,
    secondary: item.project && item.project.value || item.projectType,
    tertiary: item.destination && item.destination.value || item.destinationType,
    quaternary: props.intl.formatNumber(item.value),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // filter
  filterComponent: (callback: CollectionHandler) => (
    <LookupDiemFilter handleFind={callback.handleFilter}/>
  ),

  // summary component
  summaryComponent: (item: IDiem) => (
    <LookupDiemSummary data={item} />
  ),

  // action component
  actionComponent: (item: IDiem, callback: CollectionHandler, props: LookupDiemListProps) => (
    <React.Fragment>
      {
        <Button
          size="small"
          onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
        >
          <FormattedMessage {...layoutMessage.action.delete} />
        </Button>
      }

      {
        <Button
          size="small"
          onClick={() => callback.handleRedirectTo(`/lookup/diemvalue/form`, {uid: item.uid, company: item.companyUid })}
        >
          <FormattedMessage {...layoutMessage.action.modify} />
        </Button>
      }

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/diemvalue/${item.uid}`, { company: item.companyUid })}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  )
};

export const LookupDiemListView: React.SFC<LookupDiemListProps> = props => (
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
      onClickConfirm={props.handleSubmit}
    />
  </CollectionPage>

);
