import React, { useState, Fragment } from 'react';
import { Card, CardMedia, Typography, CardContent, makeStyles, MobileStepper, Button } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: '50%',
    display: "flex",
  },
  content: {
    display: "flex",
    maxWidth: "100%",
  }
}));

export function StepCard(props) {

  const classes = useStyle();

  const step = props.step;
  const [activeStep, setActiveStep] = useState(0);
  const maxStep = step.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };




  return (
    <Fragment>
      <Card className={classes.root}>
        <CardMedia className={classes.media}
          image={step[activeStep].img}
          title={step[activeStep].title}
        />
        <CardContent className={classes.content}>
          <Typography>
            {step[activeStep].content}
          </Typography>
        </CardContent>
      </Card>
      <MobileStepper
        steps={maxStep}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxStep -1}>
            Next
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </Fragment>
  )
}