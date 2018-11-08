import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { IProjectAssignmentList } from '@project/classes/response';
import { SelectProjectAssignmentView } from './SelectProjectAssignmentView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
  filter?: IProjectAssignmentGetListFilter | undefined;
  onSelected?: (project: IProjectAssignmentList | undefined) => void | undefined;
}

interface OwnHandlers {
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectProjectAssignmentProps 
  = WithProjectAssignment
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectProjectAssignmentProps, OwnHandlers> = {
  handleOnChange: (props: SelectProjectAssignmentProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { input, onSelected } = props;
    const { response } = props.projectAssignmentState.list;

    const value = e.target.value;

    input.onChange(value);

    if (response && response.data) {
      const project = response.data.filter(item => item.uid === value)[0];
      
      if (onSelected) {
        onSelected(project);
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SelectProjectAssignmentProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { isLoading, response } = this.props.projectAssignmentState.list;
    const { loadListRequest } = this.props.projectAssignmentDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter
      });
    }
  },
  componentWillReceiveProps(nextProps: SelectProjectAssignmentProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListDispose, loadListRequest } = this.props.projectAssignmentDispatch;
      const { filter } = nextProps;
      
      loadListDispose();
      loadListRequest({filter});
    }
  },
  componentWillUnmount() {
    const { loadListDispose } = this.props.projectAssignmentDispatch;
    loadListDispose();
  }
};

export const SelectProjectAssigment = compose<SelectProjectAssignmentProps, OwnProps>(
  withProjectAssignment,
  withWidth(),
  withHandlers<SelectProjectAssignmentProps, OwnHandlers>(handlerCreators),
  lifecycle<SelectProjectAssignmentProps, {}>(lifecycles)
)(SelectProjectAssignmentView);