import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import Home from './components/home/Home';
import SingleEvent from './components/event/single_event';
import EventList from './components/event/event-list';
import EventListByCat from './components/event/event-list-bycat';
import EventListByCity  from './components/event/event-list-bycity';
import EventSearch from './components/event/event-search';
import EventFilter from './components/event/event-filter';
import CheckOut from './components/event/check-out';
import CartPage from './components/event/cart-page';
import Login from './components/register/login';
import HowIt from './components/event/how-it';
import Register from './components/register/register';
import TicketPage from './components/event/ticket-page';
import ForgetPassword from './components/register/forget-password';

class App extends Component {
render() {
  return (<Router>
    <ScrollToTop>
      <div>
        <Switch>
          <Route exact path='/' component = {Home} />
          <Route  path='/single-event/:event_slug' component = {SingleEvent} />
          <Route  path='/login' component = {Login} />
          <Route  path='/register' component = {Register} />
          <Route  path='/forget-password' component = {ForgetPassword} />
          <Route  path='/event-list' component = {EventList} />
          <Route  path='/event-list-bycat/:id' component = {EventListByCat} />
          <Route  path='/event-list-bycity/:city' component = {EventListByCity} />
          <Route  path='/event-filter' component = {EventFilter} />
          <Route  path='/cart-page/:token/:event' component = {CartPage} />
          <Route  path='/check-out' component = {CheckOut} />
          <Route  path='/howitworks' component = {HowIt} />
          <Route path='/ticket-page/:token/:booking_id/:event' component = {TicketPage} />
        </Switch>
      </div>
    </ScrollToTop>
  </Router>
  );
}
}
export default App;
