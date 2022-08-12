import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="outlet">
      <h1>About us</h1>
      <hr />
      <br />
      <div className="frame-center">
        <div className="frame-80">
          <div className="frame-text_center">
            <h3>Welcome to Bookworm</h3>
          </div>
          <br />
          <p>
            Bookworm is an independent New York bookstore and language school
            with locations in Manhattan and Brooklyn. We specialize in travel
            books and language classes.
          </p>
          <br />
          <div className="frame-flex">
            <div className="column margin-right">
              <h1>Our Story</h1>
              <br />
              <p>
                The name Bookworm was taken from the original name for New York
                International Airport, which was renamed JFK in December 1963.
              </p>
              <br />
              <p>
                Our Manhattan store has just moved to the West Village. Our new
                location is 170 7th Avenue South, at the corner of Perry Street.
              </p>
              <br />
              <p>
                Rrom March 2008 through May 2016, the store was located in the
                Flatiron Distric
              </p>
            </div>
            <div className="column">
              <h1>Our Vision</h1>
              <br />
              <p>
                One of the last travel bookstores in the country, our Manhattan
                store carries a range of guidebooks (all 10% off) to suit the
                needs and tastes of every traveller and budget.
              </p>
              <br />
              <p>
                We believe that a novel or travelogue can be just as valuable a
                key to a place as any guidebook, and our well-read,
                well-travelled staff is happy to make reading recommendations
                for any traveller, book lover, or gift giver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
