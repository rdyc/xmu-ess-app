import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { isModuleRequestEditable } from '@organization/helper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ExpenseSummary } from '../detail/shared/ExpenseSummary';
import { ExpenseRequestListProps } from './ExpenseRequestList';
import { ExpenseRequestListFilter } from './ExpenseRequestListFilter';

export const ExpenseRequestListView: React.SFC<ExpenseRequestListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.ExpenseRequest,
        parentUid: AppMenu.Expense,
        title: props.intl.formatMessage(expenseMessage.request.page.title),
        description: props.intl.formatMessage(expenseMessage.request.page.subTitle),
      }}

      // state & fields
      state={props.expenseRequestState.all}
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
          {
            isModuleRequestEditable(item.statusType) &&
            <Button 
              size="small"
              onClick={() => props.history.push(`/expense/requests/form`, { uid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/expense/requests/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="expense.request"
          default={props.expenseRequestState.all.request && props.expenseRequestState.all.request.filter && props.expenseRequestState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/expense/requests/form')}
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
              disabled={props.expenseRequestState.all.isLoading || props.expenseRequestState.all.isError}
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

    <ExpenseRequestListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        customerUid: props.customerUid,
        // projectUid: props.projectUid,
        expenseType: props.expenseType,
        statusType: props.statusType,
        start: props.start,
        end: props.end,
        status: props.status,
        isRejected: props.isRejected
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);