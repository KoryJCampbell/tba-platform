import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    console.log("baby"+this.props.metadata)
    const body = {
        amount: this.props.metadata.total,
        token: token,
        metadata: this.props.metadata
    }
    console.log(body)
    axios.post('/ticket', body).then(response => {
        window.location = '/confirmation?email='+response.data.token.email
        console.log(response)
    }).catch(error =>{
        console.log("Payment Error: ", error);
        alert("There was an issue with your payment. Please try again later")
    })
  };

  render() {
    return (
      <StripeCheckout
        stripeKey={process.env.STRIPE_CLIENT_PROD}
        token={this.onToken}
        amount={this.props.metadata.total*100}
        billingAddress={true}
        description="Chicken & Mumbo Sauce"
        // image="/static/img/graph.png"
        locale="auto"
        name="Crank Karaoke"
      />
    ) 

  }
}