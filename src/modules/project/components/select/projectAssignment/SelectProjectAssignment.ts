import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { IProjectAssignmentList } from '@project/classes/response';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { compose, HandleCreators, lifecycle, ReactLifeCycleFunctions, shallowEqual, withHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

import { SelectProjectAssignmentView } from './SelectProjectAssignmentView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean;
  filter?: IProjectAssignmentGetListFilter;
  onSelected?: (project?: IProjectAssignmentList) => void;
}

interface OwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type SelectProjectAssignmentProps 
  = WithProjectAssignment
  & WithWidth
  & OwnProps
  & OwnHandlers;

const handlerCreators: HandleCreators<SelectProjectAssignmentProps, OwnHandlers> = {
  handleOnLoadApi: (props: SelectProjectAssignmentProps) => () => {
    props.projectAssignmentDispatch.loadListRequest({
      filter: props.filter
    });
  },
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
    const { request } = this.props.projectAssignmentState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing filter props
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  }
};

export const SelectProjectAssigment = compose<SelectProjectAssignmentProps, OwnProps>(
  withProjectAssignment,
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth()
)(SelectProjectAssignmentView);