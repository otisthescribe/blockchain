import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import { CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';


const WEIS_IN_ETH = 1000000000000000000;

class RoomsFree extends React.Component {
  state = {
    dataKey: null,
    from: 0,
    to: 1,
  };
  message = null;
  price = null;
  current_account = null;
  selected_item = null;
  items = null;
  gas_price = null;
  current_balance = null;
  refund_item = null;

  setFrom = event => {
    this.setState({
      from: event.target.value
    });
  };

  setTo = event => {
    this.setState({
      to: event.target.value
    });
  };
  
  componentDidMount() {
    // Called once on component loading
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Hotel;
    // Set the account to first from the MetaMask list
    // this.current_account = drizzleState.accounts[0];
    // this.current_balance = drizzleState.accountBalances[this.current_account];
    // Set continuous data synchronization from list method
    const dataKey = contract.methods["list_rooms"].cacheCall();
    this.setState({ dataKey });
    // this.gas_price = 10000000;
    this.gas_price = 6721975;
  }

  buy(index) {
    let selected_item = index;

    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Hotel;

    const stackId = contract.methods.reserve_room.cacheSend(
      this.state.from,
      this.state.to,
      this.items[selected_item].room_number,
      {
        from: this.current_account,
        value: this.items[selected_item].price,
        gas: this.gas_price
      }
    );
  }

  getPriceInEth(price) {
    let ret = price / WEIS_IN_ETH;

    ret = ret.toFixed(2);

    if (ret < 0.01) {
      ret = '< 0.01';
    }

    return ret;
  }

  render() {
    const { drizzle, drizzleState } = this.props;
    const { Hotel } = this.props.drizzleState.contracts;
    const RoomsList = Hotel.list_rooms[this.state.dataKey];
    // Set the account to currently selected in MetaMask
    this.current_account = drizzleState.accounts[0];
    this.current_balance = drizzleState.accountBalances[this.current_account];

    if (typeof(RoomsList) != "object") {
      return (
        <React.Fragment>
          <Title>Rooms</Title>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  Loading
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </React.Fragment>
      )
    }

    this.items = RoomsList.value;
    let listItems = [];

    for (let i = 0; i < this.items.length; i++) {
      let d = this.items[i];
      
      listItems.push({
        'index': i,
        'room': d
      });
    }

    return (
      <React.Fragment>
        <Title>Rooms</Title>
        <br/>

        <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="From"
            variant="outlined"
            onChange={this.setFrom}
            value={this.state.from}
          />
        <TextField
            style={{ width: "400px", margin: "5px" }}
            type="number"
            label="To"
            variant="outlined"
            onChange={this.setTo}
            value={this.state.to}
          />
        <br/>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>Room number</TableCell>
              <TableCell align='center'>Single beds</TableCell>
              <TableCell align='center'>Double beds</TableCell>
              <TableCell align='center'>Price [ETH]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((entry) => (
              <TableRow key={entry.index}>
                <TableCell>
                  <Button onClick={() => this.buy(entry.index)} variant="outlined">Reserve</Button>
                </TableCell>
                <TableCell align='center'>{entry.room.room_number}</TableCell>
                <TableCell align='center'>{entry.room.single_beds}</TableCell>
                <TableCell align='center'>{entry.room.double_beds}</TableCell>
                <TableCell align='center'>{this.getPriceInEth(entry.room.price_for_night)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export {RoomsFree};
