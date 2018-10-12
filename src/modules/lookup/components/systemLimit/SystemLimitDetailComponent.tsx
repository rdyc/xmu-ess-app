import { IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { ISystemLimitByIdRequest } from '@lookup/classes/queries';
import { ISystemLimitDetail } from '@lookup/classes/response';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void> {
  systemLimitState: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

export const SystemLimitDetailComponent: React.StatelessComponent<AllProps> = props => { 
  const { intl } = props;
  const { response } = props.systemLimitState;

  const renderDetail = (systemLimit: ISystemLimitDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="lookup.systemLimit.lookupTitle"/>}
        subheader={<FormattedMessage id="lookup.systemLimit.lookupDescription" />}
        // action={
        //   <IconButton>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="systemLimit.field.uid" />}
          value={systemLimit.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="systemLimit.field.type" />}
          value={systemLimit.categoryType}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="systemLimit.field.name" />}
          value={systemLimit.companyUid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="systemLimit.field.limit" />}
          value={intl.formatNumber(systemLimit.days || 0)}
        />
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12} md={4} xl={3}>
        {
          response &&
          response.data &&
          renderDetail(response.data)
        }
      </Grid>
    </Grid>
  );
};