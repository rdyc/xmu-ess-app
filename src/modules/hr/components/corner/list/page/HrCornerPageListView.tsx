import AppMenu from '@constants/AppMenu';
import { IHrCornerPage } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { HrCornerPageListProps } from './HrCornerPageList';
import { HrCornerPageSummary } from './HrCornerPageSummary';

export const HrCornerPageListView: React.SFC<HrCornerPageListProps> = props => (
  <CollectionPage
      // page info
      info={{
        uid: AppMenu.HRCorner,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(hrMessage.shared.page.listTitle, { state: 'HR Corner Page'}),
        description: props.intl.formatMessage(hrMessage.shared.page.listSubHeader),
      }}

      // state & fields
      state={props.hrCornerPageState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IHrCornerPage) => ( 
        <HrCornerPageSummary data={item}/>
      )}
      actionComponent={(item: IHrCornerPage) => (
        <React.Fragment>
          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/corner/page/form`, { uid: item.uid })}
          >
            {props.intl.formatMessage(layoutMessage.action.modify)}
          </Button>

          <Button 
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/hr/corner/page/${item.uid}`)}
          >
            {props.intl.formatMessage(layoutMessage.action.details)}
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="hr.corner.page"
          default={props.hrCornerPageState.all.request && props.hrCornerPageState.all.request.filter && props.hrCornerPageState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/hr/corner/page/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
);