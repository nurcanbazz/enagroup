import Card from 'react-bootstrap/Card';
import { Carousel } from 'react-bootstrap';
import './CardGroup.css';

function CardGroup() {
  return (
    <Carousel className="carousel-cards"  interval={2000} controls={true} indicators={false} pause="hover">
      {/* İlk Slide */}
      <Carousel.Item>
        <div className="card-container">
          <Card className="custom-card">
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJa2y6P-aA1vEBr8qt3K2_l2lMbnlFpHyQtA&s" />
            <Card.Body>
              <Card.Title>BMW</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://experix.com.tr/wp-content/uploads/2022/06/Volswagen-Logosu.png" />
            <Card.Body>
              <Card.Title>Volkswagen</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://experix.com.tr/wp-content/uploads/2022/06/BMW-Logosu-ve-Anlami.jpg" />
            <Card.Body>
              <Card.Title>Audi</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/toyota-logo.png" />
            <Card.Body>
              <Card.Title>Toyota</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/ford-logo-2003.png" />
            <Card.Body>
              <Card.Title>Ford</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Carousel.Item>

      {/* İkinci Slide */}
      <Carousel.Item>
        <div className="card-container">
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/honda-logo.png" />
            <Card.Body>
              <Card.Title>Honda</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/nissan-logo.png" />
            <Card.Body>
              <Card.Title>Nissan</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/chevrolet-logo.png" />
            <Card.Body>
              <Card.Title>Chevrolet</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/kia-logo.png" />
            <Card.Body>
              <Card.Title>Kia</Card.Title>
            </Card.Body>
          </Card>
          <Card className="custom-card">
            <Card.Img variant="top" src="https://www.carlogos.org/car-logos/hyundai-logo.png" />
            <Card.Body>
              <Card.Title>Hyundai</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CardGroup;
