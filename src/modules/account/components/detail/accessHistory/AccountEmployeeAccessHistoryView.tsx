import { IEmployeeAccessHistoryList } from '@account/classes/response/employeeAccessHistory';
import { AccountEmployeeHistoryHeaderTable, AccountEmployeeUserAction } from '@account/classes/types';
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
import { AccountEmployeeAccessHistoryProps } from './AccountEmployeeAccessHistory';

const config: SingleConfig<IEmployeeAccessHistoryList, AccountEmployeeAccessHistoryProps> = {
  // page info
  page: (props: AccountEmployeeAccessHistoryProps) => ({
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
  moreOptions: (props: AccountEmployeeAccessHistoryProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeAccessHistoryProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeAccessHistoryState.list;
    const { loadListRequest } = props.accountEmployeeAccessHistoryDispatch;

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
  onUpdated: (states: AccountEmployeeAccessHistoryProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeAccessHistoryState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeAccessHistoryView: React.SFC<
  AccountEmployeeAccessHistoryProps
> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeAccessHistoryState.list;

  const header = Object.keys(AccountEmployeeHistoryHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeHistoryHeaderTable[key]
  }));

  const renderAccessHistory = (data: IEmployeeAccessHistoryList[]) => {
    return (
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper className={classes.table}>
          <Table className={classes.minTable}>
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
                    <TableCell>{item.company && item.company.name}</TableCell>
                    <TableCell>{item.unit ? item.unit.value : 'N/A'}</TableCell>
                    <TableCell>{item.department ? item.department.value : 'N/A'}</TableCell>
                    <TableCell>
                      {item.level ? item.level.value : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.position ? item.position.name : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {intl.formatDate(item.start, GlobalFormat.Date)}
                    </TableCell>
                    <TableCell>
                      {item.end
                        ? intl.formatDate(item.end, GlobalFormat.Date)
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
        tab={1}
      >
      <SinglePage
        config={config}
        connectedProps={props}
      >
        <div style={{ padding: 8 * 3 }}>
          {(( !isLoading && response && !response.data) ||
            ( !isLoading && response && response.data && response.data.length === 0)) && (
            <Typography variant="body2">No Data</Typography>
          )}
          { !isLoading && response && response.data && response.data.length >= 1 && renderAccessHistory(response.data)}
        </div>
      </SinglePage>  
      </DetailPage>
    </React.Fragment>
  );
};
