import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import { ModuleDefinitionType } from '@layout/types';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  withHandlers,
} from 'recompose';

import { LookupSystemDialogView } from './LookupSystemDialogView';

interface OwnOption { 
  category: CommonCategoryType;
  companyUid?: string;
  moduleType?: ModuleDefinitionType;
  isOpen: boolean;
  hideBackdrop?: boolean;
  disabled?: boolean;
  title: string;
  value?: string;
  onSelected: (data?: ISystemList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
}

export type LookupSystemDialogProps 
  = OwnOption 
  & OwnHandlers
  & WithCommonSystem
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<LookupSystemDialogProps, OwnOption> = {
  componentDidMount() {
    const { category, companyUid, moduleType, commonDispatch } = this.props;
    const { isLoading, request } = this.props.categoryState();
    
    // don't load while control has set as disabled
    if (!this.props.disabled) {
      const params: ISystemListRequest = {
        category,
        filter: {
          companyUid,
          moduleType,
          orderBy: 'value',
          direction: 'ascending'
        }
      };

      // compare each props
      const shouldLoad = !shallowEqual(
        {
          category,
          companyUid,
          moduleType
        },
        {
          category: request && request.category,
          companyUid: request && request.filter && request.filter.companyUid,
          moduleType: request && request.filter && request.filter.moduleType
        }
      );

      // skipp fetch while current request state is being loaded or equals
      if (shouldLoad && !isLoading) {
        switch (params.category) {
          case 'activity':
            commonDispatch.activityListRequest(params);
            break;
    
          case 'currency':
            commonDispatch.currencyListRequest(params);
            break;
    
          case 'document':
            commonDispatch.documentListRequest(params);
            break;
    
          case 'documentPreSales':
            commonDispatch.documentPresalesListRequest(params);
            break;
    
          case 'project':
            commonDispatch.projectListRequest(params);
            break;
            
          case 'site':
            commonDispatch.siteListRequest(params);
            break;
            
          case 'expense':
            commonDispatch.expenseListRequest(params);
            break;

          case 'leave':
            commonDispatch.leaveListRequest(params);
            break;

          case 'status':
            commonDispatch.statusListRequest(params);
            break;

          case 'destination':
            commonDispatch.destinationListRequest(params);
            break;
          
          case 'purpose':
            commonDispatch.purposeListRequest(params);
            break;
          
          case 'transportation':
            commonDispatch.transportationListRequest(params);
            break;

          case 'limiter':
            commonDispatch.limiterListRequest(params);
            break;
            
          case 'unit':
            commonDispatch.unitListRequest(params);
            break;

          case 'grade':
            commonDispatch.gradeListRequest(params);
            break;

          case 'payment':
            commonDispatch.paymentListRequest(params);
            break;

          case 'finance':
            commonDispatch.financeListRequest(params);
            break;

          default:
            break;
        }
      }
    }
  }
};

const handlerCreators: HandleCreators<LookupSystemDialogProps, OwnHandlers> = {
  categoryState: (props: LookupSystemDialogProps) => () => { 
    return fnGetContext(props);
  }
};

const fnGetContext = (props: LookupSystemDialogProps) => {
  const { category } = props;

  switch (category) {
    case 'activity': return props.commonActivityListState;
    case 'currency': return props.commonCurrencyListState;
    case 'document': return props.commonDocumentListState;
    case 'documentPreSales': return props.commonDocumentPresalesListState;
    case 'project': return props.commonProjectListState;
    case 'site': return props.commonSiteListState;
    case 'expense': return props.commonExpenseListState;
    case 'leave': return props.commonLeaveListState;
    case 'status': return props.commonStatusListState;
    case 'destination': return props.commonDestinationListState;
    case 'purpose': return props.commonPurposeListState;
    case 'transportation': return props.commonTransportationListState;
    case 'limiter': return props.commonLimiterListState;
    case 'unit': return props.commonUnitListState;
    case 'grade': return props.commonGradeListState;
    case 'payment': return props.commonPaymentListState;
    case 'finance': return props.commonFinanceListState;
  
    default: return props.commonActivityListState;
  }
};

export const LookupSystemDialog = compose<LookupSystemDialogProps, OwnOption>(
  setDisplayName('LookupSystemDialog'),
  withCommonSystem,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupSystemDialogView);
