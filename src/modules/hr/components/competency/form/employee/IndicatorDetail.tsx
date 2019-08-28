import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  isIndicatorOpen: boolean;
  handleOpenIndicator: () => void;
}

type AllProps 
  = OwnProps 
  & WithUser 
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const indicatorDetail: React.SFC<AllProps> = props => {
  const { isIndicatorOpen, handleOpenIndicator } = props;

  const render = (
    <Dialog
      open={isIndicatorOpen}
      onClose={handleOpenIndicator}
      scroll="paper"
      onBackdropClick={handleOpenIndicator}
    >
      <DialogTitle>1 - Fokus pada tugas yang diberikan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          &bull; Memastikan anggota kelompok mendapat informasi yang diibutuhkan.<br/>
          &bull; Menjelaskan alasan dibalik suatu keputusan.<br/>
          &bull; Menyampaikan tujuan kelompok dan peran setiap anggota untuk mencapai sasaran tersebut. 
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );

  return render;
};

export const IndicatorDetail = compose<AllProps, OwnProps>(
  injectIntl,
  withUser,
  withStyles(styles)
)(indicatorDetail);
