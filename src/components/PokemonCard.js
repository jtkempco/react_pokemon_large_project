import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Card,
  CardHeader,
  CardImg,
  /*CardBody,*/
  CardTitle
} from "reactstrap";

import spinner from "../assets/spinner.gif";
import styled from "styled-components";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      id: "",
      imageLoading: true,
      tooManyRequests: false
    };
  }

  componentDidMount() {
    const { name, url } = this.props;
    const id = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`;
    this.setState({
      name,
      imageUrl,
      id
    });
  }

  render() {
    return (
      <Col md="3" sm="6" className="mb-5">
        <Link to={`pokemon/${this.state.id}`}>
          <Card>
            <CardHeader className="text-left">{this.state.id}</CardHeader>
            {this.state.imageLoading ? (
              <CardImg
                style={{ width: "3rem", height: "3rem" }}
                src={spinner}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}

            <Sprite
              className="rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ tooManyRequests: true })}
              src={this.state.imageUrl}
              style={
                this.state.tooManyRequests
                  ? { display: "none" }
                  : this.state.imageLoading
                  ? null
                  : { display: "block" }
              }
            />
            {this.state.tooManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Too Many Requests
                </span>
              </h6>
            ) : null}

            <CardBody className="mx-auto">
              <CardTitle>
                {this.state.name
                  .toLocaleLowerCase()
                  .split(" ")
                  .map(
                    letter =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")}
              </CardTitle>
            </CardBody>
          </Card>
        </Link>
      </Col>
    );
  }
}

export default PokemonCard;
