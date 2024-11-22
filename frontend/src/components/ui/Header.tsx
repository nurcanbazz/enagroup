import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        {/* Logo Kısmı */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="/path-to-logo.png"
            alt="Oto Yedek Parça Logo"
            className="logo-img"
          />
          {/* <span className="ms-2">Oto Yedek Parça</span> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Menü Kısmı */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Ana Sayfa</Nav.Link>
            <Nav.Link href="/ürün-listesi">Arama</Nav.Link>
            <NavDropdown title="Sipariş" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/sepet">Sepet</NavDropdown.Item>
              <NavDropdown.Item href="/bekleyen-sipariş">Onay Bekleyen Siparişler</NavDropdown.Item>
              <NavDropdown.Item href="/onaylanmış-sipariş">Onaylanmış Siparişler</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>

          {/* <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Arama"
              className="me-2"
              aria-label="Arama"
            />
            <Button variant="outline-success">Ara</Button>
          </Form> */}

          {/* Sepet İkonu ve Satış Temsilcisi Bilgisi */}
          <div className="d-flex align-items-center">
            <Nav.Link href="/sepet" className="me-3">
              <FaShoppingCart size={24} />
            </Nav.Link>

            <div className="me-3 text-end">
              <p className="mb-0">Satış Temsilcisi:</p>
              <p className="mb-0">Cep: 0555 000 00 00</p>
            </div>

            {/* Çıkış İkonu */}
            <Nav.Link href="/login">
              <FaSignOutAlt size={24} />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
