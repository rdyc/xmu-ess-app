import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';

import { IEmployee } from '@account/classes/response';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AccountEmployeeFilter } from './AccountEmployeeFilter';
import { AccountEmployeeListProps } from './AccountEmployeeList';
import { AccountEmployeeSummary } from './AccountEmployeeSummary';

export const AccountEmployeeListView: React.SFC<AccountEmployeeListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupEmployee,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(accountMessage.shared.page.listTitle, { state: 'Employee'}),
        description: props.intl.formatMessage(accountMessage.shared.page.listSubHeader),

      }}

      // state & fields
      state={props.accountEmployeeState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IEmployee) => ( 
        <AccountEmployeeSummary data={item} />
      )}
      actionComponent={(item: IEmployee) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/account/employee/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/account/employee/${item.uid}`, {employeeName: item.fullName})}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="account.employee"
          default={props.accountEmployeeState.all.request && props.accountEmployeeState.all.request.filter && props.accountEmployeeState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/account/employee/form')}
        >
          <AddCircle/>
        </IconButton>
      }

      // data toolbar component
      toolbarDataComponent={
        <Tooltip
          placement="bottom"
          title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
        >
          <div>
            <IconButton
              id="option-filter"
              disabled={props.accountEmployeeState.all.isLoading || props.accountEmployeeState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <AccountEmployeeFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUids: props.companyUids,
        roleUids: props.roleUids
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
</React.Fragment>
);