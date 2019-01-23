import { IconButton } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { StepperProps } from './Stepper';

export const StepperView: React.SFC<StepperProps> = props => (
  <React.Fragment>
    <SwipeableViews 
      enableMouseEvents
      index={props.activeStep}
      onChangeIndex={props.setChange}
    >
      {props.source.map((step, index) => (
        <div key={step.label} className={props.classes.stepper}>
          {Math.abs(props.activeStep - index) <= 2 ? (
            <img 
              className={props.classes.stepperImg} 
              src={step.imgPath} 
              alt={step.label}
            />
          ) : null}
        </div>
      ))}
    </SwipeableViews>

    <MobileStepper
      steps={props.source.length}
      position="static"
      activeStep={props.activeStep}
      nextButton={
        <IconButton onClick={props.setNext}>
          <ChevronRightIcon/>
        </IconButton>
      }
      backButton={
        <IconButton onClick={props.setBack}>
          <ChevronLeftIcon/>
        </IconButton>
      }
    />
  </React.Fragment>
);