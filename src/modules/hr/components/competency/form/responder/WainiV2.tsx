import { FormMode } from '@generic/types';
import { Card, FormControlLabel, Radio, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICompetencyResponderFormValue } from './CompetencyResponderForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyResponderFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {

}

interface IOwnHandler {

}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const wainiV2: React.ComponentType<AllProps> = props => (
  <Card square>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2} className={props.classes.toolbar}>
            <Typography variant="body1" color="inherit">
              Strive for Excellence
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={1}>
            <Field 
              name="responder"
              render={({field}: FieldProps<ICompetencyResponderFormValue>) => (
                <FormControlLabel
                  control={<Radio 
                    checked={props.formikBag.values.responder === '1'}
                    onChange={() => {
                      props.formikBag.setFieldValue('responder', '1');
                    }}
                  />}
                  label="Level 1 - Fokus pada tugas yang diberikan"
                />
              )}
            />
          </TableCell>
          <TableCell colSpan={1}>
            <Typography>
              &bull; Memastikan anggota kelompok mendapat informasi yang diibutuhkan.<br/>
              &bull; Menjelaskan alasan dibalik suatu keputusan.<br/>
              &bull; Menyampaikan tujuan kelompok dan peran setiap anggota untuk mencapai sasaran tersebut. 
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={1}>
            <Field 
              name="responder"
              render={() => (
                <FormControlLabel
                control={<Radio 
                  checked={props.formikBag.values.responder === '2'}
                  onChange={() => {
                    props.formikBag.setFieldValue('responder', '2');
                  }}
                />}
                  label="Level 2 - Meningkatkan Kinerja"
                  // value="2"
                />
              )}
            />
          </TableCell>
          <TableCell colSpan={1}>
            <Typography>
              &bull; Tidak cepat puas.<br/>
              &bull; Secara bertahap terus meningkatkan unjuk kerja.<br/>
              &bull; Melaksanakan pekerjaan dengan cara yang lebih baik, lebih cepat, atau lebih efisien.  
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell colSpan={2} className={props.classes.toolbar}>
            <Typography variant="body1" color="inherit">
              Customer Service & Responsiveness 
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={1}>
            <Field 
              name="responder"
              render={({field}: FieldProps<ICompetencyResponderFormValue>) => (
                <FormControlLabel
                  control={<Radio />}
                  label="Level 1 - Merespon kebutuhan pelanggan dengan tepat"
                />
              )}
            />
          </TableCell>
          <TableCell colSpan={1}>
            <Typography>
              &bull; Mengenali kebutuhan pelanggan dan memberikan pelayanan yang sesuai.<br/>
              &bull; Mau mendengarkan/tidak menghindar dari keluhan pelanggan.<br/>
              &bull; Menindaklanjuti permintaan, pelayanan dan keluhan pelanggan. 
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={1}>
            <Field 
              name="responder"
              render={() => (
                <FormControlLabel
                control={<Radio />}
                  label="Level 2 - Memelihara komunikasi yang baik "
                />
              )}
            />
          </TableCell>
          <TableCell colSpan={1}>
            <Typography>
              &bull; Menggali keinginan pelanggan terkait standar pelayanan yang diharapkan.<br/>
              &bull; Memonitor kepuasan pelanggan.<br/>
              &bull; Menyampaikan informasi yang berguna kepada pelanggan.  
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
);

export const WainiV2 = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(wainiV2);