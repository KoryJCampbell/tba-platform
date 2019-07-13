import React, { Component, lazy } from 'react';
import { Button, Card, CardBody, Container, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';
const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))

class Event extends Component {  
  constructor(props) {
  super(props);

  this.state = {
    isOpen: false,
    collapse: false,
    gaCount: 0,
    quantity:0,
    fadeIn: false
  };
  this.toggle = this.toggle.bind(this);
  this.handleDecrement = this.handleDecrement.bind(this)
  this.handleIncrement = this.handleIncrement.bind(this)
  this.handleChange = this.handleChange.bind(this)
}
  handleIncrement(e, type) {
    this.setState({ 
      gaCount: this.state.gaCount + 1,
      fadeIn: true
    })
  }
  handleDecrement(e, type) {
    if (this.state.gaCount >= 1)
    this.setState({ 
      gaCount: this.state.gaCount - 1})

  }
  handleChange(e , another) {
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {

    return (
      <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TBA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Search</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="app flex-row align-items-center">
        <Container>
        <Jumbotron>
          <Media width="100%" src="https://chickenandmumbosauce.com/static/img/930-recap/IMG_8163.jpg"/>
          <br />
          <h1>Chicken & Mumbo Sauce</h1> 
          <Collapse isOpen={this.state.collapse}>                      
              <h4>Tickets</h4>
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <tbody>
                  <tr>
                    <td>
                      <div>General Admission</div>
                      <div className="small text-muted">
                        <span>One (1) Drink Ticket</span> 
                      </div>
                    </td>
                    <td>
                      <div>$15 </div>
                      <div className="small text-muted">
                        <span>+ 2.45 Fee</span> 
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="ticket-quantity-input">
                        <span onClick={(e) => this.handleDecrement(e,"ga")}>-</span>
                          <input class="quantity" type="text" 
                          value={this.state.gaCount}  
                          onChange={(e) => this.handleChange(e, "ga")} />
                        <span onClick={(e) => this.handleIncrement(e,"ga")}>+</span>
                      </div> 
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Collapse>
            <br />
          <Row>
            <Col>
              <p>Over the past ten years through ground-breaking collaborations with the likes of Jay-Z, Kanye West and Kendrick Lamar to name a few, the Louisiana native has built an undeniable legacy in the ruthless world of hip-hop. His heavy-weight flow packs a viciously memorable punch, yet it's the man's versatility that sets him apart from the rest with his ability to hammer a Just Blaze beat just as impressive as his dreamy collaborations with Ceelo Green and Erykah Badu, or his mind-blowing verse on Chance The Rapper's Coloring Book.
                <br /> <br /> Presented by Freshly Breemed.
                <br /><br />  This is a 21+ event (under 18s must be accompanied by an adult).</p>
          </Col>
          <Col>
            <p> 
              <i className="icon-location-pin icons font-2x lmt-4"></i>
              <div>9:30 Club</div>
              <p className="text-muted">815 V St NW <br />Washington, DC 20001</p>
            </p>
            <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted"> Doors open at 10pm </p></p>
            <p className="lead">$15.00</p>
            <hr className="my-2" />
            <Button color="secondary" size="lg" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Tickets</Button>
            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
              {/* <Button color="success" size="lg" style={{ marginBottom: '1rem' }}>Checkout</Button> */}
              <StripeCheckout />

            </Fade>
          </Col>
          </Row>
        </Jumbotron>

        </Container>
      </div>
      </div>
    );
  }
}

export default Event;
