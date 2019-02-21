import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { IHierarchy } from '@organization/classes/response/hierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OrganizationHierarchySummary } from '../detail/shared/OrganizationHierarchySummary';
import { OrganizationHierarchyListProps } from './OrganizationHierarchyList';
import { OrganizationHierarchyListFilter } from './OrganizationHierarchyListFilter';

export const OrganizationHierarchyListView: React.SFC<OrganizationHierarchyListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupApprovalHierarchy,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(organizationMessage.hierarchy.page.listTitle),
        description: props.intl.formatMessage(organizationMessage.hierarchy.page.listSubHeader),
      }}

      // state & fields
      state={props.organizationHierarchyState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IHierarchy) => ( 
        <OrganizationHierarchySummary data={item} />
      )}
      actionComponent={(item: IHierarchy) => (
        <React.Fragment>
          {
            <Button 
              size="small"
              onClick={() => props.history.push(`/organization/hierarchy/form`, { companyUid: item.companyUid, hierarchyUid: item.uid })}
            >
              <FormattedMessage {...layoutMessage.action.modify}/>
            </Button>
          }

          <Button 
            size="small"
            onClick={() => props.history.push(`/organization/hierarchy/${item.uid}`, { companyUid: item.companyUid })}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="organization.hierarchy"
          default={props.organizationHierarchyState.all.request && props.organizationHierarchyState.all.request.filter && props.organizationHierarchyState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/organization/hierarchy/form')}
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
              disabled={props.organizationHierarchyState.all.isLoading || props.organizationHierarchyState.all.isError}
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

    <OrganizationHierarchyListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);