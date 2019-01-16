import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import { ModuleDefinition } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';

import { LookupSystemDialogView } from './LookupSystemDialogView';

interface OwnOption { 
  category: CommonCategoryType;
  companyUid?: string;
  moduleType?: ModuleDefinition;
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
  & WithLayout
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<LookupSystemDialogProps, OwnOption> = {
  componentDidMount() {
    const { category, companyUid, moduleType, commonDispatch } = this.props;
    const { isLoading, request } = this.props.categoryState();
    
    // don't load while control has set as disabled
    if (!this.props.disabled) {
      const _request: ISystemListRequest = {
        category,
        filter: {
          companyUid,
          moduleType,
          orderBy: 'value',
          direction: 'ascending'
        }
      };

      // skipp fetch while current request state is being loaded or equals
      if (!isLoading && request !== _request) {
        switch (_request.category) {
          case 'activity':
            commonDispatch.activityListRequest(_request);
            break;
    
          case 'currency':
            commonDispatch.currencyListRequest(_request);
            break;
    
          case 'document':
            commonDispatch.documentListRequest(_request);
            break;
    
          case 'documentPreSales':
            commonDispatch.documentPresalesListRequest(_request);
            break;
    
          case 'project':
            commonDispatch.projectListRequest(_request);
            break;
            
          case 'site':
            commonDispatch.siteListRequest(_request);
            break;
            
          case 'expense':
            commonDispatch.expenseListRequest(_request);
            break;

          case 'leave':
            commonDispatch.leaveListRequest(_request);
            break;

          case 'status':
            commonDispatch.statusListRequest(_request);
            break;

          case 'destination':
            commonDispatch.destinationListRequest(_request);
            break;
          
          case 'purpose':
            commonDispatch.purposeListRequest(_request);
            break;
          
          case 'transportation':
            commonDispatch.transportationListRequest(_request);
            break;

          case 'limiter':
            commonDispatch.limiterListRequest(_request);
            break;
            
          case 'unit':
            commonDispatch.unitListRequest(_request);
            break;

          case 'grade':
            commonDispatch.gradeListRequest(_request);
            break;

          case 'payment':
            commonDispatch.paymentListRequest(_request);
            break;

          case 'finance':
            commonDispatch.financeListRequest(_request);
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
  withLayout,
  withStyles(styles),
  withCommonSystem,
  injectIntl,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupSystemDialogView);
