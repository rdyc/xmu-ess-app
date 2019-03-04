import AppMenu from '@constants/AppMenu';
import { IFinance } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FinanceSummary } from '../detail/shared/FinanceSummary';
import { FinanceApprovalListProps } from './FinanceApprovalList';
import { FinanceApprovalListFilter } from './FinanceApprovalListFilter';

export const FinanceApprovalListView: React.SFC<FinanceApprovalListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.FinanceApproval,
        parentUid: AppMenu.Finance,
        title: props.intl.formatMessage(financeMessage.approval.page.title),
        description: props.intl.formatMessage(financeMessage.approval.page.subTitle)
      }}

      // state & fields
      state={props.financeApprovalState.all}
      fields={props.fields}
      
      // selection
      disableSelection={props.handleDisableSelection}
      onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IFinance) => ( 
        <FinanceSummary data={item} />
      )}
      actionComponent={(item: IFinance) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/finance/approvals/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="finance.request"
          default={props.financeApprovalState.all.request && props.financeApprovalState.all.request.filter && props.financeApprovalState.all.request.filter.find}
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
              disabled={props.financeApprovalState.all.isLoading || props.financeApprovalState.all.isError}
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

    <FinanceApprovalListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        moduleType: props.moduleType,
        financeStatusTypes: props.financeStatusTypes,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);