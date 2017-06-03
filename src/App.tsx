import * as React from 'react';
import {Button, Grid, Jumbotron} from "react-bootstrap";
import {Navigation} from "./Components/Navbar";

class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div className="App">
          <Navigation/>
          <Grid>
              <Jumbotron>
                  <h1>Hello, world!</h1>
                  <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                  <p><Button bsStyle="danger">Learn more</Button></p>
                  <i className="fa fa-user-circle-o fa-5x"/> fa-5x
              </Jumbotron>
          </Grid>
      </div>
    );
  }
}

export default App;
