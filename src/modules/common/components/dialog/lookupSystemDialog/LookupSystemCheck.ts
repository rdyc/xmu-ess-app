import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import { ModuleDefinitionType } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LookupSystemCheckView } from './LookupSystemCheckView';

interface OwnOption { 
  category: CommonCategoryType;
  companyUid?: string;
  moduleType?: ModuleDefinitionType;
  isOpen: boolean;
  hideBackdrop?: boolean;
  disabled?: boolean;
  title: string;
  value?: SystemCheck[];
  onApply: (data?: SystemCheck[]) => void;
  onClose: () => void;
}

export interface SystemCheck { 
  item: ISystemList;
  isCheck: boolean;
}

interface OwnState {
  isLoaded: boolean;
  itemCheck: SystemCheck[];
}

interface OwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
  handleItemCheck: (index: number) => void;
  handleReset: () => void;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  stateReset: StateHandler<OwnState>;
  handleLoad: () => OwnState;
}

export type LookupSystemCheckProps 
  = OwnOption 
  & OwnState
  & OwnHandlers
  & OwnStateHandler
  & WithCommonSystem
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupSystemCheckProps, OwnState> = (props: LookupSystemCheckProps): OwnState => ({
  isLoaded: false,
  itemCheck: []
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  stateUpdate: (prevState: OwnState) => (newState: OwnState) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => (itemCheck: SystemCheck[]) => ({
    itemCheck
  }),
  handleLoad: (state: OwnState) => () => ({
    isLoaded: true
  })
};

const lifecycles: ReactLifeCycleFunctions<LookupSystemCheckProps, OwnOption> = {
  componentDidMount() {
    const { category, companyUid, moduleType, commonDispatch, stateUpdate, value } = this.props;
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
          case 'profession':
            commonDispatch.professionListRequest(params);
            break;

          case 'competency':
            commonDispatch.competencyListRequest(params);
            break;

          default:
            break;
        }
      }
    }

    if (value) {
      stateUpdate({
        itemCheck: value
      });
    }
  },
  componentDidUpdate(prevProps: LookupSystemCheckProps) {
    const { response } = this.props.categoryState();
    // const { response: prevResponse } = prevProps.categoryState();
    const { itemCheck } = this.props;

    if (response && response.data && !this.props.isLoaded) {
      if (itemCheck.length === 0) {
        response.data.map(item => {
          itemCheck.push({
            item,
            isCheck: false
          });
        });
        this.props.stateUpdate({
          itemCheck,
        });
      }
      this.props.handleLoad();
    }
    if (prevProps.value !== this.props.value) {
      if (!this.props.value) {
        const temp: SystemCheck[] = [];
        if (response && response.data) {
          response.data.map(item => {
            temp.push({
              item,
              isCheck: false
            });
          });
        }
        this.props.stateUpdate({
          itemCheck: temp
        });
      }
    }
  }
};

const handlerCreators: HandleCreators<LookupSystemCheckProps, OwnHandlers> = {
  categoryState: (props: LookupSystemCheckProps) => () => { 
    return fnGetContext(props);
  },
  handleItemCheck: (props: LookupSystemCheckProps) => (index: number) => {
    const { itemCheck } = props;
    
    itemCheck[index].isCheck = !itemCheck[index].isCheck;

    props.stateUpdate({
      itemCheck
    });
  },
  handleReset: (props: LookupSystemCheckProps) => () => {
    const { itemCheck } = props;
    
    itemCheck.map(item => {
      item.isCheck = false;
    });
    
    props.stateReset(itemCheck);
  }
};

const fnGetContext = (props: LookupSystemCheckProps) => {
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
    case 'profession': return props.commonProfessionListState;
    case 'competency': return props.commonCompetencyListState;
    
    default: return props.commonActivityListState;
  }
};

export const LookupSystemCheck = compose<LookupSystemCheckProps, OwnOption>(
  setDisplayName('LookupSystemCheck'),
  withCommonSystem,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupSystemCheckView);
