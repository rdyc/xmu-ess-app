import { IEmployeeTrainingList } from '@account/classes/response/employeeTraining';
import { AccountEmployeeTrainingHeaderTable, AccountEmployeeUserAction } from '@account/classes/types';
import AccountEmployeeTrainingEditor from '@account/components/editor/AccountEmployeeTrainingEditor';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Fade, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeTrainingProps } from './AccountEmployeeTraining';

const config: SingleConfig<IEmployeeTrainingList, AccountEmployeeTrainingProps> = {
  // page info
  page: (props: AccountEmployeeTrainingProps) => ({
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
  moreOptions: (props: AccountEmployeeTrainingProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
      onClick: () => props.handleNew()
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeTrainingProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeTrainingState.list;
    const { loadListRequest } = props.accountEmployeeTrainingDispatch;

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
  onUpdated: (states: AccountEmployeeTrainingProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeTrainingState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeTrainingView: React.SFC<
  AccountEmployeeTrainingProps
> = props => {
  const { intl, isOpenDialog, isOpenMenu, trainingItemIndex, editAction, initialValues } = props;
  const { handleDialogClose, handleEdit, handleMenuClose, handleMenuOpen } = props;
  const { response, isLoading } = props.accountEmployeeTrainingState.list;

  const header = Object.keys(AccountEmployeeTrainingHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeTrainingHeaderTable[key]
  }));

  const renderTraining = (data: IEmployeeTrainingList[]) => {
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {intl.formatDate(item.start, GlobalFormat.Date)}
                    </TableCell>
                    <TableCell>
                      {item.end
                        ? intl.formatDate(item.end, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{item.organizer}</TableCell>
                    <TableCell>
                      {item.training && item.training.value}
                    </TableCell>
                    <TableCell>
                      {item.certification && item.certification.value}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        id={`training-item-button-${index}`}
                        color="inherit"
                        aria-label="More"
                        onClick={() => handleMenuOpen(item, index)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <Menu
                  anchorEl={document.getElementById(`training-item-button-${trainingItemIndex}`)}
                  open={isOpenMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEdit('update')}>
                    {props.intl.formatMessage(accountMessage.training.option.modify)}
                  </MenuItem>
                  <MenuItem onClick={() => handleEdit('delete')}>
                    {props.intl.formatMessage(accountMessage.training.option.remove)}
                  </MenuItem> 
                </Menu>
            </TableBody>
          </Table>
        </Paper>
      </Fade>
    );
  };

  return (
    <React.Fragment>
      <DetailPage
        tab={5}
      >
        <SinglePage
          config={config}
          connectedProps={props}
        >
          {(( !isLoading && response && !response.data) ||
            ( !isLoading && response && response.data && response.data.length === 0)) && (
            <Typography variant="body2">No Data</Typography>
          )}
          { !isLoading && response && response.data && response.data.length >= 1 && renderTraining(response.data)}
        </SinglePage>
      </DetailPage>

      <AccountEmployeeTrainingEditor
        formMode={props.formMode}
        trainingUid={props.trainingUid}
        employeeUid={props.match.params.employeeUid}
        isOpenDialog={isOpenDialog}
        editAction={editAction}
        initialValues={initialValues}
        handleDialogClose={handleDialogClose}
      />
    </React.Fragment>
  );
};
