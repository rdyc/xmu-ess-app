import { WithUser, withUser } from '@layout/hoc/withUser';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { IPositionList } from '@lookup/classes/response';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { FilterPositionView } from './FilterPositionView';

interface OwnOptions {
  title: string;
  value?: string | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  filter?: IPositionGetListFilter | undefined;
  onSelected: (position?: IPositionList) => void;
  onClose: () => void;
}

export type FilterPositionProps
  = WithLookupPosition
  & WithUser
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & OwnOptions;

const lifecycles: ReactLifeCycleFunctions<FilterPositionProps, {}> = {
  componentDidMount() {
    const { filter } = this.props;
    const { user } = this.props.userState;
    const { isLoading, response } = this.props.lookupPositionState.list;
    const { loadListRequest } = this.props.lookupPositionDispatch;

    if (user && !isLoading && !response) {
      loadListRequest({ filter });
    }
  },
  componentWillUpdate(nextProps: FilterPositionProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.lookupPositionDispatch;
      const { filter } = nextProps;
  
      loadListRequest({ filter });
    }
  }
};

export const FilterPosition = compose<FilterPositionProps, OwnOptions>(
  withLookupPosition,
  withUser,
  injectIntl,
  withStyles(styles),
  lifecycle(lifecycles)
)(FilterPositionView);