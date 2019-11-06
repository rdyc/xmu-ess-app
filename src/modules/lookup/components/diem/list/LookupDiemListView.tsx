import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { IDiem } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { LookupDiemSummary } from '../detail/shared/LookupDiemSummary';
import { LookupDiemListProps } from './LookupDiemList';
import { LookupDiemListFilter } from './LookupDiemListFilter';

export const LookupDiemListView: React.SFC<LookupDiemListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupDiem,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.lookupDiem.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.lookupDiem.page.listSubHeader)
      }}

      // state & fields
      state={props.lookupDiemState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: IDiem) => (
        <LookupDiemSummary data={item} />
      )}
      actionComponent={(item: IDiem) => (
        <React.Fragment>
          {
            <Button
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/lookup/diemvalues/form`, { uid: item.uid, companyUid: item.companyUid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/diemvalues/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.diem"
          default={props.lookupDiemState.all.request && props.lookupDiemState.all.request.filter && props.lookupDiemState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/diemvalues/form')}
        >
          <AddCircle />
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
              disabled={props.lookupDiemState.all.isLoading || props.lookupDiemState.all.isError}
              onClick={props.handleFilterVisibility}
            >
              <Badge
                invisible={!props.handleFilterBadge()}
                badgeContent={
                  <CheckCircle color="secondary" fontSize="small" />
                }
              >
                <Tune />
              </Badge>
            </IconButton>
          </div>
        </Tooltip>
      }
    />

    <LookupDiemListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        projectType: props.projectType,
        destinationType: props.destinationType,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);