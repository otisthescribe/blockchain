import * as React from 'react';
import Button from '@mui/material/Button';
import Title from './Title';
import { TextField } from '@mui/material';

/* global BigInt */

const WEIS_IN_ETH = '1000000000000000000';

class AddRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room_number: 0,
      single_beds: 0,
      double_beds: 0,
      priceEth: 0
    };

    this.gas_price = 6721975;
  }

  setRoomNumber = event => {
    this.setState({
      room_number: event.target.value
    });
  };

  setSingleBeds = event => {
    this.setState({
      single_beds: event.target.value
    });
  };

  setDoubleBeds = event => {
    this.setState({
      double_beds: event.target.value
    });
  };

  setPriceEth = event => {
    this.setState({
      priceEth: event.target.value
    });
  };

  addRoom() {
    console.log(this.state);

    let price = BigInt(this.state.priceEth) * BigInt(WEIS_IN_ETH);

    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Hotel;
    const stackId = contract.methods.add_room.cacheSend(
      this.state.room_number,
      this.state.single_beds,
      this.state.double_beds,
      price,
      {
        from: this.current_account,
        gas: this.gas_price
      }
    );
    
    this.setState({
      room_number: '',
      single_beds: '',
      double_beds: '',
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
        <Title>Add Room</Title>
        <form>
          <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="Room number"
            variant="outlined"
            onChange={this.setRoomNumber}
            value={this.state.room_number}
          />
          <br />
          <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="Signle beds"
            variant="outlined"
            onChange={this.setSingleBeds}
            value={this.state.single_beds}
          />
          <br />
          <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="Double beds"
            variant="outlined"
            onChange={this.setDoubleBeds}
            value={this.state.double_beds}
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
          <Button variant="contained" color="primary" onClick={() => this.addRoom()}>
            save
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export {AddRoom};
