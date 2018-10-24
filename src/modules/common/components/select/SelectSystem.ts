import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectSystemView } from './SelectSystemView';

export interface SelectSystemOption {
  onlyForTypes?: string[] | undefined;
}

interface OwnProps extends SelectSystemOption, WrappedFieldProps, BaseFieldProps { 
  category: CommonCategoryType;
  companyUid?: string | undefined; 
  required?: boolean;
  placeholder?: string;
  label: string; 
  disabled: boolean;
}

interface OwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
}

export type SelectSystemProps 
  = OwnProps 
  & OwnHandlers
  & WithCommonSystem
  & WithWidth;

const lifecycles: ReactLifeCycleFunctions<SelectSystemProps, OwnProps> = {
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
          orderBy: 'code',
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

        case 'leave':
          commonDispatch.leaveListRequest(request);
          break;

        case 'status':
          commonDispatch.statusListRequest(request);
          break;
  
        default:
          break;
      }
    }
  }
};

const handlerCreators: HandleCreators<SelectSystemProps, OwnHandlers> = {
  categoryState: (props: SelectSystemProps) => () => { 
    return fnGetContext(props);
  }
};

const fnGetContext = (props: SelectSystemProps) => {
  const { category } = props;

  switch (category) {
    case 'activity': return props.commonActivityListState;
    case 'currency': return props.commonCurrencyListState;
    case 'document': return props.commonDocumentListState;
    case 'documentPreSales': return props.commonDocumentPresalesListState;
    case 'project': return props.commonProjectListState;
    case 'site': return props.commonSiteListState;
    case 'leave': return props.commonLeaveListState;
    case 'status': return props.commonStatusListState;
  
    default: return props.commonActivityListState;
  }
};

export const SelectSystem = compose<SelectSystemProps, OwnProps>(
  withCommonSystem,
  withWidth(),
  withHandlers<SelectSystemProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectSystemProps, {}>(lifecycles),
)(SelectSystemView);
