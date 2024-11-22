import { Carousel } from 'react-bootstrap';
import carousel from '@/assets/carousel.jpg';
import carousel2 from '@/assets/carousel2.jpg';
import carousel3 from '@/assets/carousel3.jpg';
import "./CarouselImage.css";

const CarouselComponent = () => {
  return (
    <Carousel className='carousel-images'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel}
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h3>Birinci Slayt</h3>
          <p>Bu birinci slaytın açıklamasıdır.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel2}
          alt="Second slide"
        />
        <Carousel.Caption>
          {/* <h3>İkinci Slayt</h3>
          <p>Bu ikinci slaytın açıklamasıdır.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel3} 
          alt="Third slide"
        />
        <Carousel.Caption>
          {/* <h3>Üçüncü Slayt</h3>
          <p>Bu üçüncü slaytın açıklamasıdır.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
