import React, { Component } from 'react';
import { getRentals } from './../services/rentalService';

class Rentals extends Component {
  state = {
    rentals: []
  };
  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }

  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Date Out</th>
            <th scope='col'>Date Returned</th>
            <th scope='col'>Movie Name</th>
            <th scope='col'>Rental Fee</th>
          </tr>
        </thead>
        <tbody>
          {this.state.rentals.map((rental, i) => (
            <tr>
              <th scope='row'>{i + 1}</th>
              <td>{rental.dateOut}</td>
              <td>{rental.dateReturned}</td>
              <td>{rental.movie.title}</td>
              <td>{rental.rentalFee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Rentals;
