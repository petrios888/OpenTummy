import React from 'react';
import {connect} from 'react-redux';
import ReservationForm from './reservation_form';
import {withRouter} from 'react-router';
import {createReservation, receiveReservationErrors, editReservation} from '../../actions/reservation_actions';
var _ = require('lodash')


const mapStateToProps = (state,ownProps) => {

  if(state.session.currentUser === null){
    return {};
  }

   let resValues = Object.values(state.session.currentUser.reservations);


    let reservationId = null;
    resValues.forEach( (el) => {
     if (el.restaurant_id === parseInt(ownProps.match.params.restId)){
         reservationId = el.id;
     }
    });



   var permittedValues = _.map(resValues, 'restaurant_id');

   var permittedValuesToString = permittedValues.map(value => value.toString());

   const formType = permittedValuesToString.includes(ownProps.match.params.restId)? 'Edit this Reservation': 'Book this Restaurant'




  return{
    currentUser: state.session.currentUser,
    errors: state.errors.reservation,
    formType,
    reservationId,
    reservation: state.session.currentUser.reservations,

  }


};


const mapDispatchToProps = (dispatch,ownProps) => {

  let formTypeCheck = ownProps.match.params.edit

  const processReservation = (formTypeCheck  === 'edit')? editReservation : createReservation;

  return {
    createReservation: (reservation) => dispatch(createReservation(reservation)),
    clearErrors: () => dispatch(receiveReservationErrors([])),
    processReservation: (reservation) => dispatch(processReservation(reservation))
  };


};


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(ReservationForm));
