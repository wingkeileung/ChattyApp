import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
    <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="userNum">Current User Online: {this.props.userNum}</span>
      </nav>
    </div>
    )
  }
}
export default NavBar;