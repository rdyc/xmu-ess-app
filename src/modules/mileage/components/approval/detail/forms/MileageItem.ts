// import { WithUser, withUser } from '@layout/hoc/withUser';
import { MileageItemData } from '@mileage/components/approval/detail/forms//MileageApprovalForm';
import { MileageItemView } from '@mileage/components/approval/detail/forms/MileageItemView';
import {
  WithMileageApproval,
  withMileageApproval
} from '@mileage/hoc/withMileageApproval';
import {
  InjectedIntlProps,
  injectIntl
} from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<MileageItemData>;
}

// interface OwnRouteParams {
//   mileageUid: string;
// }

interface OwnHandlers {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  isChecked: (type: string) => boolean;
}

export type ItemFormProps = OwnProps &
  OwnHandlers &
  // WithUser &
  // RouteComponentProps<OwnRouteParams> &
  WithMileageApproval&
  InjectedIntlProps;

const handlerCreators: HandleCreators<ItemFormProps, OwnHandlers> = {
  handleChange: (props: ItemFormProps) => (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    // const { context } = props;
  },
  isChecked: (props: ItemFormProps) => (type: string): boolean => {
    const result: boolean = false;

    return result;
  }
};

export const MileageItem = compose<ItemFormProps, OwnProps>(
  withMileageApproval,
  // withRouter,
  // withUser,
  injectIntl,
  withHandlers<ItemFormProps, OwnHandlers>(handlerCreators),
)(MileageItemView);