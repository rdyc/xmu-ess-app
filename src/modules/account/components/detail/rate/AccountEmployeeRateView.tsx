import { IEmployeeRate } from '@account/classes/response/employeeRate';
import { AccountEmployeeRateHeaderTable } from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { IBaseMetadata } from '@generic/interfaces';
import { SingleConfig, SingleHandler, SinglePage } from '@layout/components/pages';
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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SyncIcon from '@material-ui/icons/Sync';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { DetailPage } from '../DetailPage';
import { AccountEmployeeRateProps } from './AccountEmployeeRate';

const config: SingleConfig<IEmployeeRate, AccountEmployeeRateProps> = {
  // page info
  page: (props: AccountEmployeeRateProps) => ({
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
  hasMore: false,

  // events
  onDataLoad: (props: AccountEmployeeRateProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { page, size } = props;
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeRateState.all;
    const { loadAllRequest } = props.accountEmployeeRateDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.employeeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.employeeUid !== props.match.params.employeeUid) || !response || forceReload ) {
        loadAllRequest({
          employeeUid: props.match.params.employeeUid,
          filter: {
            page,
            size,
            direction: 'descending'
          }
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AccountEmployeeRateProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeRateState.all;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeRateView: React.SFC<
  AccountEmployeeRateProps
> = props => {
  const { isOpenMenu, rateItemIndex, page, size, classes } = props;
  const { handleEdit, handleMenuClose, handleMenuOpen, handleReload, handleGoToNext, handleGoToPrevious, handleChangePage, handleChangeSize } = props;

  const { response, isLoading } = props.accountEmployeeRateState.all;

  const header = Object.keys(AccountEmployeeRateHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeRateHeaderTable[key]
  }));

  const handlePage = (_page: any) => {
    return handleChangePage(_page);
  };

  const tablePaginationAction = (total: any) => (
    <div className={classes.tableReportAction}>
      <IconButton
        onClick={() => handleChangePage(1)}
        disabled={page === 1}
        aria-label="First Page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleGoToPrevious}
        disabled={page === 1}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleGoToNext}
        disabled={page >= Math.ceil(total / size)}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => handleChangePage(Math.max(0, Math.ceil(total / size)))}
        disabled={page >= Math.ceil(total / size)}
        aria-label="Last Page"
      >
        <LastPage />
      </IconButton>
    </div>
  );

  const renderRate = (data: IEmployeeRate[], metadata: IBaseMetadata) => {
    return (
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper square>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                {header.map(headerIdx => (
                  <TableCell
                    key={headerIdx.id}
                    numeric={headerIdx.id === 'No' ? true : false}
                    padding="default"
                  >
                    {headerIdx.name !== 'no' && props.intl.formatMessage(accountMessage.rate.fieldFor(headerIdx.name, 'fieldName')) || 'No'}
                  </TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index} selected={item.isActive}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.isActive && props.intl.formatMessage(accountMessage.rate.field.isActiveTrue)}</TableCell>
                    <TableCell>
                      <IconButton
                        id={`rate-item-button-${index}`}
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
                  anchorEl={document.getElementById(`rate-item-button-${rateItemIndex}`)}
                  open={isOpenMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEdit()}>
                    {props.intl.formatMessage(layoutMessage.action.modify)}
                  </MenuItem>
                </Menu>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination 
                  rowsPerPageOptions={[10, 15, 25]}
                  count={metadata.total}
                  rowsPerPage={size}
                  page={page - 1}
                  onChangePage={handlePage}
                  onChangeRowsPerPage={e => (handleChangeSize(Number(e.target.value)))}
                  ActionsComponent={() => tablePaginationAction(metadata.total)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </Fade>
    );
  };

  const renderAction = (
    <Paper square>
      <Toolbar>
        <Typography
          noWrap
          variant="body2"
          className={props.classes.flex}
        >
          {
            props.isLoading &&
            <FormattedMessage {...layoutMessage.text.loading} />
          }
        </Typography>

        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.refresh)}
        >
          <IconButton 
            id="option-sync"
            disabled={isLoading}
            onClick={handleReload}
          >
            <SyncIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Paper>
  );

  return (
    <React.Fragment>
      <DetailPage
        tab={7}
      >
        {renderAction}
        <SinglePage
          config={config}
          connectedProps={props}
        >
          {(( !isLoading && response && !response.data) ||
            ( !isLoading && response && response.data && response.data.length === 0)) && (
            <Typography variant="body2">No Data</Typography>
          )}
          { !isLoading && response && response.data && response.data.length >= 1 && renderRate(response.data, response.metadata)}
        </SinglePage>
      </DetailPage>
      
      {/* <AccountEmployeeEducationEditor
        formMode={props.formMode}
        educationUid={props.educationUid}
        employeeUid={props.match.params.employeeUid}
        isOpenDialog={isOpenDialog}
        initialValues={initialValues}
        handleDialogClose={handleDialogClose}
      /> */}
    </React.Fragment>
  );
};
