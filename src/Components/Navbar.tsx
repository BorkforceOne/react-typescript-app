import {MenuItem, Nav, NavDropdown, NavItem, Navbar} from "react-bootstrap";
import * as React from "react";

export class Navigation extends React.Component<any, any> {
    onClick = async () => {
      require.ensure([], async () => {
          const {DataNexusService}: any = require('../Services/DataNexusService');
          let data = await DataNexusService.getData("");
          console.log(data);
          alert(data);
      });
    };

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" onClick={this.onClick}>Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={4} href="#">
                            <i className="fa fa-user-circle-o fa-3x fa-inverse"/>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}