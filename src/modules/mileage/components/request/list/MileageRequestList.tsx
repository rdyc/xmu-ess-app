import AppMenu from '@constants/AppMenu';
import { CollectionDataProps, CollectionHandler, IListConfig, ListPage } from '@layout/components/pages';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Button } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { isRequestEditable } from '@organization/helper/isRequestEditable';
import { IProject } from '@project/classes/response';
import { ProjectRegistrationField } from '@project/classes/types';
import { ProjectRegistrationSumarry } from '@project/components/registration/detail/shared/ProjectRegistrationSummary';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IProjectRegistrationListFilterResult, ProjectRegistrationListFilter } from './ProjectRegistrationListFilter';
import { IMileageRequest } from '@mileage/classes/response';
import { WithMileageRequest } from '@mileage/hoc/withMileageRequest';
import { MileageRequestListFilter, IMileageRequestListFilterResult } from './MileageRequestListFilter';

interface OwnOption {
  
}

interface OwnState extends IMileageRequestListFilterResult {
  shouldUpdate: boolean;
  config?: IListConfig<IMileageRequest>;
  isFilterOpen: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setConfig: StateHandler<OwnState>;
  setShouldUpdate: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

interface OwnHandler {
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: any) => void;
}

type AllProps
  = OwnState
  & OwnOption
  & OwnHandler
  & OwnStateUpdater
  & WithUser
  & WithMileageRequest
  & InjectedIntlProps
  & RouteComponentProps;

const listView: React.SFC<AllProps> = props => (
  <React.Fragment>
    {
      props.config &&
      <ListPage
        config={props.config}
        source={props.mileageRequestState.all}
        loadDataWhen={props.shouldUpdate}
      >
        <MileageRequestListFilter 
          isOpen={props.isFilterOpen}
          initialProps={{
            month: props.month,
            year: props.year,
            statusType: props.statusType,
            isRejected: props.isRejected
          }}
          onClose={props.handleFilterVisibility}
          onApply={props.handleFilterApplied}
        />
      </ListPage>
    }
  </React.Fragment>
);

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  shouldUpdate: false,
  isFilterOpen: false,

  // fill partial props from location state to handle redirection from dashboard notif
  isRejected: props.location.state && props.location.state.isRejected,
});

const stateUpdaters: StateUpdaters<AllProps, OwnState, OwnStateUpdater> = {
  setShouldUpdate: (prevSta)
}