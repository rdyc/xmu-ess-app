import { Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';

export const HomePage: React.SFC = props => (
  <Card square elevation={0}>
    <CardContent>
      <Typography>
        Test bro
      </Typography>
    </CardContent>
  </Card>
);