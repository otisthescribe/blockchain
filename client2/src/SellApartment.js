import * as React from 'react';
import Button from '@mui/material/Button';
import Title from './Title';
import { TextField } from '@mui/material';

/* global BigInt */

const WEIS_IN_ETH = '1000000000000000000';

class SellApartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      priceEth: 0
    };
  }

  setLocation = event => {
    this.setState({
      location: event.target.value
    });
  };

  setPriceEth = event => {
    this.setState({
      priceEth: event.target.value
    });
  };

  addApartment() {
    console.log(this.state);

    let price = BigInt(this.state.priceEth) * BigInt(WEIS_IN_ETH);

    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Apartment;
    const stackId = contract.methods.add_apartment.cacheSend(
      this.state.location,
      price,
      {
        from: this.current_account,
        gas: this.gas_price
      }
    );
    this.setState({
      location: '',
      priceEth: 0
    })
  }

  render() {
    const { drizzle, drizzleState } = this.props;
    const { Apartment } = this.props.drizzleState.contracts;
    // Set the account to currently selected in MetaMask
    this.current_account = drizzleState.accounts[0];
    this.current_balance = drizzleState.accountBalances[this.current_account];

    return (
      <React.Fragment>
        <Title>Sell Apartment</Title>
        <form>
          <TextField
            style={{ width: "400px", margin: "5px" }}
            type="text"
            label="Location"
            variant="outlined"
            onChange={this.setLocation}
            value={this.state.location}
          />
          <br />
          <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="Price [ETH]"
            variant="outlined"
            onChange={this.setPriceEth}
            value={this.state.priceEth}
          />
          <br />
          <Button variant="contained" color="primary" onClick={() => this.addApartment()}>
            save
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export {SellApartment};
