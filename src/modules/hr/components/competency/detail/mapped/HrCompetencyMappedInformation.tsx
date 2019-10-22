import { IHrCompetencyMappedDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyMappedDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const hrCompetencyMappedInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Mapped'})}
        // subheader={intl.formatMessage(hrMessage.request.field.subHeader)}
      />
      <CardContent>
        {/* <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(hrMessage.competency.field.uid, {state: 'Mapped'})}
          value={data.uid}
        /> */}
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(hrMessage.competency.field.company)}
          value={data.company && data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(hrMessage.competency.field.position)}
          value={data.position && data.position.name || 'N/A'}
        />
        {
          props.data.changes &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
            />

            {
              (props.data.changes.updated && props.data.changes.updatedAt) &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                value={props.data.changes.updated.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
              />
          }
        </React.Fragment>
      }
      </CardContent>
    </Card>
  );

  return render;
};

export const HrCompetencyMappedInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(hrCompetencyMappedInformation);