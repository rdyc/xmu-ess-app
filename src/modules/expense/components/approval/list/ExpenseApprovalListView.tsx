import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseSummary } from '@expense/components/request/detail/shared/ExpenseSummary';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ExpenseApprovalListProps } from './ExpenseApprovalList';
import { ExpenseApprovalListFilter } from './ExpenseApprovalListFilter';

export const ExpenseApprovalListView: React.SFC<ExpenseApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ExpenseApproval,
        parentUid: AppMenu.Expense,
        title: props.intl.formatMessage(expenseMessage.approval.page.title),
        description: props.intl.formatMessage(expenseMessage.approval.page.subTitle),
      }}

      // state & fields
      state={props.expenseApprovalState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IExpense) => ( 
        <ExpenseSummary data={item} />
      )}
      actionComponent={(item: IExpense) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/expense/approvals/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="expense.approval"
          default={props.expenseApprovalState.all.request && props.expenseApprovalState.all.request.filter && props.expenseApprovalState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
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
              disabled={props.expenseApprovalState.all.isLoading || props.expenseApprovalState.all.isError}
              onClick={props.handleFilterVisibility} 
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="primary" fontSize="small" />
                }
              >
                <Tune/>
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <ExpenseApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        // projectUid: props.projectUid,
        expenseType: props.expenseType,
        statusType: props.statusType,
        start: props.start,
        end: props.end,
        status: props.status,
        isNotify: props.isNotify
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);