import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';

import { LookupSystemDialogView } from './LookupSystemDialogView';

interface OwnOption { 
  category: CommonCategoryType;
  companyUid?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  title: string;
  value: string | undefined;
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
    const { category, companyUid, commonDispatch } = this.props;
    const { isLoading, response } = this.props.categoryState();

    // skipp fetch while current state is being loaded
    if (isLoading || response) {
      return;
    }
    
    // don't load while control has set as disabled
    if (true) {
      const request: ISystemListRequest = {
        category,
        filter: {
          companyUid,
          orderBy: 'value',
          direction: 'ascending'
        }
      };

      switch (request.category) {
        case 'activity':
          commonDispatch.activityListRequest(request);
          break;
  
        case 'currency':
          commonDispatch.currencyListRequest(request);
          break;
  
        case 'document':
          commonDispatch.documentListRequest(request);
          break;
  
        case 'documentPreSales':
          commonDispatch.documentPresalesListRequest(request);
          break;
  
        case 'project':
          commonDispatch.projectListRequest(request);
          break;
          
        case 'site':
          commonDispatch.siteListRequest(request);
          break;
          
        case 'expense':
          commonDispatch.expenseListRequest(request);
          break;

        case 'leave':
          commonDispatch.leaveListRequest(request);
          break;

        case 'status':
          commonDispatch.statusListRequest(request);
          break;

        case 'destination':
          commonDispatch.destinationListRequest(request);
          break;
        
        case 'purpose':
          commonDispatch.purposeListRequest(request);
          break;
        
        case 'transportation':
          commonDispatch.transportationListRequest(request);
          break;

        case 'limiter':
          commonDispatch.limiterListRequest(request);
          break;
          
        case 'unit':
          commonDispatch.unitListRequest(request);
          break;

        case 'grade':
          commonDispatch.gradeListRequest(request);
          break;

        default:
          break;
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
  
    default: return props.commonActivityListState;
  }
};

export const LookupSystemDialog = compose<LookupSystemDialogProps, OwnOption>(
  setDisplayName('LookupSystemDialog'),
  withLayout,
  withStyles(styles),
  withCommonSystem,
  injectIntl,
  withHandlers<LookupSystemDialogProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupSystemDialogProps, {}>(lifecycles),
)(LookupSystemDialogView);
