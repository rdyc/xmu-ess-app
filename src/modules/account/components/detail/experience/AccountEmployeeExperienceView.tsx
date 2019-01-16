import { IEmployeeExperienceList } from '@account/classes/response/employeeExperience';
import {
  AccountEmployeeExperienceHeaderTable, AccountEmployeeUserAction
} from '@account/classes/types';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
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
import { AccountEmployeeExperienceProps } from './AccountEmployeeExperience';

const config: SingleConfig<IEmployeeExperienceList, AccountEmployeeExperienceProps> = {
  // page info
  page: (props: AccountEmployeeExperienceProps) => ({
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
  moreOptions: (props: AccountEmployeeExperienceProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeExperienceProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeExperienceState.list;
    const { loadListRequest } = props.accountEmployeeExperienceDispatch;

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
  onUpdated: (states: AccountEmployeeExperienceProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeExperienceState.list;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },
};

export const AccountEmployeeExperienceView: React.SFC<
  AccountEmployeeExperienceProps
> = props => {
  const { classes } = props;
  const { response, isLoading } = props.accountEmployeeExperienceState.list;

  const header = Object.keys(AccountEmployeeExperienceHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeExperienceHeaderTable[key]
  }));

  const renderExperience = (data: IEmployeeExperienceList[]) => {
    return (
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper className={classes.table}>
          <Table className={classes.minTable}>
            <TableHead>
              <TableRow>
                {header.map(headerIdx =>
                    <TableCell key={headerIdx.id}>{headerIdx.name}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.start}</TableCell>
                    <TableCell>{item.end}</TableCell>
                    <TableCell>{item.position}</TableCell>
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
        tab={4}
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
          { !isLoading && response && response.data && response.data.length >= 1 && renderExperience(response.data)}
        </div>
      </SinglePage>
      </DetailPage>
    </React.Fragment>
  );
};
