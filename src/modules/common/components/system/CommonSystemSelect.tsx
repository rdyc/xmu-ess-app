import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import commonSystemSelectView from '@common/components/system/commonSystemSelectView';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IQueryCollectionState } from '@generic/interfaces';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  label: string; 
  disabled: boolean;
  companyUid?: string | undefined;
  category: CommonCategoryType;
  onChangeValue: (system: ISystemList | null) => void;
}

interface IOwnHandlers {
  categoryState: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
  handleChange: (event: React.ChangeEvent<any>) => void;
}

export type CommonSystemSelectProps 
  = OwnProps
  & IOwnHandlers
  & WithCommonSystem
  & WithWidth;

const lifecycles: ReactLifeCycleFunctions<CommonSystemSelectProps, OwnProps> = {
  componentDidMount() {
    const { category, companyUid, disabled, commonDispatch } = this.props;
    const { isLoading, response } = this.props.categoryState();

    // skipp fetch while current state is being loaded
    if (isLoading || response) {
      return;
    }

    // don't load while control has set as disabled
    if (!disabled) {
      const request: ISystemListRequest = {
        category,
        filter: {
          companyUid,
          direction: 'ascending',
          orderBy: 'value'
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
  
        default:
          break;
      }
    }
  }
};

const handlerCreators: HandleCreators<CommonSystemSelectProps, IOwnHandlers> = {
  categoryState: (props: CommonSystemSelectProps) => () => { 
    return fnGetContext(props);
  },
  handleChange: (props: CommonSystemSelectProps) => (event: React.ChangeEvent<any>) => {
    const { onChangeValue } = props;
    const { response } = fnGetContext(props);
    const value = event.target.value;

    if (response && response.data) {
      const systems = response.data.filter(item => item.type === value);
      const system = systems[0];
      
      onChangeValue(system ? system : null );
    }
  }
};

const fnGetContext = (props: CommonSystemSelectProps) => {
  const { category } = props;

  switch (category) {
    case 'activity': return props.commonActivityListState;
    case 'currency': return props.commonCurrencyListState;
    case 'document': return props.commonDocumentListState;
    case 'documentPreSales': return props.commonDocumentPresalesListState;
    case 'project': return props.commonProjectListState;
    case 'site': return props.commonSiteListState;
  
    default: return props.commonActivityListState;
  }
};

export default compose<CommonSystemSelectProps, OwnProps>(
  setDisplayName('CommonSystemSelect'),
  withCommonSystem,
  withWidth(),
  withHandlers<CommonSystemSelectProps, IOwnHandlers>(handlerCreators),
  lifecycle<CommonSystemSelectProps, {}>(lifecycles),
)(commonSystemSelectView);