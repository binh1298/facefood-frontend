import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Container } from "@material-ui/core";

export default function Login() {
  return (
    <React.Fragment>
      <Container>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="username" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </Container>
    </React.Fragment>
  );
}
