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

import { Room } from './Room';


const WEIS_IN_ETH = 1000000000000000000;

class RoomsFree extends React.Component {
  state = {
    dataKey: null,
    from: this.dateToTimestamp(new Date()),
    to: this.dateToTimestamp(
      (new Date()).setDate(
        (new Date()).getDate() + 1
      )
    ),
  };
  message = null;
  price = null;
  current_account = null;
  selected_item = null;
  items = null;
  gas_price = null;
  current_balance = null;
  refund_item = null;

  drizzleState = null;

  setFrom = event => {
    this.setState({
      from: this.dateToTimestamp(event.target.value)
    });
  };

  setTo = event => {
    this.setState({
      to: this.dateToTimestamp(event.target.value)
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

  getPriceInEth(price) {
    let ret = price / WEIS_IN_ETH;

    ret = ret.toFixed(2);

    if (ret < 0.01) {
      ret = '< 0.01';
    }

    return ret;
  }

  timestampToDate(timestamp) {
    return (new Date(timestamp * 1000)).toISOString().split('T')[0];
  }

  dateToTimestamp(date) {
    return Math.round(new Date(date).getTime()/1000);
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

    this.items = RoomsList.value ?? [];
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

        <Table size="small">
          <TableBody>
            <TextField
              style={{ width: "400px", margin: "5px" }}
              type="date"
              label="From"
              variant="outlined"
              onChange={this.setFrom}
              value={this.timestampToDate(this.state.from)}
            />
            <TextField
                style={{ width: "400px", margin: "5px" }}
                type="date"
                label="To"
                variant="outlined"
                onChange={this.setTo}
                value={this.timestampToDate(this.state.to)}
              />
          </TableBody>
        </Table>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>Room number</TableCell>
              <TableCell align='center'>Single beds</TableCell>
              <TableCell align='center'>Double beds</TableCell>
              <TableCell align='center'>Price per day [ETH]</TableCell>
              <TableCell align='center'>Price [ETH]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((entry) => (this.state.to > this.state.from) ? (
                  <Room
                    key={entry.index}
                    
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    
                    index={entry.index}
                    room={entry.room}

                    from={this.state.from}
                    to={this.state.to}
                  ></Room>
                ) : (
                  <></>
                )
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export {RoomsFree};
