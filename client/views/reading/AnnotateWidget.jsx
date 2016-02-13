var {
  FloatingActionButton,
  ContentAdd
} = MUI;
var { ThemeManager } = MUI.Styles;

// App component - represents the whole app
AnnotateWidget = React.createClass({

  comment_mode_enabled: false,

  getDefaultProps: function() {
    return {
      value: false
    };
  },

  toggleCommentMode() {
    this.comment_mode_enabled = ! this.comment_mode_enabled;

  },

  render() {
    const fabClassName = (this.comment_mode_enabled ? "comment-mode-enabled" : "") + " md-button md-fab paper-shadow";

    return (

      <button className={fabClassName} onClick={this.toggleCommentMode}>
        <i className="mdi mdi-pencil"></i>
        <i className="mdi mdi-close"></i>
      </button>

    );
  }
});
