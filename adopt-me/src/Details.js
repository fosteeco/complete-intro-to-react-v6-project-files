import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";

class Details extends Component {
  state = { loading: true };

  //   constructor() {
  //     super();

  //     this.state = { loading: true};
  //   }

  // Life cycle methods

  // Runs when it's first created
  async componentDidMount() {
    // functional component would use a hook to get this
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    // this.setState(
    //   Object.assign(
    //     {
    //       loading: false,
    //     },
    //     json.pets[0]
    //   )
    // );
    this.setState({
      loading: false,
      name: json.pets[0].name,
      breed: json.pets[0].breed,
      animal: json.pets[0].animal,
      city: json.pets[0].city,
      state: json.pets[0].state,
      description: json.pets[0].description,
      images: json.pets[0].images,
    });
  }
  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <p>{description}</p>
          <button>Adopt {name}</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
