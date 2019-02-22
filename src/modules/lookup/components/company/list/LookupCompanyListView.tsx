import AppMenu from '@constants/AppMenu';
import { CollectionPage } from '@layout/components/pages';
import { SearchBox } from '@layout/components/search';
import { layoutMessage } from '@layout/locales/messages';
import { Button, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import * as React from 'react';

import { ICompany } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { FormattedMessage } from 'react-intl';
import { LookupCompanySumarry } from '../detail/shared/LookupCompanySummary';
import { LookupCompanyListProps } from './LookupCompanyList';

export const LookupCompanyListView: React.SFC<LookupCompanyListProps> = props => (
  <React.Fragment>
    <CollectionPage 
      // page info
      info={{
        uid: AppMenu.LookupCompany,
        parentUid: AppMenu.Lookup,
        title: props.intl.formatMessage(lookupMessage.company.page.listTitle),
        description: props.intl.formatMessage(lookupMessage.company.page.listSubHeader)
      }}

      // state & fields
      state={props.lookupCompanyState.all}
      fields={props.fields}

      // callback
      onLoadApi={props.handleOnLoadApi}
      onBind={props.handleOnBind}
      
      // row components
      summaryComponent={(item: ICompany) => (
        <LookupCompanySumarry data={item} />
      )}
      actionComponent={(item: ICompany) => (
        <React.Fragment>
          <Button
            size="small"
            onClick={() => props.history.push(`/lookup/company/form`, { uid: item.uid })}
          >
            <FormattedMessage {...layoutMessage.action.modify} />
          </Button>

          <Button
            size="small"
            onClick={() => props.history.push(`/lookup/company/${item.uid}`)}
          >
            <FormattedMessage {...layoutMessage.action.details} />
          </Button>
        </React.Fragment>
      )}
      // app bar component
      appBarSearchComponent={
        <SearchBox
          key="lookup.company"
          default={props.lookupCompanyState.all.request && props.lookupCompanyState.all.request.filter && props.lookupCompanyState.all.request.filter.find}
          fields={props.fields}
          onApply={props.handleOnLoadApiSearch}
        />
      }
      appBarCustomComponent={
        <IconButton
          onClick={() => props.history.push('/lookup/company/form')}
        >
          <AddCircle/>
        </IconButton>
      }
    />
  </React.Fragment>
);