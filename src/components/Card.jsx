import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Card.css";

// Data genrated with chatGPT
const Card = () => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div className="card h-100">
            <img
              src="https://www.destguides.com/dynamic-files/itinerary/1239/background-image.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Paris, France</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: ORY</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Eiffel Tower, Louvre Museum & Notre-Dame Cathedral
              </h6>
              <p className="card-text">
                Paris, the City of Lights, exudes romance and charm with its
                elegant landmarks, delectable cuisine, and artistic treasures at
                every corner.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g187147-Paris_Ile_de_France-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://images.unsplash.com/photo-1590141187901-91517156b553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3lkbmV5JTIwb3BlcmElMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Sydney, Australia</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: SYD</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Sydney Opera House, Bondi Beach & The Rocks
              </h6>
              <p className="card-text">
                Sydney, the sparkling harbor city, combines stunning beaches,
                cultural diversity, and a laid-back vibe, making it a paradise
                for adventure seekers and culture enthusiasts alike.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g255060-Sydney_New_South_Wales-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://www.godsavethepoints.com/wp-content/uploads/2017/07/tokyo-mount-fuji.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Tokyo, Japan</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: HND</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Tokyo Skytree, Shibuya Crossing & Meiji Shrine
              </h6>
              <p className="card-text">
                Tokyo, a futuristic metropolis where tradition and technology
                harmoniously coexist, beckons travelers with its neon-lit
                streets and exquisite cultural experiences.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g298184-Tokyo_Tokyo_Prefecture_Kanto-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://media.architecturaldigest.com/photos/56f4781d904aa1ac0ac47256/master/w_6048,h_4032,c_limit/Cristo%20Redentor.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Rio de Janeiro, Brazil</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: GIG</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Christ the Redeemer, Copacabana Beach & Sugarloaf Mountain
              </h6>
              <p className="card-text">
                Rio de Janeiro, the Cidade Maravilhosa (Marvelous City),
                captivates with its samba rhythms, breathtaking landscapes, and
                the infectious joy of its people, making it an unforgettable
                destination.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g303506-Rio_de_Janeiro_State_of_Rio_de_Janeiro-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://worldstrides.com/wp-content/uploads/2015/08/Madrid-and-Barcelona-min.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Barcelona, Spain</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: BCN</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Sagrada Família, Park Güell & La Rambla
              </h6>
              <p className="card-text">
                Barcelona, a Mediterranean gem, enchants visitors with its
                architectural wonders, vibrant street life, and a palpable sense
                of creativity and passion.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g187497-Barcelona_Catalonia-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://afar.brightspotcdn.com/dims4/default/4f4de46/2147483647/strip/true/crop/1440x720+0+0/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2Fa0%2Ff5%2Faedfb9554320b0f41a4d72505094%2Fsouthafrica-marcreation-unsplash.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Cape Town, South Africa</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: CPT</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Table Mountain, Robben Island & V&A Waterfront
              </h6>
              <p className="card-text">
                Cape Town, where the majestic Table Mountain meets the vast
                Atlantic Ocean, captivates visitors with its dramatic
                landscapes, diverse culture, and rich history.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g1722390-Cape_Town_Western_Cape-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt3bac7d2fc76ad802/61bae72bd628d527ff44041c/US_Bangkok_TH_Header.jpg?width=1680&quality=70&auto=webp"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Bangkok, Thailand</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: BKK</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Grand Palace, Wat Pho & Chatuchak Weekend Market
              </h6>
              <p className="card-text">
                Bangkok, the bustling capital of Thailand, dazzles the senses
                with its ornate temples, bustling markets, and a vibrant street
                life that never fails to leave a lasting impression.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g293916-Bangkok-Vacations.html"
                target="_blank"
                className="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img
              src="https://www.worldatlas.com/upload/78/b0/71/shutterstock-1414639229.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">New York City, USA</h5>
              <h6 className="card-subtitle mb-2">Nearest airport: JFK</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Statue of Liberty, Times Square & Central Park
              </h6>
              <p className="card-text">
                New York City, the city that never sleeps, pulsates with energy,
                diversity, and a constant sense of adventure, drawing visitors
                from all walks of life.
              </p>
              <a
                href="https://www.tripadvisor.com/Tourism-g60763-New_York_City_New_York-Vacations.html"
                target="_blank"
                className ="btn btn-primary mt-auto"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
