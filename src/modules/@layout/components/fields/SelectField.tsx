import {
  Chip,
  createStyles,
  MenuItem,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
  WithTheme,
} from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Cancel } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import Select from 'react-select';
import { Props } from 'react-select/lib/Creatable';

const styles = (theme: Theme) => createStyles({
  input: {
    display: 'flex',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2
  },
  IndicatorsContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  placeholder: {
    display: 'none'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const NoOptionsMessage = (props: any) => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const LoadingMessage = (props: any) => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

function inputComponent({ inputRef, ...props }: any) {
  return <div ref={inputRef} {...props} />;
}

const Control = (props: any) => (
  <TextField
    fullWidth
    margin="normal"
    required={props.selectProps.required}
    placeholder={props.selectProps.placeholder}
    label={props.selectProps.label}
    value={props.selectProps.isMulti ? props.selectProps.value.length > 0 && props.selectProps.value[0].value || '' : props.selectProps.value && props.selectProps.value.value || ''}
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);

const Option = (props: any) => (
  <MenuItem
    buttonRef={props.innerRef}
    disabled={props.value === ''}
    selected={props.isFocused}
    component="div"
    style={{
      display: props.value === '' && 'none',
      fontWeight: props.isSelected ? 500 : 400,
    }} 
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const Placeholder = (props: any) => (
  <div 
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </div>
);

const SingleValue = (props: any) => (
  <Typography variant="body1" paragraph={false}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const IndicatorsContainer = (props: any) => (
  <div className={props.selectProps.classes.IndicatorsContainer}>
    {props.children}
  </div>
);

const ValueContainer = (props: any) => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
);

const IndicatorSeparator = (props: any) => (
  <span>
    {props.selectProps.isClearable && '|'}
  </span>
);

const MultiValue = (props: any) => (
  <Chip
    tabIndex={-1}
    label={props.children}
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<Cancel {...props.removeProps} />}
  />
);

const MenuComponent = (props: any) => (
  <Paper square 
    className={props.selectProps.classes.paper} 
    {...props.innerProps}
  >
    {props.children}
  </Paper>
);

export interface ISelectFieldOption {
  value: string;
  label: string;
  object?: any;
}

export interface SelectFieldProps extends Props<ISelectFieldOption> {
  valueString?: string;
  textFieldProps: TextFieldProps;
}

const component = (props: SelectFieldProps & WithStyles<typeof styles> & WithTheme) => (
  <Select
    {...props}
    {...{ classes: props.classes }}
    styles={{
      input: (base: React.CSSProperties) => ({
        ...base,
        color: props.theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    }}
    components={{
      Control,
      MultiValue,
      NoOptionsMessage,
      Option,
      Placeholder,
      SingleValue,
      IndicatorsContainer,
      ValueContainer,
      IndicatorSeparator,
      LoadingMessage,
      Menu: MenuComponent,
    }}
  />
);

export const SelectField = withStyles(styles, { withTheme: true })(component);