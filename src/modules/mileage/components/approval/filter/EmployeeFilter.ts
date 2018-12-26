import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { IMileageRequest } from '@mileage/classes/response';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { EmployeeFilterView } from './EmployeeFilterView';

interface OwnOptions {
  title: string;
  value?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (employee?: IMileageRequest) => void;
  onClose: () => void;
}

export type EmployeeFilterProps
  = WithMileageApproval
  & WithUser
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps
  & OwnOptions;

const lifecycles: ReactLifeCycleFunctions<EmployeeFilterProps, {}> = {
  componentDidMount() {
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.mileageApprovalState.all;
    const { loadAllRequest } = this.props.mileageApprovalDispatch;

    if (user && !isLoading && !response) {
      loadAllRequest({
        filter: {
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          status: 'pending',
          isNotify: undefined,
          query: {
            direction: 'ascending',
            orderBy: undefined,
            page: undefined,
            size: undefined,
            find: undefined,
            findBy: undefined
          }
        }
      });
    }
  }
};

export const EmployeeFilter = compose<EmployeeFilterProps, OwnOptions>(
  withMileageApproval,
  withUser,
  withLayout,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(EmployeeFilterView);