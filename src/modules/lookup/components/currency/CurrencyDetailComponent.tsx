// import { IQuerySingleState } from '@generic/interfaces';
// import { ConnectedReduxProps } from '@generic/types';
// import { ICurrencyByIdRequest } from '@lookup/classes/queries';
// import { ICurrencyDetail } from '@lookup/classes/response';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   TextField,
//   WithStyles,
// } from '@material-ui/core';
// import styles from '@styles';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps } from 'react-intl';
// import { RouteComponentProps } from 'react-router';

// interface PropsFromState extends RouteComponentProps<void> {
//   currencyState: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;
// }

// type AllProps = PropsFromState & 
//                 ConnectedReduxProps & 
//                 InjectedIntlProps & 
//                 WithStyles<typeof styles>;

// export const CurrencyDetailComponent: React.StatelessComponent<AllProps> = props => { 
//   const { intl } = props;
//   const { response } = props.currencyState;

//   const renderDetail = (currency: ICurrencyDetail) => (
//     <Card square>
//       <CardHeader 
//         title={<FormattedMessage id="lookup.currency.lookupTitle"/>}
//         subheader={<FormattedMessage id="lookup.currency.lookupDescription" />}
//         // action={
//         //   <IconButton>
//         //     <MoreVertIcon />
//         //   </IconButton>
//         // }
//       />
//       <CardContent>
//         <TextField
//           fullWidth
//           contentEditable={false}
//           margin="normal"
//           label={<FormattedMessage id="currency.field.uid" />}
//           value={currency.uid}
//         />
//         <TextField
//           fullWidth
//           contentEditable={false}
//           margin="normal"
//           label={<FormattedMessage id="currency.field.symbol" />}
//           value={currency.symbol ? currency.symbol : 'N/A'}
//         />
//         <TextField
//           fullWidth
//           contentEditable={false}
//           margin="normal"
//           label={<FormattedMessage id="currency.field.name" />}
//           value={currency.name}
//         />
//         <TextField
//           fullWidth
//           contentEditable={false}
//           margin="normal"
//           label={<FormattedMessage id="currency.field.rate" />}
//           value={intl.formatNumber(currency.rate || 0)}
//         />
//         <FormControlLabel
//           contentEditable={false}
//           label={<FormattedMessage id="currency.field.isActive" />}
//           control={<Checkbox checked={currency.isActive} />}
//         />
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Grid container spacing={24}>
//       <Grid item xs={12} sm={12} md={4} xl={3}>
//         {
//           response &&
//           response.data &&
//           renderDetail(response.data)
//         }
//       </Grid>
//     </Grid>
//   );
// };