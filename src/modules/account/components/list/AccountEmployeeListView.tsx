import { IEmployee } from '@account/classes/response';
import { AccountEmployeeField, AccountEmployeeUserAction } from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { DialogConfirmation } from '@layout/components/dialogs';
import { CollectionConfig, CollectionDataProps, CollectionHandler, CollectionPage } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { AccountEmployeeListProps } from './AccountEmployeeList';
import { AccountEmployeeSummary } from './AccountEmployeeSummary';

const config: CollectionConfig<IEmployee, AccountEmployeeListProps> = {
  // page info
  page: (props: AccountEmployeeListProps) => ({
    uid: AppMenu.Account,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(accountMessage.employee.page.listTitle),
    description: props.intl.formatMessage(accountMessage.employee.page.listSubHeader),
  }),
  
  // top bar
  fields: Object.keys(AccountEmployeeField).map(key => ({
    value: key,
    name: AccountEmployeeField[key]
  })),
  // fieldTranslator: ,

  // searching
  hasSearching: true,
  searchStatus: (props: AccountEmployeeListProps): boolean => {
    let result: boolean = false;

    const { request } = props.accountEmployeeState.all;

    if (request && request.filter && request.filter.find) {
      result = request.filter.find ? true : false;
    }

    return result;
  },

  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AccountEmployeeListProps, callback: CollectionHandler): IAppBarMenu[] => ([
    {
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    },
    {
      id: AccountEmployeeUserAction.Create,
      name: props.intl.formatMessage(layoutMessage.action.create),
      enabled: true,
      visible: true,
      onClick: props.handleOnCreate
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeListProps, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, response } = props.accountEmployeeState.all;
    const { loadAllRequest } = props.accountEmployeeDispatch;

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
            find: params.find,
            findBy: params.findBy,
            roleUids: undefined,
            companyUids: undefined,
            positionUids: undefined,
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (props: AccountEmployeeListProps, callback: CollectionHandler) => {
    const { isLoading, response } = props.accountEmployeeState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
  onBind: (item: IEmployee, index: number, props: AccountEmployeeListProps) => ({
    key: index,
    primary: item.uid,
    secondary: item.company ? item.company.name : 'N/A',
    tertiary: item.fullName,
    quaternary: props.intl.formatDate(item.joinDate, GlobalFormat.Date),
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
  }),

  // summary component
  summaryComponent: (item: IEmployee) => ( 
    <AccountEmployeeSummary data={item} />
  ),

  // action component
  actionComponent: (item: IEmployee, callback: CollectionHandler) => (
    <React.Fragment>
      <Button 
        size="small"
        onClick={() => callback.handleRedirectTo(`/lookup/employee/${item.uid}`)}
      >
        <FormattedMessage {...layoutMessage.action.details}/>
      </Button>
    </React.Fragment>
  ),
};

export const AccountEmployeeListView: React.SFC<AccountEmployeeListProps> = props => (
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