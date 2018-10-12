import { IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IPositionGetByIdRequest } from '@lookup/classes/queries';
import { IPositionDetail } from '@lookup/classes/response';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage,  InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';

interface PropsFromState extends RouteComponentProps<void> {
  positionState: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
}

type AllProps = PropsFromState & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

export const PositionDetailComponent: React.SFC<AllProps> = props => { 
  const { intl } = props;
  const { response } = props.positionState;

  const renderDetail = (position: IPositionDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="position.infoTitle"/>}
        subheader={<FormattedMessage id="position.infoSubTitle" />}
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
          label={<FormattedMessage id="position.field.uid" />}
          value={position.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="position.field.company" />}
          value={position.company ? position.company.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="position.field.name" />}
          value={position.name}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="position.field.inactiveDate" />}
          value={position.inactiveDate ? intl.formatDate(position.inactiveDate, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        />
        <FormControlLabel 
          contentEditable={false}
          label={<FormattedMessage id="position.field.isAllowMultiple" />}
          control={<Checkbox checked={position.isAllowMultiple}/>} 
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="position.field.description" />}
          value={position.description || 'N/A'}
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