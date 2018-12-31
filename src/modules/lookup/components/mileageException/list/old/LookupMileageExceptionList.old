import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { LookupMileageExceptionListView } from './LookupMileageExceptionListView';

interface OwnHandlers {
  handleChangeFilter: (companyUid: string, roleUid: string | undefined) => void;
}

interface OwnState {
  companyUid: string | undefined;
  roleUid: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupMileageExceptionListProps 
  = WithUser
  & WithLookupMileageException
  & InjectedIntlProps
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters;

const createProps: mapper<LookupMileageExceptionListProps, OwnState> = (): OwnState => ({
  companyUid: undefined,
  roleUid: undefined
});

const handlerCreators: HandleCreators<LookupMileageExceptionListProps, OwnHandlers> = {
  handleChangeFilter: (props: LookupMileageExceptionListProps) => (companyUid: string, roleUid: string | undefined) => {
    props.stateUpdate({
      companyUid,
      roleUid
    });
  }
};

const stateUpdaters: StateUpdaters<LookupMileageExceptionListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),  
};

export default compose<LookupMileageExceptionListProps, {}>(
  withUser,
  withLookupMileageException,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupMileageExceptionListProps, OwnHandlers>(handlerCreators),
)(LookupMileageExceptionListView);