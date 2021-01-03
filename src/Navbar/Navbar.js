import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink, NavbarBrand, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './Navbar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar className="reactstrap-nav" dark expand='md'>
      <NavbarBrand>
      <h3 className="navbar-logo"> <i class="fas fa-car"></i> <a href={'/'} style={{textDecoration:"none", color:"white"}}>Wichita Traffic App</a> </h3>
      </NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <UncontrolledDropdown>
          <DropdownToggle caret outline color="primary">
             Documentation
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="https://www.arcgis.com/home/item.html?id=ff11eb5b930b4fabba15c47feb130de4">
              World Traffic Service
            </DropdownItem>
            <DropdownItem href="https://developers.arcgis.com/javascript/">
              Javascript API for ArcGIS
            </DropdownItem>
          </DropdownMenu>
          <p className="navbar-text">This application uses the World Traffic Service API from Esri. The traffic data is updated every five minutes.</p>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>;
  }
}

export default NavBar;