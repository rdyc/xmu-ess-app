import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Dialog,
  DialogContent,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { ProjectMappingInformation } from './ProjectMappingInformation';
import { IResourceMappingChart } from './ResourceMapping';

interface OwnProps {
  isDetailOpen: boolean;
  data?: IResourceMappingChart;
  handleOpenDetail: () => void;
}

type AllProps 
  = OwnProps 
  & WithUser 
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const resourceMappingDetail: React.SFC<AllProps> = props => {
  const { isDetailOpen, data, handleOpenDetail } = props;

  const render = (
    <div>
      {data &&
        <Dialog
          open={isDetailOpen}
          onClose={handleOpenDetail}
          scroll="paper"
          onBackdropClick={handleOpenDetail}
        >
          <DialogContent>
            <ProjectMappingInformation data={data.project} employeeName={data.employee.fullName} />
          </DialogContent>
        </Dialog>
      }
    </div>
  );

  return render;
};

export const ResourceMappingDetail = compose<AllProps, OwnProps>(
  injectIntl,
  withUser,
  withStyles(styles)
)(resourceMappingDetail);
