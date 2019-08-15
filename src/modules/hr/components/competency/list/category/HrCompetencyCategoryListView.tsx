import AppMenu from '@constants/AppMenu';
import { IHrCompetencyCategory } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Badge, Button, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Tune } from '@material-ui/icons';
import * as React from 'react';
import { HrCompetencyCategoryFilter } from './HrCompetencyCategoryFilter';
import { HrCompetencyCategoryListProps } from './HrCompetencyCategoryList';
import { HrCompetencySummaryCategory } from './HrCompetencyCategorySummary';

export const HrCompetencyCategoryListView: React.SFC<HrCompetencyCategoryListProps> = props => (
  <React.Fragment>
    <CollectionPage
        // page info
        info={{
          uid: AppMenu.LookupCompetencyCategory,
          parentUid: AppMenu.Lookup,
          title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'Competency Category'}),
          description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
        }}
  
        // state & fields
        state={props.hrCompetencyCategoryState.all}
        fields={props.fields}
  
        // callback
        onLoadApi={props.handleOnLoadApi}
        onBind={props.handleOnBind}
        
        // row components
        summaryComponent={(item: IHrCompetencyCategory) => ( 
          <HrCompetencySummaryCategory data={item}/>
        )}
        actionComponent={(item: IHrCompetencyCategory) => (
          <React.Fragment>
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/lookup/competencycategory/form`, { uid: item.uid, clusterUid: item.clusterUid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
  
            <Button 
              size="small"
              // disabled
              color="secondary"
              onClick={() => props.history.push(`/lookup/competencycategory/${item.uid}`, {clusterUid: item.clusterUid})}
            >
              {props.intl.formatMessage(layoutMessage.action.details)}
            </Button>
          </React.Fragment>
        )}
        // app bar component
        appBarSearchComponent={
          <SearchBox
            key="lookup.competency.category"
            default={props.hrCompetencyCategoryState.all.request && props.hrCompetencyCategoryState.all.request.filter && props.hrCompetencyCategoryState.all.request.filter.find}
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
                disabled={props.hrCompetencyCategoryState.all.isLoading || props.hrCompetencyCategoryState.all.isError}
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
        // appBarCustomComponent={
        //   <IconButton
        //     color="inherit"
        //     onClick={() => props.history.push('/lookup/competencycategory/form')}
        //   >
        //     <AddCircle/>
        //   </IconButton>
        // }
      />

    <HrCompetencyCategoryFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        clusterUid: props.clusterUid
      }}
      onApply={props.handleFilterApplied}
      onClose={props.handleFilterVisibility}
    />
  </React.Fragment>
);