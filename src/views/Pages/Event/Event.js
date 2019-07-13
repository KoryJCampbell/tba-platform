import React, { Component } from 'react';
import { Button, Container, Col,Media,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, UncontrolledDropdown } from 'reactstrap';


class Event extends Component {  
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
    isOpen: false
  };
}

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
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
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="app flex-row align-items-center">
        <Container>
        <Jumbotron>
          <Media width="100%" src="https://chickenandmumbosauce.com/static/img/930-recap/IMG_8163.jpg"/>
          <br />
          <h1>Chicken & Mumbo Sauce</h1> 
          <Row>
            <Col>
              <p>Over the past ten years through ground-breaking collaborations with the likes of Jay-Z, Kanye West and Kendrick Lamar to name a few, the Louisiana native has built an undeniable legacy in the ruthless world of hip-hop. His heavy-weight flow packs a viciously memorable punch, yet it's the man's versatility that sets him apart from the rest with his ability to hammer a Just Blaze beat just as impressive as his dreamy collaborations with Ceelo Green and Erykah Badu, or his mind-blowing verse on Chance The Rapper's Coloring Book.
                <br /> <br /> Presented by Freshly Breemed.
                <br /><br />  This is a 21+ event (under 18s must be accompanied by an adult).</p>
          </Col>
          <Col>
            <p> 
              <i className="icon-location-pin icons font-2x lmt-4"></i>
              <p>The 9:30 Club</p>
              <p className="text-muted">815 V St NW, Washington, DC 20001</p>
            </p>
            <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted"> Doors open at 10pm </p></p>
            <p className="lead">$15</p>
            <hr className="my-2" />
            <Button color="secondary" size="lg">Tickets</Button>
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
