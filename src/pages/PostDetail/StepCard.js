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
    <Container className={props.className}>
      <Card className={classes.card} variant="outlined">
        <CardMedia className={classes.media}
          image="https://i.picsum.photos/id/863/536/354.jpg"
          title="test"
        />
        <CardContent className={classes.content}>
          <Typography>
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
            test content, step detailed guide will display here,
          </Typography>
        </CardContent>
      </Card>
      <MobileStepper className={classes.stepper}
        
        steps= {4}
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