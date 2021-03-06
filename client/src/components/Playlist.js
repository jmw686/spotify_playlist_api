import React, { Component } from 'react';
import '../css/Playlist.css';
import NavLink from './NavLink'
import Api from './Api'
let spotify_api;

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user,
      token: this.props.token,
      playlist: this.props.id,
      image: this.props.cover,
      tracks: [],
      spotify: this.props.Spotify
    }
    spotify_api = this.props.Spotify;
    console.log(this.state.image);
    this.getTracks();
  }
  getTracks() {
    // console.log(this.state.id + ' : ' );
    this.state.spotify.getPlaylistTracks(this.state.id, this.state.playlist)
      .then((response) => {
        let temp = [];
        // console.log(response);
        for (let i = 0; i < response.items.length; i++) {
          const el = response.items[i];
          temp.push(el.track.name + ': ' + el.track.artists[0].name);
          // console.log(el.track.name + ': ' + el.track.artists[0].name);
        }
        this.setState({
          tracks: [ ...temp],
          spotify: this.state.spotify
        })
      })
  }
  render() {
    return (
      <div className="Playlist" >
        <NavLink to={this.state.token +'/' + this.state.id + '/p/' + this.state.playlist} > api </NavLink>
        <img src={this.state.image} alt={this.state.playlist}/>
        {/* {this.state.tracks.map(function(name, index) {
          return <li key={ index }> {name} </li>
        })} */}
      </div>
    );
  }
}

export default Playlist;
