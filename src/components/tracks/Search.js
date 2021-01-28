import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    Track_Title: "",
  };

  changeTitle = (e) => {
 
    this.setState({Track_Title: e.target.value });

  };

  finder = (dispatch,e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.Track_Title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) =>{
         
       dispatch({ type: "SEARCH", payload: res.data.message.body.track_list })
       this.setState({Track_Title:''})
      }
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-5">
              <h1 className="text-center mt-2">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <div className="text-center mb-4">
                Get the Lyrics for any song
              </div>
              <form onSubmit={this.finder.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Song title..."
                    name="Track_Title"
                    value={this.state.Track_Title}
                    onChange={this.changeTitle}
                  />
                  <button
                    type="submit"
                    className="form-control btn-block btn-primary"
                  >
                    Get songs
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
