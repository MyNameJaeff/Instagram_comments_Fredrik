import React from "react";
import Comments from "./Comments";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.posts }));
    console.log(this.data);
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {this.state.data.map((element) => (
          <div key={element.id} className="card" style={{ width: "18rem" }}>
            <img src={element.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{element.title}</h5>
              <p className="card-text">{element.content}</p>
            </div>
            <hr></hr>
            <div>
              <p>{console.log(element)}</p>
              <Comments />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
