import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { systemGetListRequest } from '@common/store/actions';
import { CommonCategoryType } from '@common/classes/types';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { MenuItem, TextField, WithStyles, withStyles } from '@material-ui/core';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface PropsFromState {
  systemState: IQueryCollectionState<ISystemListRequest, ISystemList>;
}

interface PropsFromDispatch {
  systemDispatch: {
    listRequest: typeof systemGetListRequest;
  };
}

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string; 
  label: string; 
  disabled: boolean;
  companyUid?: string | undefined;
  category: CommonCategoryType;
  onChangeValue: (system: ISystemList | null) => void;
}

type AllProps = PropsFromState & 
                PropsFromDispatch &
                OwnProps &
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithWidth &
                WithStyles<typeof styles>;

const initialState = {
  selected: {}
};

type State = Readonly<typeof initialState>;          

class SystemSelect extends React.Component<AllProps, State> {
  state: State = initialState;

  componentDidMount() {
    const { input, disabled } = this.props;
    const { isLoading, response } = this.props.systemState;

    // skipp fetch while current state is being loaded
    if (isLoading || response) {
      return;
    }

    this.setState({ selected: input.value });

    // don't load while control has set as disabled
    if (!disabled) {
      this.loadData();
    }
  }

  loadData = () => {
    const { companyUid, category } = this.props;

    this.props.systemDispatch.listRequest({
      category,
      filter: {
        companyUid,
        direction: 'ascending',
        orderBy: 'value'
      }
    });
  };

  handleChange = (event: React.ChangeEvent<any>) => {
    const { onChangeValue } = this.props;
    const { response } = this.props.systemState;
    const value = event.target.value;

    if (response && response.data) {
      const systems = response.data.filter(item => item.type === value);
      const system = systems[0];
      
      onChangeValue(system ? system : null );
      
      this.setState({ selected: systems[0] });
    }
  };
  
  render() {
    const { width, input, label, disabled, meta } = this.props;
    const { response } = this.props.systemState;
    
    const isMobile = isWidthDown('sm', width);

    const renderItemEmpty = isMobile ? <option value=""></option> : <MenuItem value=""></MenuItem>;

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
        error={!isNullOrUndefined(meta.error)}
        helperText={meta.error}
        SelectProps={{
          native: isMobile
        }}
        onChange={this.handleChange}
      >
        {renderItemEmpty}
        {
          response &&
          response.data &&
          response.data.map(item => renderItem(item))
        }
      </TextField>
    );
  }
}

const mapStateToProps = ({ systemGetList }: IAppState) => ({
  systemState: systemGetList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  systemDispatch: {
    listRequest: (request: ISystemListRequest) => dispatch(systemGetListRequest(request)),
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    withWidth()(
      injectIntl(SystemSelect)
    )
  )
);