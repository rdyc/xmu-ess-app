import { IEmployeeFamilyList } from '@account/classes/response/employeeFamily';
import { AccountEmployeeFamilyHeaderTable, AccountEmployeeUserAction } from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import {
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import * as React from 'react';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeFamilyProps } from './AccountEmployeeFamily';

const config: SingleConfig<IEmployeeFamilyList, AccountEmployeeFamilyProps> = {
  // page info
  page: (props: AccountEmployeeFamilyProps) => ({
    uid: AppMenu.Account,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(accountMessage.employee.page.detailTitle),
    description: props.intl.formatMessage(accountMessage.employee.page.detailSubHeader),
  }),

  // parent url
  parentUrl: () => '/account/employee',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AccountEmployeeFamilyProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeFamilyProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeFamilyState.list;
    const { loadListRequest } = props.accountEmployeeFamilyDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.employeeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.employeeUid !== props.match.params.employeeUid) || !response || forceReload) {
        loadListRequest({
          employeeUid: props.match.params.employeeUid,
          filter: {
            direction: 'ascending'
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AccountEmployeeFamilyProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeFamilyState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeFamilyView: React.SFC<
  AccountEmployeeFamilyProps
> = props => {
  const { intl } = props;
  const { response, isLoading } = props.accountEmployeeFamilyState.list;

  const header = Object.keys(AccountEmployeeFamilyHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeFamilyHeaderTable[key]
  }));

  const renderFamily = (data: IEmployeeFamilyList[]) => {
    return (
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper square>
          <Table>
            <TableHead>
              <TableRow>
                {header.map(headerIdx => (
                  <TableCell
                    key={headerIdx.id}
                    numeric={headerIdx.id === 'No' ? true : false}
                    padding="default"
                  >
                    {headerIdx.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.family && item.family.value}</TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.gender && item.gender.value}</TableCell>
                    <TableCell>{item.birthPlace}</TableCell>
                    <TableCell>
                      {item.birthDate
                        ? intl.formatDate(item.birthDate, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Fade>
    );
  };

  return (
    <React.Fragment>
      <DetailPage
        tab={3}
      >
        <SinglePage
          config={config}
          connectedProps={props}
        >
          {((!isLoading && response && !response.data) ||
            (!isLoading && response && response.data && response.data.length === 0)) && (
            <Typography variant="body2">No Data</Typography>
          )}
          { !isLoading && response && response.data && response.data.length >= 1 && renderFamily(response.data)}
        </SinglePage>
      </DetailPage>
    </React.Fragment>
  );
};
