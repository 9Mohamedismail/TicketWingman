import React from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import video from "../assets/video.mp4";
import videoWebm from "../assets/videoWebm.webm";
import "../css/Home.css";
import logo from "../assets/ticketwingman_color.png";

function Home() {
  return (
    <div className="home">
      <img src={logo} className="logo" />
      <video muted loop autoPlay>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag. I suggest you upgrade your
        browser.
        <source src={videoWebm} type="video/webm" />
        Your browser does not support the video tag. I suggest you upgrade your
        browser.
      </video>
      <div className="overlay"></div>
      <div className="text">
        <h2>Explore the world with TicketWingman</h2>
      </div>
      <div className="searchBar">
        <SearchBar />
      </div>
      <div className="card-grid-heading">
        <h3>Popular Destinations</h3>
      </div>
      <Card />
    </div>
  );
}

export default Home;
