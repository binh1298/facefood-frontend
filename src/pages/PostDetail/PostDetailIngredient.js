import { Grid, Typography } from "@material-ui/core";
import React from "react";

export default function PostDetailIngredient(props) {
  // let renderComment = props.comments.map((cmt) =>{
  //   <Typography><Link>{cmt.username} </Link>{cmt.content} asdfasdf </Typography>
  // })
  // return {renderComment}
  const ingredients = props.ingredients;

  const renderIngredientsName = ingredients.map((ing) => {
    return <Typography key={ing.ingredientId}>{ing.ingredientName}</Typography>
  });

  const renderIngredientsValue = ingredients.map((ing) => {
    return <Typography key={ing.ingredientId}>{ing.value} {" " + ing.unitName}</Typography>
  });

  return (
    <>
      <Grid item xs={7}>
        {renderIngredientsName}
      </Grid>
      <Grid item xs={5}>
        {renderIngredientsValue}
      </Grid>
    </>
  );
}
