import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ModuleType } from '@common/classes/types';
import { FinanceUserAction } from '@finance/classes/types';
import { DocumentPath } from '@finance/classes/types/DocumentPath';
import { withFinanceApproval, WithFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { FinanceApprovalDetailView } from './FinanceApprovalDetailView';

interface OwnRouteParams {
  financeUid: string;
}

interface OwnHandler {
  handleToDocument: (moduleUid: string, documentUid: string) => void;
}

interface OwnState {
  action?: FinanceUserAction;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
}

export type FinanceApprovalDetailProps 
  = WithUser
  & WithFinanceApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<FinanceApprovalDetailProps, OwnState> = (): OwnState => ({});

const stateUpdaters: StateUpdaters<FinanceApprovalDetailProps, OwnState, OwnStateUpdaters> = {
};

const handlerCreators: HandleCreators<FinanceApprovalDetailProps, OwnHandler> = {
  handleToDocument: (props: FinanceApprovalDetailProps) => (moduleUid: string, documentUid: string) => {
    const { history } = props;
    let path: string = '';
    
    switch (moduleUid) {
      case ModuleType.Expense:
      path = DocumentPath.Expense;
      break;

      case ModuleType.Purchase:
      path = DocumentPath.Purchase;
      break;

      case ModuleType.PurchaseSettlement:
      path = DocumentPath.PurchaseSettlement;
      break;

      case ModuleType.Mileage:
      path = DocumentPath.Mileage;
      break;

      case ModuleType.Travel:
      path = DocumentPath.Travel;
      break;

      case ModuleType.TravelSettlement:
      path = DocumentPath.TravelSettlement;
      break;

      default:

    }

    history.push(`/${path}/${documentUid}`);
  }
};

export const FinanceApprovalDetail = compose(
  withRouter,
  withUser,
  withFinanceApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(FinanceApprovalDetailView);