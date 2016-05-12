
import Drawer from 'material-ui/Drawer';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

LeftMenu = React.createClass({

  getInitialState(){
    return {
      open : false 
    }
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  render(){
    return (
      <Drawer open={this.state.open}>

      </Drawer>
    )
  }
});

LeftMenu.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
