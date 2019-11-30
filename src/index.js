import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PokemonCards from "./components/PokemonCards";
import Pokemon from "./components/Pokemon";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <Switch>
              <Route path="/" exact component={PokemonCards} />
              <Route path="/pokemon/:id" component={Pokemon} />
              <PokemonCards />
              <Pokemon />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
