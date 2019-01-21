import { IEmployeeEducationList } from '@account/classes/response/employeeEducation';
import { AccountEmployeeEducationHeaderTable, AccountEmployeeUserAction } from '@account/classes/types';
import AccountEmployeeEducationEditor from '@account/components/editor/AccountEmployeeEducationEditor';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
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
  Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as React from 'react';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeEducationProps } from './AccountEmployeeEducation';

const config: SingleConfig<IEmployeeEducationList, AccountEmployeeEducationProps> = {
  // page info
  page: (props: AccountEmployeeEducationProps) => ({
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
  moreOptions: (props: AccountEmployeeEducationProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
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
  onDataLoad: (props: AccountEmployeeEducationProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeEducationState.list;
    const { loadListRequest } = props.accountEmployeeEducationDispatch;

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
  onUpdated: (states: AccountEmployeeEducationProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeEducationState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeEducationView: React.SFC<
  AccountEmployeeEducationProps
> = props => {
  const { isOpenDialog, isOpenMenu, educationItemIndex, editAction, initialValues } = props;
  const { handleDialogClose, handleEdit, handleMenuClose, handleMenuOpen } = props;

  const { response, isLoading } = props.accountEmployeeEducationState.list;

  const header = Object.keys(AccountEmployeeEducationHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeEducationHeaderTable[key]
  }));

  const renderEducation = (data: IEmployeeEducationList[]) => {
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
                    <TableCell>
                      {item.degree ? item.degree.value : 'N/A'}
                    </TableCell>
                    <TableCell>{item.institution}</TableCell>
                    <TableCell>{item.major}</TableCell>
                    <TableCell>{item.start}</TableCell>
                    <TableCell>{item.end ? item.end : 'N/A'}</TableCell>
                    <TableCell>
                      <IconButton
                        id={`education-item-button-${index}`}
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
                  anchorEl={document.getElementById(`education-item-button-${educationItemIndex}`)}
                  open={isOpenMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEdit('update')}>
                    {props.intl.formatMessage(accountMessage.education.option.modify)}
                  </MenuItem>
                  <MenuItem onClick={() => handleEdit('delete')}>
                    {props.intl.formatMessage(accountMessage.education.option.remove)}
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
        tab={2}
      >
        <SinglePage
          config={config}
          connectedProps={props}
        >
          {(( !isLoading && response && !response.data) ||
            ( !isLoading && response && response.data && response.data.length === 0)) && (
            <Typography variant="body2">No Data</Typography>
          )}
          { !isLoading && response && response.data && response.data.length >= 1 && renderEducation(response.data)}
        </SinglePage>
      </DetailPage>
      
      <AccountEmployeeEducationEditor
        formMode={props.formMode}
        educationUid={props.educationUid}
        employeeUid={props.match.params.employeeUid}
        isOpenDialog={isOpenDialog}
        editAction={editAction}
        initialValues={initialValues}
        handleDialogClose={handleDialogClose}
      />
    </React.Fragment>
  );
};
