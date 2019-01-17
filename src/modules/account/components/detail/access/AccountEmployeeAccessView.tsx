import { IEmployeeAccessList } from '@account/classes/response/employeeAccess';
import { IEmployeeExperienceList } from '@account/classes/response/employeeExperience';
import { AccountEmployeeAccessHeaderTable as AccountEmployeeAccessHeaderTable, AccountEmployeeUserAction } from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import {
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell, 
  TableHead,
  TableRow,
  Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeAccessProps } from './AccountEmployeeAccess';

const config: SingleConfig<IEmployeeExperienceList, AccountEmployeeAccessProps> = {
  // page info
  page: (props: AccountEmployeeAccessProps) => ({
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
  moreOptions: (props: AccountEmployeeAccessProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
      onClick: () => props.history.push(`/account/employee/${props.match.params.employeeUid}/multiaccess/form`)
    },
  ]),

  // events
  onDataLoad: (props: AccountEmployeeAccessProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeAccessState.list;
    const { loadListRequest } = props.accountEmployeeAccessDispatch;

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
  onUpdated: (states: AccountEmployeeAccessProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeAccessState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeAccessView: React.SFC<AccountEmployeeAccessProps> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeAccessState.list;

  const header = Object.keys(AccountEmployeeAccessHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeAccessHeaderTable[key]
  }));

  const renderMultiAccess = (data: IEmployeeAccessList[]) => {
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.company && item.company.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.unit && item.unit.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.department && item.department.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.level && item.level.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.role && item.role.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.position && item.position.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.start && intl.formatDate(item.start, GlobalFormat.Date) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.end && intl.formatDate(item.end, GlobalFormat.Date) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        id={`access-item-button-${index}`}
                        color="inherit"
                        aria-label="More"
                        onClick={() => props.handleMenuOpen(item, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                    <Menu
                      anchorEl={document.getElementById(`access-item-button-${props.siteItemIndex}`)} 
                      open={props.isOpenMenu}
                      onClose={props.handleMenuClose}
                    >
                      <MenuItem onClick={() => props.history.push(`/account/employee/${props.match.params.employeeUid}/multiaccess/form`, { accessUid: item.uid })}>
                        {props.intl.formatMessage(accountMessage.access.dialog.modifyTitle)}
                      </MenuItem>
                  </Menu>
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
        tab={6}
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
            { !isLoading && response && response.data && response.data.length >= 1 && renderMultiAccess(response.data)}
          </div>
        </SinglePage>
      </DetailPage>
    </React.Fragment>
  );
};
