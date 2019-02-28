import { ISystem } from '@common/classes/response';
import { CommonCategory } from '@common/classes/types';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CommonSummary } from '../detail/shared/CommonSummary';
import { CommonListProps } from './CommonList';
import { CommonListFilter } from './CommonListFilter';

export const CommonListView: React.SFC<CommonListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.Common,
        parentUid: AppMenu.Lookup,
        parentUrl: '/common/system',
        title: `${props.intl.formatMessage(commonMessage.system.page.title)} ${CommonCategory[props.match.params.category]}`,
        description: props.intl.formatMessage(commonMessage.system.page.subTitle),
      }}

      // state & fields
      state={props.commonSystemState.all}
      fields={props.fields}
      
      // selection
      // disableSelection={props.handleDisableSelection}
      // onSelection={props.handleSelection}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ISystem) => ( 
        <CommonSummary 
          data={item}
          category={props.match.params.category}
        />
      )}
      actionComponent={(item: ISystem) => (
        <React.Fragment>
          <Button 
            size="small"
            onClick={() => props.history.push(`/common/system/${props.match.params.category}/form`, { id: item.id })}
          >
            <FormattedMessage {...layoutMessage.action.modify}/>
          </Button>

          <Button 
            size="small"
            onClick={() => props.history.push(`/common/system/${props.match.params.category}/${item.id}`)}
          >
            <FormattedMessage {...layoutMessage.action.details}/>
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key={`common.system.${props.match.params.category}`}
          default={props.commonSystemState.all.request && props.commonSystemState.all.request.filter && props.commonSystemState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push(`/common/system/${props.match.params.category}/form`)}
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
              disabled={props.commonSystemState.all.isLoading || props.commonSystemState.all.isError}
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

    <CommonListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    />
  </React.Fragment>
);