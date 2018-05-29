import React, { Component } from 'react';
let spotify_api;

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user,
      playlist: this.props.id,
      tracks: [],
      spotify: this.props.Spotify
    }
    spotify_api = this.props.Spotify;
    // for (let key in props) {
    //   if (props.hasOwnProperty(key)) {
    //     console.log(key + " -> " + props[key]);
    //   }
    // }
  }
  getTracks() {
    console.log(this.state.id + ' : ' );
    this.state.spotify.getPlaylistTracks(this.state.id, this.state.playlist)
      .then((response) => {
        let temp = [];
        console.log(response);
        for (let i = 0; i < response.items.length; i++) {
          const el = response.items[i];
          temp.push(el.track.name + ': ' + el.track.artists[0].name);
          console.log(el.track.name + ': ' + el.track.artists[0].name);
        }
        this.setState({
          tracks: [ ...temp],
          spotify: this.state.spotify
        })
      })
  }
  render() {
    return (
      <div className="Playlist" onClick={() => this.getTracks()}>
        {this.state.tracks.map(function(name, index) {
          return <li key={ index }> {name} </li>
        })}
      </div>
    );
  }
}

export default Playlist;
