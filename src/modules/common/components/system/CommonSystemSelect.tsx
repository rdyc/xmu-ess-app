import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import withApiCommonSystemList, { WithApiCommonSystemListHandlers } from '@common/enhancers/system/withApiCommonSystemList';
import withCommonSystemList, { WithCommonSystemList } from '@common/enhancers/system/withCommonSystemList';
import { IQueryCollectionState } from '@generic/interfaces';
import { MenuItem, TextField } from '@material-ui/core';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  label: string; 
  disabled: boolean;
  companyUid?: string | undefined;
  category: CommonCategoryType;
  onChangeValue: (system: ISystemList | null) => void;
}

interface IOwnHandlers {
  getContext: () => IQueryCollectionState<ISystemListRequest, ISystemList>;
  handleChange: (event: React.ChangeEvent<any>) => void;
}

type AllProps 
  = OwnProps
  & IOwnHandlers
  & WithCommonSystemList
  & WithApiCommonSystemListHandlers
  & WithWidth;

const commonSystemList: React.SFC<AllProps> = props => {
  const { } = props;

  const { width, input, label, disabled, meta } = props;
  const { response } = props.getContext();
  
  const isMobile = isWidthDown('sm', width);

  const renderItemEmpty = isMobile ? 
    <option value=""></option> : 
    <MenuItem value=""></MenuItem>;

  const renderItem = (item: ISystemList) => {
    if (isMobile) {
      return (
        <option key={item.id} value={item.type}>
          {item.name}
        </option>
      );
    } 

    if (!isMobile) {
      return (
        <MenuItem key={item.id} value={item.type}>
          {item.name}
        </MenuItem>
      );
    }

    return null;
  };

  return (
    <TextField
      select
      fullWidth
      margin="normal"
      name={input.name}
      label={label}
      value={input.value ? input.value.type : ''}
      disabled={disabled || meta.submitting}
      error={meta.touched && !isNullOrUndefined(meta.error)}
      helperText={meta.touched && meta.error}
      SelectProps={{
        native: isMobile
      }}
      onChange={props.handleChange}
    >
      {renderItemEmpty}
      {
        response &&
        response.data &&
        response.data.map(item => renderItem(item))
      }
    </TextField>
  );
};

const lifecycles: ReactLifeCycleFunctions<AllProps, OwnProps> = {
  componentDidMount() {
    const { category, companyUid, disabled, commonGetListRequest } = this.props;
    const { isLoading, response } = this.props.getContext();

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

      commonGetListRequest(request);
    }
  }
};

const handlerCreators: HandleCreators<AllProps, IOwnHandlers> = {
  getContext: (props: AllProps) => () => { 
    return fnGetContext(props);
  },
  handleChange: (props: AllProps) => (event: React.ChangeEvent<any>) => {
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

const fnGetContext = (props: AllProps) => {
  const { category, common } = props;

  switch (category) {
    case 'activity': return common.activityListState;
    case 'currency': return common.currencyListState;
    case 'project': return common.projectListState;
  
    default: return common.activityListState;
  }
};

export default compose<AllProps, OwnProps>(
  setDisplayName('CommonSystemSelect'),
  withCommonSystemList,
  withApiCommonSystemList,
  withWidth(),
  withHandlers<AllProps, IOwnHandlers>(handlerCreators),
  lifecycle<AllProps, {}>(lifecycles),
)(commonSystemList);