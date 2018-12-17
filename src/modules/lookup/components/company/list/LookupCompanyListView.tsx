import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import {
  CollectionConfig,
  CollectionDataProps,
  CollectionHandler,
  CollectionPage,
} from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ICompany } from '@lookup/classes/response/company';
import { CompanyField, CompanyUserAction } from '@lookup/classes/types/company';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupCompanySumarry } from '../detail/shared/LookupCompanySummary';
import { CompanyListProps } from './LookupCompanyList';

const config: CollectionConfig<ICompany, CompanyListProps> = {
  // page info
  page: (props: CompanyListProps) => ({
    uid: AppMenu.LookupCompany,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(lookupMessage.company.page.listTitle),
    description: props.intl.formatMessage(lookupMessage.company.page.listSubHeader),
  }),

  // top bar
  fields: Object.keys(CompanyField)
    .map(key => ({
      value: key,
      name: CompanyField[key]
    })),
  // fieldTranslator: timesheetEntryFieldTranslator,

  // searching
  hasSearching: true,
  searchStatus: (props: CompanyListProps): boolean => {
    let result: boolean = false;

    const { request } = props.lookupCompanyState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: CompanyListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: CompanyUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: CompanyUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: () => callback.handleRedirectTo(`/lookup/company/form`)
    }
  ]),

  // events
  onDataLoad: (props: CompanyListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.lookupCompanyState.all;
    const { loadAllRequest } = props.lookupCompanyDispatch;

    // when user is set and not loading
    if (user && !isLoading) {
      // when response are empty or force reloading
      if (!response || forceReload) {
        loadAllRequest({
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
  onUpdated: (props: CompanyListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.lookupCompanyState.all;

    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: ICompany, index: number, props: CompanyListProps) => ({
    key: index,
    primary: item.name,
    secondary: item.code,
    tertiary: '',
    quaternary: item.uid,
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: ICompany) => (
    <LookupCompanySumarry data={item} />
  ),

  // action component
  actionComponent: (item: ICompany, callback: CollectionHandler, props: CompanyListProps) => (
    <React.Fragment>
      <Button
        size="small"
        onClick={() => props.handleOnDelete(item.uid, callback.handleForceReload)}
      >
        <FormattedMessage {...layoutMessage.action.delete} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/company/form`, { uid: item.uid })}
      >
        <FormattedMessage {...layoutMessage.action.modify} />
      </Button>

      <Button
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/company/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details} />
      </Button>
    </React.Fragment>
  ),

};

export const LookupCompanyListView: React.SFC<CompanyListProps> = props => (
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