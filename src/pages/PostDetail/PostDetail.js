import React, { Fragment } from 'react';
import { StepCard } from './StepCard';
import { makeStyles, useTheme, Container, Grid, Card, CardContent, CardHeader, Typography, Link, Button } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    marginLeft: "10%",
    maxWidth: "80%",
  },
  comment: {
    marginTop: "15%",
  },
  card: {
    marginTop: "8%",
  },
  username: {
    color: "primary",
  },
  removeButton:{
    marginTop: "1%",
    float: "right",
  }
}));

const detail = {
  title: "Yummy Steak",
  creator: "Loc",
  category: "Main dish",
  Likes: 7,
}

const step = [
  {
    img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/1/2/0/valentines_steak.jpg.rend.hgtvcom.826.620.suffix/1557859049553.jpeg",
    content: "Once you have your steak, lightly coat it with oil. Choose an oil with a high smoke point, as oil breaks down at high temperatures. Oils like avocado oil can take a much higher temperature than most.",
  },
  {
    img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/1/2/0/valentines_steak.jpg.rend.hgtvcom.826.620.suffix/1557859049553.jpeg",
    content: "Now it's time to season the steak. Typically, this includes coarsely ground black pepper and a coarse sea or Kosher salt. The oil is going to hold the seasonings in place and if you choose to make a sauce in the pan later, this will provide the extra flavor.",
  },
  {
    img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/1/2/0/valentines_steak.jpg.rend.hgtvcom.826.620.suffix/1557859049553.jpeg",
    content: "Place the steak in the center of the hot skillet. It is important that most of the steak is in contact with the metal as possible, so never use a steak bigger than your pan.",
  }
]

const cmt = [
  {
    name: "Person a",
    text: "2Lorem ipsum dolor sit amet, nullam posuere nec",
  },
  {
    name: "Person b",
    text: "2Lorem ipsum dolor sit amet, nullam posuere nec. Neque mauris",
  },
  {
    name: "Person c",
    text: "2Lorem amet, nullam posuere nec. Neque mauris mauris, ac turpis nec",
  },
  {
    name: "Person d",
    text: "2Lorem ipsum dolor sit amet, nullam posuere nec",
  }
]


export default function PostDetail(props) {
  const theme = useTheme();
  const classes = useStyle();

  const listCmt = cmt.map((x) => {
    return (
      <Typography style={{paddingBottom: 4}}>
        <Link className={classes.username}>
          {x.name}:{' '}
        </Link>
        {x.text}
      </Typography>
    );

  });
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={7} className={classes.card}>
        <Typography variant="h3">
          {detail.title} <Button color="primary" variant="outlined" className={classes.removeButton}>Remove</Button>
        </Typography>
        <Typography variant="subtitle1">
          {detail.category}
        </Typography>
          <StepCard detail={detail} step={step} />
      </Grid>
      <Grid item xs={5} className={classes.comment}>
        {listCmt}
      </Grid>
    </Grid>

  );
}