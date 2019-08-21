import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { INotifTemplate } from '@hr.notification/classes/response';
import { NotifTemplateSumarry } from '@hr.notification/components/template/shared/NotifTemplateSummary';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NotifTemplateListProps } from './NotifTemplateList';

export const NotifTemplateListView: React.SFC<NotifTemplateListProps> = props => (
  <React.Fragment>
    <CollectionPage
      // page info
      info={{
        uid: AppMenu.HRNotifTemplate,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(notifMessage.template.page.listTitle),
        description: props.intl.formatMessage(notifMessage.template.page.listSubHeader)
      }}

      // state & fields
      state={props.notifTemplateState.all}
      fields={props.fields}
      
      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: INotifTemplate) => ( 
        <NotifTemplateSumarry data={item} />
      )}
      actionComponent={(item: INotifTemplate) => (
        <React.Fragment>
          {
            <Button 
              size="small"
              color="secondary"
              onClick={() => props.history.push(`/hr/notification/templates/form`, { uid: item.uid })}
            >
              {props.intl.formatMessage(layoutMessage.action.modify)}
            </Button>
          }

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/notification/templates/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}

      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="hr.template.request"
          default={props.notifTemplateState.all.request && props.notifTemplateState.all.request.filter && props.notifTemplateState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/hr/notification/templates/form')}
        >
          <AddCircle/>
        </IconButton>
      }

      // data toolbar component
      // toolbarDataComponent={
      //   <Tooltip
      //     placement="bottom"
      //     title={props.intl.formatMessage(layoutMessage.tooltip.filter)}
      //   >
      //     <div>
      //       <IconButton
      //         id="option-filter"
      //         disabled={props.notifTemplateState.all.isLoading || props.notifTemplateState.all.isError}
      //         onClick={props.handleFilterVisibility} 
      //       >
      //         <Badge
      //           invisible={!props.handleFilterBadge()}
      //           badgeContent={
      //             <CheckCircle color="secondary" fontSize="small" />
      //           }
      //         >
      //           <Tune/>
      //         </Badge>
      //       </IconButton>
      //     </div>
      //   </Tooltip>
      // }
    />

    {/* <NotifTemplateListFilter 
      isOpen={props.isFilterOpen}
      initialProps={{
        companyUid: props.companyUid
      }}
      onClose={props.handleFilterVisibility}
      onApply={props.handleFilterApplied}
    /> */}
  </React.Fragment>
);