var {
  FloatingActionButton,
  ContentAdd
} = MUI;
var ThemeManager = new MUI.Styles.ThemeManager();

// App component - represents the whole app
AnnotateWidget = React.createClass({
  propTypes: {
    muiTheme: ThemeManager.getCurrentTheme()
  },
  // Required by Material UI
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },
  getChildContext() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },

  render() {
    return (
      <FloatingActionButton >
        <ContentAdd />
      </FloatingActionButton>

    );
  }
});
