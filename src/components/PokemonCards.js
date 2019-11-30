import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import axios from "axios";
import PokemonCard from "./PokemonCard";

class PokemonCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=400",
      pokemon: null
    };
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
    console.log(JSON.stringify(this.state.pokemon));
  }

  render() {
    return (
      <Fragment>
        {this.state.pokemon ? (
          <Row>
            {this.state.pokemon.map((pokemon, index) => {
              return (
                <PokemonCard
                  name={pokemon.name}
                  url={pokemon.url}
                  key={index}
                />
              );
            })}
          </Row>
        ) : (
          <h1>Loading...</h1>
        )}
      </Fragment>
    );
  }
}

export default PokemonCards;
