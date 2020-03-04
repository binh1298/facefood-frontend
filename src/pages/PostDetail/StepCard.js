import { Button, Card, CardContent, CardMedia, Container, makeStyles, MobileStepper, Typography } from "@material-ui/core";
import React, { useState } from 'react';

const useStyle = makeStyles(theme => ({
  root: {
    maxHeight: "70%",
  },
  card: {
    maxWidth: "100%",
    innerHeight: "100%",
    display: "inline-block",
  },
  media: {
    height: 0,
    paddingTop: '50%',
    display: "flex",
  },
  content: {
    marginBottom: "10%",
    display: "inline-block",
    maxWidth: "100%",
    height: "40%",
  },
  stepper:{
    
  }
}));

export function StepCard(props) {
  // TODO : get step data
  const classes = useStyle();

  const  step = props.step;
  const [activeStep, setActiveStep] = useState(0);
  const maxStep = 3;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
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
      <MobileStepper className={classes.stepper}
        
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
    </Container>
  )
}