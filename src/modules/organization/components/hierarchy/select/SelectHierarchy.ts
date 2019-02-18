import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import { IHierarchyList } from '@organization/classes/response/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { SelectHierarchyView } from './SelectHierarchyView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  filter?: IOrganizationHierarchyListFilter | undefined;
  onSelected?: (project: IHierarchyList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOnLoadApi: () => void;
}

export type SelectHierarchyProps
  = WithOrganizationHierarchy
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectHierarchyProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectHierarchyProps) => () => {
    props.organizationHierarchyDispatch.loadListRequest({filter: props.filter});
  },
  handleOnChange: (props: SelectHierarchyProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.organizationHierarchyState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const hierarchy = response.data.filter(item => item.uid === value)[0];

      if (onSelected) {
        onSelected(hierarchy);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectHierarchyProps, {}> = {
  componentDidMount() {
    const { request } = this.props.organizationHierarchyState.list;

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

export const SelectHierarchy = compose<SelectHierarchyProps, OwnProps>(
  withOrganizationHierarchy,
  withWidth(),
  withHandlers<SelectHierarchyProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectHierarchyProps, {}>(lifecycles)
)(SelectHierarchyView);