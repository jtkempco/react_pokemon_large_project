import React, { Component } from "react";
import PokemonCard from "../PokemonCard";

class PokemonCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //this.fetch(this.state.pokemon.id);
  }

  render() {
    return (
      <div class="row">
        <div class="col-3 col-md-4">
          {this.props.cards.map((card, index) => {
            return <PokemonCard />;
          })}
        </div>
      </div>
    );
  }
}

export default PokemonCards;
