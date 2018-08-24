import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { AppUserResponse, Company } from '../../store/user/types';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

export class GreetingCompany extends React.Component<AppUserResponse> {
  public state = {
    uid: ''
  };

  public handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  public render() {
    const { data } = this.props;
    const access = (): Company[] => {
      const result: Company[] = [];

      data.access.map(item => {
        if (result.indexOf(item.company) === -1) {
          result.push(item.company);
        }
      });

      return result;
    };

    const acccc = data.access.reduce((catMemo, { companyUid, company }) => {
      (catMemo[companyUid] = catMemo[companyUid] || []).push(company);
      return catMemo;
    },                               [ ]);

    console.log(acccc);

    return (
      <div>
        {data && (
          <React.Fragment>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="accessUid">Access</InputLabel>
                <Select
                  fullWidth
                  value={this.state.uid}
                  onChange={this.handleChange}
                  inputProps={{
                    id: 'accessUid',
                    name: 'uid'
                  }}
                >
                  {access().map(item => (
                    <MenuItem value={item.uid}>{item.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid> 
          </React.Fragment>
        )}
      </div>
  );
}
}

export default GreetingCompany;