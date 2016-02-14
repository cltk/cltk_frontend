Comment = React.createClass({

  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return {
      showMore: false
    }

  },

  toggleShowMore(e) {
    this.setState({
        showMore: ! this.state.showMore
    })

  },

  render() {

     const authors_length = this.props.comment.authors.length;
     const commentClassName = "meta-item panel-item commentary-comment " + (this.state.showMore ? "expanded" : "");

     return (
       <div className={commentClassName}>
          <div className="show-more-toggle" onClick={this.toggleShowMore}>
            <i className="mdi mdi-plus paper-shadow"></i>
            <i className="mdi mdi-minus paper-shadow"></i>

          </div>
         <div className="comment-meta">
           <span className="comment-ref">
             {this.props.comment.subwork.n}.{this.props.comment.text_n.from.s}
             {this.props.comment.text_n.to.s ? "-" + this.props.comment.text_n.to.s : ""}:&nbsp;
           </span>
           <span className="comment-authors">
             {this.props.comment.authors.map(function(author, i){
               let is_last = (i == authors_length - 1);

               return <span key={i}>{author.name_short}{is_last ? " - " : ", "}</span>

             })}

           </span>
           <span className="comment-date">
             {this.props.comment.date}
           </span>
         </div>

         <p className="comment-content">
           {this.props.comment.content}
         </p>

        <div className="bottom-gradient"></div>

       </div>

     );
   }

});
