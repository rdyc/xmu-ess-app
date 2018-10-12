import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import commonSystemSelectView from '@common/components/system/commonSystemSelectView';
import withApiCommonSystemList, { WithApiCommonSystemListHandlers } from '@common/enhancers/system/withApiCommonSystemList';
import withCommonSystemList, { WithCommonSystemList } from '@common/enhancers/system/withCommonSystemList';
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
  & WithCommonSystemList
  & WithApiCommonSystemListHandlers
  & WithWidth;

const lifecycles: ReactLifeCycleFunctions<CommonSystemSelectProps, OwnProps> = {
  componentDidMount() {
    const { category, companyUid, disabled, apiCommonGetList } = this.props;
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

      apiCommonGetList(request);
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
  const { category, commonList } = props;

  switch (category) {
    case 'activity': return commonList.activityState;
    case 'currency': return commonList.currencyState;
    case 'document': return commonList.documentState;
    case 'documentPreSales': return commonList.documentPresalesState;
    case 'project': return commonList.projectState;
    case 'site': return commonList.siteState;
  
    default: return commonList.activityState;
  }
};

export default compose<CommonSystemSelectProps, OwnProps>(
  setDisplayName('CommonSystemSelect'),
  withCommonSystemList,
  withApiCommonSystemList,
  withWidth(),
  withHandlers<CommonSystemSelectProps, IOwnHandlers>(handlerCreators),
  lifecycle<CommonSystemSelectProps, {}>(lifecycles),
)(commonSystemSelectView);