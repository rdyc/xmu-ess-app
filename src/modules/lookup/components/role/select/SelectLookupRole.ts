import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { IRoleList } from '@lookup/classes/response';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectLookupRoleView } from './SelectLookupRoleView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  filter?: ILookupRoleGetListFilter | undefined;
  onSelected?: (project: IRoleList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectLookupRoleProps
  = WithLookupRole
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectLookupRoleProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectLookupRoleProps) => () => {
    props.lookupRoleDispatch.loadListRequest({filter: props.filter});
  },
  handleOnChange: (props: SelectLookupRoleProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.lookupRoleState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const role = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(role);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectLookupRoleProps, {}> = {
  componentDidMount() {
    const { request } = this.props.lookupRoleState.list;

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
};

export const SelectLookupRole = compose<SelectLookupRoleProps, OwnProps>(
  withLookupRole,
  withWidth(),
  withHandlers<SelectLookupRoleProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectLookupRoleProps, {}>(lifecycles)
)(SelectLookupRoleView);