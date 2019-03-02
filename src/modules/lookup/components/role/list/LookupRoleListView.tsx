import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { IRole } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { LookupRoleSumarry } from '../detail/shared/LookupRoleSummary';
import { LookupRoleListProps } from './LookupRoleList';
import { LookupRoleListFilter } from './LookupRoleListFilter';

export const LookupRoleListView: React.SFC<LookupRoleListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupRole,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.role.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.role.page.listSubHeader)
      }}

      // state & fields
      state={props.lookupRoleState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: IRole) => (
        <LookupRoleSumarry data={item} />
      )}
      actionComponent={(item: IRole) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => props.history.push(`/lookup/roles/form`, { uid: item.uid, companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>
          <Button
            size="small"
            onClick={() => props.history.push(`/lookup/roles/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.role"
          default={props.lookupRoleState.all.request && props.lookupRoleState.all.request.filter && props.lookupRoleState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/roles/form')}
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
              disabled={props.lookupRoleState.all.isLoading || props.lookupRoleState.all.isError}
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
    <LookupRoleListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);