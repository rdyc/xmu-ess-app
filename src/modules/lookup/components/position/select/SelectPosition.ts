import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectPositionView } from './SelectPositionView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label?: string; 
  disabled?: boolean;
  filter?: IPositionGetListFilter | undefined;
  onSelected?: (lookupPosition: IPositionList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOnLoadApi: () => void;
}

export type SelectPositionProps 
  = WithLookupPosition
  & WithWidth
  & OwnProps
  & OwnHandlers;
  
const handlerCreators: HandleCreators<SelectPositionProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectPositionProps) => () => {
    props.lookupPositionDispatch.loadListRequest({filter: props.filter});
  },
  handleOnChange: (props: SelectPositionProps) => (e: React.ChangeEvent<HTMLSelectElement>) => { 
    const { input, onSelected } = props;
    const { response } = props.lookupPositionState.list;

    const value = e.target.value;
    
    input.onChange(value);

    if (response && response.data) {
      const lookupPosition = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(lookupPosition);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectPositionProps, {}> = {
  componentDidMount() {
    const { request } = this.props.lookupPositionState.list;

    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      if (request.filter) {
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});

        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  },
  componentDidUpdate(prevProps: SelectPositionProps) {
    if (prevProps.filter && this.props.filter) {
      if (prevProps.filter.companyUid !== this.props.filter.companyUid) {
        this.props.handleOnLoadApi();
      }
    }
  }
};

export const SelectPosition = compose<SelectPositionProps, OwnProps>(
  withLookupPosition,
  withWidth(),
  withHandlers<SelectPositionProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectPositionProps, {}>(lifecycles)
)(SelectPositionView);