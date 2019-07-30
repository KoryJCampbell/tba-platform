import React, { Component } from 'react';
import { Button, CardHeader, Card, CardBody, CardFooter, FormGroup, Label, FormText, Badge,Col, Table, Container, Collapse, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete';
const valid = require('us-bank-account-validator');
class PayoutCreate extends Component {

  constructor(props){
    super(props);
    this.state = {
      routingNumber: '',
      bankAccountNumber: '',
      validRouting: '',
      validAccount: '',
      fullName: '',
    }
    this.validateAccount = this.validateAccount.bind(this)
    this.validateRouting = this.validateRouting.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  validateRouting(){
    var routingValidation = valid.routingNumber(this.state.routingNumber);
    console.log(routingValidation)
    if (routingValidation.isValid) {
      this.setState({validRouting: 'is-valid'},()=>console.log(this.state))
    } else if (!routingValidation.isPotentiallyValid) {
      this.setState({validRouting: 'is-invalid'},()=>console.log(this.state))
    }
  }
  validateAccount(){
    const accountValidation = valid.accountNumber(this.state.routingNumber);
    console.log(accountValidation)
    if (accountValidation.isValid) {
      this.setState({validAccount: 'is-valid'},()=>console.log(this.state))
    } else if (!accountValidation.isPotentiallyValid) {
      this.setState({validAccount: 'is-invalid'},()=>console.log(this.state))
    }
  }

  handleChange(e){
    let change = {}
    change[e.target.name] = e.target.value
    this.setState({...change},()=>console.log(this.state))
    if (e.target.name === 'routingNumber'){
      this.validateRouting()
    }
    if (e.target.name === 'accountNumber'){
      this.validateAccount()
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/bank-account',
      data: {
          "bankInfo": {...this.state}
      },
    }).then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  render() {
    const { validRouting, validAccount} = this.state
    console.log(...validRouting)
    console.log(...validAccount)
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12">

        <Card>
          <CardHeader>
            <strong>Payout Settings</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="number-input">Full Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="text-input" onChange={this.handleChange} name="fullName" required/>
                  <FormText color="muted">Enter full name connected to bank account</FormText>
                </Col>
              </FormGroup>
              
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="number-input">Routing Number</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input className={validRouting} type="text" id="text-input" onChange={this.handleChange} name="routingNumber" required/>
                  <FormText color="muted">Enter a valid routing number</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="number-input">Account Number</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input className={validAccount}  type="text" id="text-input" onChange={this.handleChange} name="accountNumber" required/>
                  <FormText color="muted">Enter a valid account number</FormText>
                </Col>
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
            <Button onClick={this.handleSubmit} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
          </CardFooter>
        </Card>
        
        </Col>
      </Row>
    </div>
    
    );
  }
}

export default PayoutCreate;
