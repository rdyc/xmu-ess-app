import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import { IStructure } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as React from 'react';
import { StructureSummary } from '../shared/StructureSummary';
import { StructureListProps } from './StructureList';
import { StructureListFilter } from './StructureListFilter';

export const StructureListView: React.SFC<StructureListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.LookupOrganizationStructure,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(organizationMessage.structure.page.listTitle),
        // description: this.props.intl.formatMessage(organizationMessage.structure.page.listSubHeader),
        description: '',
      }}

      // state & fields
      state={props.organizationStructureState.all}
      fields={props.fields}

      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}

      // row components
      summaryComponent={(item: IStructure) => (
        <StructureSummary data={item} />
      )}
      actionComponent={(item: IStructure) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => props.history.push(`/organization/structure/form`, { structureUid: item.uid, companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button
            size="small"
            onClick={() => props.history.push(`/organization/structure/${item.uid}`, { companyUid: item.companyUid })}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>

      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.organization.structure"
          default={props.organizationStructureState.all.request && props.organizationStructureState.all.request.filter && props.organizationStructureState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/organization/structure/form')}
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
              disabled={props.organizationStructureState.all.isLoading || props.organizationStructureState.all.isError}
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

    <StructureListFilter
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid,
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);