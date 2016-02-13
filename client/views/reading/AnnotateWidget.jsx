var {
  FloatingActionButton,
  ContentAdd
} = MUI;
var { ThemeManager } = MUI.Styles;

// App component - represents the whole app
AnnotateWidget = React.createClass({

  getInitialState(){
    return {
      commentModeEnabled: false
    }

  },

  toggleCommentMode(e) {
    this.setState({
        commentModeEnabled : ! this.state.commentModeEnabled
    })

  },


  render() {
    const fabClassName = (this.state.commentModeEnabled ? "comment-mode-enabled" : "") + " md-button md-fab paper-shadow";

    return (

      <button className={fabClassName} onClick={this.toggleCommentMode}>
        <i className="mdi mdi-pencil"></i>
        <i className="mdi mdi-close"></i>
      </button>

    );
  }
});
