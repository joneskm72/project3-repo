import React, { useContext, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { ArtistsContext } from "../../utils/ArtistsContext";
import { TracksContext } from "../../utils/TracksContext";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from '../../components/Form';
import { Card } from '../../components/Card';
import Spotify from "../../utils/Spotify";

function Dashboard() {
  const { artistInfoArray, setArtistInfoArray }  = useContext(ArtistsContext);
  const { tracksInfoArray, setTracksInfoArray } = useContext(TracksContext);

  const [redirectTo, setRedirectTo] = useState(null);

  const [searchObject, setSearchObject] = useState({
    type: "",
    query: ""
  })

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submit!!!!");
    console.log(event.target.value);  
    console.log(searchObject);
    Spotify.search(searchObject)
      .then(res => {
        if (searchObject.type === "artist") {
          console.log(res.artists.items);
          setArtistInfoArray(res.artists.items);
          setRedirectTo('/artists');
        } else  {
          // This is for tracks
          setTracksInfoArray(res.tracks.items);
          setRedirectTo('/tracks');
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (event) => {
		setSearchObject({
      ...searchObject,
			[event.target.name]: event.target.value
    });
    console.log(event.target.name + ": " + event.target.value);
  };
  

  if (redirectTo) {
    return <Redirect to={{ pathname: redirectTo }} />
  } else {
    return (
      <Container>
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-6">
          <Card title="Welcome Search Page!">
            <form style={{marginTop: 10}}>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Select Search Type</label>
                <select name="type"  onChange={handleChange} className="form-control" id="exampleFormControlSelect1">
                  <option value="" defaultValue>Select an option</option>
                  <option value="artist">Artist</option>
                  <option value="tracks" >Tracks</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="search-option">Search option</label>
                <input 
                  type="query" 
                  name="query"
                  placeholder="Artist name for artist/song for track"
                  value={searchObject.query}
                  onChange={handleChange}
                  className="form-control" id="artistOrTrack" placeholder="Artist name for artist/song for track"></input>
              </div>
              <FormBtn onClick={handleFormSubmit}>Search</FormBtn>
            </form>
            </Card>
          </Col>
          <Col size="md-3"></Col>
        </Row>
      </Container>
    );      
  }
  }
  export default Dashboard;