import React, { Component } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Badge,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Progress
} from "reactstrap";

const TYPE_COLORS = {
  bug: "#F44336",
  dark: "#263238",
  dragon: "#9C27B0",
  electric: "#2962FF",
  fairy: "#E91E63",
  fighting: "#FF1744",
  fire: "#FF1744",
  flying: "#1A237E",
  ghost: "#D500F9",
  grass: "#8BC34A",
  ground: "#4E342E",
  ice: "#E3F2FD",
  normal: "#FF6D00",
  poison: "#9C27B0",
  psychic: "#009688",
  rock: "#795548",
  steal: "#607D8B",
  water: "#03A9F4"
};

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      imageUrl: "",
      types: [],
      description: "",
      stats: [],
      height: "",
      weight: ""
    };
  }

  async componentDidMount() {
    //get index
    const { id } = this.props.match.params;

    console.log(this.props.match.params);

    //urls
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    const pokemonRes = await axios.get(pokemonUrl);

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
      }
    });

    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name}`
          .toLocaleLowerCase()
          .split(" ")
          .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
          .join(" ");
      })
      .join(", ");

    //conver decimals to feet
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;

    //conver decimals to feet
    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities.map(
      ability => ability.ability.name
    );

    const imageUrl = pokemonRes.data.sprites.front_default;
    const name = pokemonRes.data.name;

    //const stats = { hp, attack, defense, speed, specialAttack, specialDefense };

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);
      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map(group => {
          return group.name
            .toLocaleLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
      //console.log(this.state);
    });
    this.setState({
      id,
      name,
      types,
      imageUrl,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs
    });
  }

  render() {
    return (
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col xs="5">
                <h5 className="float-left">{this.state.id}</h5>
              </Col>
              <Col xs="7">
                <div className="float-right">
                  {this.state.types.map(type => {
                    return (
                      <Badge
                        key={type}
                        style={{
                          backgroundColor: TYPE_COLORS[type],
                          color: "white"
                        }}
                        className="mr-1"
                      >
                        {type
                          .toLocaleLowerCase()
                          .split(" ")
                          .map(
                            letter =>
                              letter.charAt(0).toUpperCase() +
                              letter.substring(1)
                          )
                          .join(" ")}
                      </Badge>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="3">
                <CardImg
                  className="card-img-top rounded mx-auto mt-2"
                  src={this.state.imageUrl}
                />
              </Col>
              <Col md="9">
                <CardTitle
                  style={{
                    "font-size": "1.5rem",
                    "text-transform": "capitalize"
                  }}
                  className="text-left"
                >
                  {this.state.name}
                </CardTitle>
                <Row>
                  <Col className="text-left" md="3">
                    HP
                  </Col>
                  <Col md="9">
                    <Progress value={this.state.stats.hp}>
                      {this.state.stats.hp}
                    </Progress>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-left" md="3">
                    Attack
                  </Col>
                  <Col md="9">
                    <Progress value={this.state.stats.attack}>
                      {this.state.stats.attack}
                    </Progress>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-left" md="3">
                    Defense
                  </Col>
                  <Col md="9">
                    <Progress value={this.state.stats.defense}>
                      {this.state.stats.defense}
                    </Progress>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-left" md="3">
                    Speed
                  </Col>
                  <Col className="col-12" md="9">
                    <Progress value={this.state.stats.speed}>
                      {this.state.stats.speed}
                    </Progress>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-left" md="3">
                    Special Attack
                  </Col>
                  <Col md="9">
                    <Progress value={this.state.stats.specialAttack}>
                      {this.state.stats.specialAttack}
                    </Progress>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-left" md="3">
                    Special Defense
                  </Col>
                  <Col md="9">
                    <Progress value={this.state.stats.specialDefense}>
                      {this.state.stats.specialDefense}
                    </Progress>
                  </Col>
                </Row>
              </Col>
              <Row className="mt-1">
                <Col>
                  <CardText className="p-4">{this.state.description}</CardText>
                </Col>
              </Row>
            </Row>
          </CardBody>
          <hr />
          <CardBody>
            <CardTitle>
              <h5>Profile</h5>
            </CardTitle>

            <Row>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Height:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.height} ft.</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Weight:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.weight} lbs.</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.catchRate}%</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </Col>
                  <Col md="6">
                    <Progress value={this.state.genderRatioMale}>
                      {this.state.genderRatioMale}
                    </Progress>
                  </Col>
                </Row>
              </Col>
              <Col md="6">
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.eggGroups}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.hatchSteps}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">Abilities:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <h6 className="float-right">EVs:</h6>
                  </Col>
                  <Col md="6">
                    <h6 className="float-left">{this.state.evs}</h6>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="text-muted">Footer</CardFooter>
        </Card>
      </Col>
    );
  }
}

export default Pokemon;
