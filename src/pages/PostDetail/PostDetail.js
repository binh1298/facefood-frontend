import React, { Fragment } from 'react';
import { StepCard } from './StepCard';
import { makeStyles, useTheme, Container, Grid, Card, CardContent, CardHeader, Typography, Link, Button, Divider, Box } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  root: {
    marginLeft: "10%",
    maxWidth: "75%",
    maxHeight: "75%",
    height: "500px",
  },
  right: {
    marginTop: "15%",
    height: "50px",
  },
  left: {
    marginTop: "8%",
  },
  username: {
    color: "primary",
  },
  removeButton: {
    marginTop: "1%",
    float: "right",
  },
  summary: {
    right: "0px",
  },
  comment: {
    paddingTop: "10%",
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
    img: "https://www.thespruceeats.com/thmb/Yie_jVHJlEVu5hack-nZz6wXjeM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Steak2-5ac2c5f504d1cf0037cb2f0e.jpg",
    content: "Once you have your steak, lightly coat it with oil. Choose an oil with a high smoke point, as oil breaks down at high temperatures. Oils like avocado oil can take a much higher temperature than most.",
  },
  {
    img: "https://www.thespruceeats.com/thmb/sWtv6bBm5seBrOnnPOVjCiC_A3A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Steak7-5ac2c668c673350037bf955b.jpg",
    content: "Now it's time to season the steak. Typically, this includes coarsely ground black pepper and a coarse sea or Kosher salt. The oil is going to hold the seasonings in place and if you choose to make a sauce in the pan later, this will provide the extra flavor.",
  },
  {
    img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2007/1/2/0/valentines_steak.jpg.rend.hgtvcom.826.620.suffix/1557859049553.jpeg",
    content: "Place the steak in the center of the hot skillet. It is important that most of the steak is in contact with the metal as possible, so never use a steak bigger than your pan.",
  }
]

const cmt = [
  {
    name: "Selina",
    text: "Now principles discovered off increasing how reasonably middletons men. Add seems out man met plate court sense. His joy she worth truth given. All year feet led view went sake",
  },
  {
    name: "Joseph B",
    text: "Why end might ask civil again spoil.",
  },
  {
    name: "Liesje Noach",
    text: "Omgeving er op afgetapt in plantage kapitaal baksteen bordeaux",
  },
  {
    name: "Rino Saveria",
    text: "Semplici volgersi hai sua indietro lei.",
  },

]


export default function PostDetail(props) {
  const theme = useTheme();
  const classes = useStyle();

  const listCmt = cmt.map((x) => {
    return (
      <Typography style={{ paddingBottom: 4 }}>
        <Link className={classes.username}>
          {x.name}:{' '}
        </Link>
        {x.text}
      </Typography>
    );

  });
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={7} className={classes.left}>
        <Typography variant="h3">
          {detail.title} <Button color="primary" variant="outlined" className={classes.removeButton}>Remove</Button>
        </Typography>
        <Typography variant="subtitle1">
          {detail.category}
        </Typography>
        <StepCard detail={detail} step={step} />
      </Grid>
      <Grid item xs={5} className={classes.right}>
        <Container>
          <Typography variant="h6" className={classes.summary}>
            Likes: {detail.Likes}    Comments: 4
        </Typography>
        </Container>
        <Box className={classes.comment}>
          {listCmt}
        </Box>

      </Grid>
    </Grid>

  );
}