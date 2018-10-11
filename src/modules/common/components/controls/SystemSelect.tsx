import { ISystemListRequest } from '@common/classes/queries';
import { ISystemList } from '@common/classes/response';
import { CommonCategoryType } from '@common/classes/types';
import { currencyGetListRequest, projectGetListRequest } from '@common/store/actions';
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
  commmonCurrencyState: IQueryCollectionState<ISystemListRequest, ISystemList>;
  commmonProjectState: IQueryCollectionState<ISystemListRequest, ISystemList>;
}

interface PropsFromDispatch {
  commonDispatch: {
    listCurrencyRequest: typeof currencyGetListRequest;
    listProjectRequest: typeof projectGetListRequest;
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
  public state: State = initialState;

  public componentDidMount() {
    const { input, disabled } = this.props;
    const { isLoading, response } = this.getContext();

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
  
  public render() {
    const { width, input, label, disabled, meta } = this.props;
    const { response } = this.getContext();
    
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

  private getContext = () => {
    const { category } = this.props;

    switch (category) {
      case 'currency': return this.props.commmonCurrencyState;
      case 'project': return this.props.commmonProjectState;
    
      default: return this.props.commmonCurrencyState;
    }
  }

  private loadData = () => {
    const { companyUid, category } = this.props;

    const request: ISystemListRequest = {
      category,
      filter: {
        companyUid,
        direction: 'ascending',
        orderBy: 'value'
      }
    };

    switch (category) {
      case 'currency':
        this.props.commonDispatch.listCurrencyRequest(request);
        break;

      case 'project':
        this.props.commonDispatch.listProjectRequest(request);
        break;
    
      default:
        break;
    }
  };

  private handleChange = (event: React.ChangeEvent<any>) => {
    const { onChangeValue } = this.props;
    const { response } = this.getContext();
    const value = event.target.value;

    if (response && response.data) {
      const systems = response.data.filter(item => item.type === value);
      const system = systems[0];
      
      onChangeValue(system ? system : null );
      
      this.setState({ selected: systems[0] });
    }
  };
}

const mapStateToProps = ({ commonCurrencyGetList, commonProjectGetList }: IAppState) => ({
  commmonCurrencyState: commonCurrencyGetList,
  commmonProjectState: commonProjectGetList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  commonDispatch: {
    listCurrencyRequest: (request: ISystemListRequest) => dispatch(currencyGetListRequest(request)),
    listProjectRequest: (request: ISystemListRequest) => dispatch(projectGetListRequest(request)),
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