import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { IPosition } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { PositionSummary } from '../detail/shared/PositionSummary';
import { PositionListProps } from './PositionList';
import { PositionListFilter } from './PositionListFilter';

export const PositionListView: React.SFC<PositionListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupPosition,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.position.page.listTitle),
        // description: props.intl.formatMessage(lookupMessage.position.page.listTitle),
        description: '',
      }}

      // state & fields
      state={props.lookupPositionState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: IPosition) => (
        <PositionSummary data={item} />
      )}
      actionComponent={(item: IPosition) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push('/lookup/positions/form', { companyUid: item.companyUid, uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/positions/${item.companyUid}/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.position"
          default={props.lookupPositionState.all.request && props.lookupPositionState.all.request.filter && props.lookupPositionState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/positions/form')}
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
              disabled={props.lookupPositionState.all.isLoading || props.lookupPositionState.all.isError}
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

    <PositionListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);