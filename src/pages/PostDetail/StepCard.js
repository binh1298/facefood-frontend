import { Button, Card, CardContent, CardMedia, Container, makeStyles, MobileStepper, Typography } from "@material-ui/core";
import React, { useState } from 'react';

const useStyle = makeStyles(theme => ({
  card: {
    width: "100%",
    innerHeight: "100%",
    display: "inline-block",
  },
  media: {
    width: "100%",
    minHeight: "40%",
    height: "40%",
    paddingTop: '50%',
    display: "flex",
  },
  content: {
    padding: 20,
    display: "inline-block",
    minHeight: 100,
    width: "95%",
    height: 100,
    overflow: "auto",
  },
  stepper:{
    
  }
}));

export function StepCard(props) {

  const classes = useStyle();

  const  steps = props.steps;
  const [activeStep, setActiveStep] = useState(0);
  const maxStep = steps.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    console.log(steps);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  return (
    <Container className={props.className}>
      <Card className={classes.card} variant="outlined">
        <CardMedia className={classes.media}
          image={`https://i.picsum.photos/id/579/536/354.jpg`}
          title="test"
        />
        <CardContent className={classes.content}>
          <Typography>
            {steps[activeStep].description}
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