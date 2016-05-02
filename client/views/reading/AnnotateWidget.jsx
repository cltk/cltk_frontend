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

    if(this.state.commentModeEnabled){
      $("section#reading").removeClass("comment-mode-enabled");
      $(".reading-loading-area").removeClass("comment-mode-enabled");

    }else{
      $("section#reading").addClass("comment-mode-enabled");
      $(".reading-loading-area").addClass("comment-mode-enabled");

    }

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
