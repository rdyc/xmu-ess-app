import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { IEmployeeLevel } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupEmployeeLevelListProps } from './LookupEmployeeLevelList';
import { LookupEmployeeLevelSummary } from './LookupEmployeeLevelSummary';

export const LookupEmployeeLevelListView: React.SFC<LookupEmployeeLevelListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupEmployeeLevel,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.employeeLevel.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.employeeLevel.page.listSubHeader)
      }}

      // state & fields
      state={props.employeeLevelState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: IEmployeeLevel) => (
        <LookupEmployeeLevelSummary data={item} />
      )}
      actionComponent={(item: IEmployeeLevel) => (
        <React.Fragment>
          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/employeelevels/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            color="secondary"
            onClick={() => props.history.push(`/lookup/employeelevels/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.employeelevel"
          default={props.employeeLevelState.all.request && props.employeeLevelState.all.request.filter && props.employeeLevelState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          color="inherit"
          onClick={() => props.history.push('/lookup/employeelevels/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
  </React.Fragment>
);