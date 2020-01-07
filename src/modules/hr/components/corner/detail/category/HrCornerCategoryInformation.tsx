import { IHrCornerCategoryDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCornerCategoryDetail;
}

type AllProps = OwnProps & InjectedIntlProps;

const hrCornerCategoryInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <React.Fragment>
      {/* <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(hrMessage.corner.field.uid, {state: 'Category'})}
        value={data.uid}
      /> */}
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(hrMessage.corner.field.name)}
        value={data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        multiline
        label={intl.formatMessage(hrMessage.corner.field.slug)}
        value={data.slug}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        multiline
        label={intl.formatMessage(hrMessage.corner.field.description)}
        value={data.description}
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
    </React.Fragment>
  );

  return render;
};

export const HrCornerCategoryInformation = compose<AllProps,  OwnProps>(
  injectIntl
)(hrCornerCategoryInformation);