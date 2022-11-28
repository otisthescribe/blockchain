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

class Room extends React.Component {
  state = {
    index: null,
    room: null,

    dataKey: null,
  }

  componentDidMount() {
    const { drizzle, drizzleState, index, room, from, to } = this.props;

    const contract = drizzle.contracts.Hotel;
    const dataKey = contract.methods["list_room_reservations"].cacheCall(room.room_number);
    
    this.setState({
      index, room,
      from, to,
      dataKey
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps);
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
    const { Hotel } = this.props.drizzleState.contracts;
    const ReservationsList = Hotel.list_room_reservations[this.state.dataKey];

    if (typeof(ReservationsList) != "object") {
      return (
        <TableRow key={this.state.index}>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      )
    }

    let reservations = ReservationsList.value;
    let free = true;

    for (let i = 0; i < reservations.length; ++i) {
      let r = reservations[i];

      // if (
      //   this.state.to > r.start_date
      //   && this.state.to <= r.stop_date
      // ) {
      //   free = false;
      //   break;
      // }

      // if (
      //   this.state.from > r.start_date
      //   && this.state.from <= r.stop_date
      // ) {
      //   free = false;
      //   break;
      // }

      if (
        this.state.from < r.stop_date
        && this.state.to > r.start_date
      ) {
        free = false;
        break;
      }
    }
    
    return (
      <TableRow key={this.state.index}>
        <TableCell>
          <Button onClick={() => this.buy(this.state.index)} variant={free ? 'outlined' : 'disabled'}>{ free ? 'Reserve' : 'Reserved' }</Button>
        </TableCell>
        <TableCell align='center'>{this.state.room?.room_number}</TableCell>
        <TableCell align='center'>{this.state.room?.single_beds}</TableCell>
        <TableCell align='center'>{this.state.room?.double_beds}</TableCell>
        <TableCell align='center'>{this.getPriceInEth(this.state.room?.price_for_night)}</TableCell>
      </TableRow>
    )
  }
}

export {Room};
