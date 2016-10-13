import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

var HeaderMenu = React.createClass({
  render: function() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><NavMenu /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      >
      <MenuItem primaryText="Groups" />
      <MenuItem primaryText="Boards" linkButton={true} href="/boards" />
      <MenuItem primaryText="Next Stage" />
      </IconMenu>
    );
  }

});

var HeaderBar = React.createClass({
  getInitialState() {
    return {showDrawer: false}
  },
  render: function() {
    return (
        <AppBar
          title="ExPostFacto"
          titleStyle={{textAlign: 'center'}}
          iconElementLeft={<HeaderMenu />}
        />
    );
  }
});

module.exports = HeaderBar;
