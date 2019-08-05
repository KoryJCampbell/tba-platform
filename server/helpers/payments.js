const { json, send } = require("micro");
const stripe = require("stripe")(process.env.STRIPE_SECRET_DEV);
const axios = require("axios");
const connect = require("./db");
const redirect = require('micro-redirect')
const accountSid = 'ACb9be781cb58b923dc7d5d3a1465363ff';
const authToken = 'a4450d8dec4fd1db3a3a9498668c60e0';
const client = require('twilio')(accountSid, authToken);
var cors = require('micro-cors')()

//Send Message To User On Successful Payment of Ticket
  client.messages
  .create({
     body: 'You have successfully paid for a ticket!',
     from: '+12055399957',
     to: '+12024307929'
   })
  .then(message => console.log(message.sid));

const dispatchTicket = (token, quantity) => {
  const headers = {
    Authorization: "Token " + process.env.GUEST_PASS_KEY,
    "Content-Type": "application/json"
  };
  var tickets = []
  for (var i = 0;i<quantity;i++){
    var tix =  axios({
      method: "post",
      url: "https://app.guestmanager.com/api/public/v2/tickets",
      data: {
        ticket: {
          event_ticket_type_id: 26926,
          name: token.card.name,
          email: token.email,
          dispatch: true
        }
      },
      headers: headers
    }).then((ticket)=>{
      console.log(ticket.data)
    }).catch((err)=>{
      console.log(err)
    })
    tickets.push(tix)
  }
  return Promise.all(tickets)
};
const stripeChargeCallback = (res, token, quantity) => async (err, charge) => {
  if (err) {
    console.log(err)
    send(res, 500, { error: err });
  } else {
    // TODO: handle flow of dispatch ticket failing
    // console.log(token)
    // await dispatchTicket(token, quantity);
    redirect(res, 200, '/event/877/confirmation')
  }
};
const ticketApi = async (req, res) => {
  const data = await json(req);
  console.log(data)
  const body = {
    source: data.token.id,
    amount: data.amount,
    currency: "usd",
    metadata: data.metadata
  };
  const account = {
    stripe_account: "acct_1F3F3UEhNU9azNgf",
  }
  stripe.charges.create(body, account, stripeChargeCallback(res, data.token, data.quantity));
};
const updateAndSaveApi = async (res, list) => {

   // Connect to MongoDB and get the database
   const database = await connect()

   // Select the "tba" collection from the database
   const collection = await database.collection('eventList')
  //  console.log(list)
   const event = list
 
   // Respond with a JSON string of all users in the collection
   try {
    let result = await collection.insertMany(event)
     send(res, 200,result);
   } catch(err) {
     console.log(err)
   }
   
}
const balanceApi = async (req, res)  => { 
  // Get events
  var count = 0
  console.log("Get Stripe Data")
  var charges = []
  await stripe.charges.list({limit: 100}).autoPagingEach(function(customer) {
      // Do something with customer
      count++
      charges.push(customer)
      console.log(customer)
  })
  updateAndSaveApi(res, charges)
}
const bankValidation = async (res, req) => {
  const bankInfo = await json(req)
  stripe.tokens.create({
    bank_account: {
      country: 'US',
      currency: 'usd',
      account_holder_name: bankInfo.fullName,
      account_holder_type: 'individual',
      routing_number: bankInfo.routingNumber,
      account_number: bankInfo.accountNumber
    }
  }, function(err, token) {
    // asynchronously called
  });
}

const createAccount = async (req, res) => {
  const account =  await stripe.accounts.create({
    country: 'US',
    type: 'custom',
    requested_capabilities: ['card_payments'],
  });
  send(res, 200, account)
}
module.exports = {
  ticketApi,
  createAccount,
  balanceApi : cors(balanceApi)
};
