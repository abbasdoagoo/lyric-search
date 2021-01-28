import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import axios from "axios";
import {Link} from 'react-router-dom'

class Lyrics extends Component {
  state = {
    Lyric_body: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        this.setState({ Lyric_body: res.data.message.body.lyrics.lyrics_body });
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.Lyric_body === undefined || this.state.Lyric_body === "") {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
         <Link to="/" className="text-decoration-none">
         <i className="fas fa-arrow-alt-circle-left mb-4"></i>
          <strong> Go Back</strong>
           </Link> 
          <div className="card">
            <div className="card-body">
              <p className="card-text">{this.state.Lyric_body}</p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
