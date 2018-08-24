import * as React from 'react';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AppUserResponse } from '../../store/user/types';

export class AddressForm extends React.Component<AppUserResponse> {
  public render() {
    const { data } = this.props;

    return (
      <div>
        {data && (
          <React.Fragment>
            {/* <Typography variant="title" gutterBottom>
              Account Information
            </Typography> */}
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="empNumber"
                  name="empNumber"
                  label="Employment number"
                  value={data.employmentNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full name"
                  value={data.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={data.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={data.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="state" name="state" label="State/Province/Region" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="billing postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="billing country"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
  );
}
}

export default AddressForm;