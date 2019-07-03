import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  WithStyles,
  withStyles
} from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import chart from './chart';

const rows: {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}[] = [
  {
    name: 'Frozen',
    calories: 1,
    fat: 2,
    carbs: 3,
    protein: 4
  },
  {
    name: 'Beku',
    calories: 5,
    fat: 6,
    carbs: 7,
    protein: 8
  },
  {
    name: 'Cair',
    calories: 9,
    fat: 10,
    carbs: 11,
    protein: 12
  }
];

const pure: React.SFC<PureProps> = props => {
  const { classes } = props;
  return (
    <Paper>
      <Table className={props.classes.table}>
        <colgroup>
          <col span={1} className={classes.name}/>
          <col span={12} className={classes.month}/>
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>
                <div className={props.classes.line}/>
              </TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

interface IOwnState {
  data: [];
}

type PureProps = IOwnState & RouteComponentProps & WithStyles<typeof chart>;

const lifecycles: ReactLifeCycleFunctions<PureProps, {}> = {
  componentDidMount() {
    //
  }
};

export const Pure = compose<PureProps, {}>(
  withRouter,
  withStyles(chart),
  lifecycle(lifecycles)
)(pure);
