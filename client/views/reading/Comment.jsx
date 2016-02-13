Comment = React.createClass({

  propTypes: {
    comment: React.PropTypes.object.isRequired
  },


  render() {

     return (
       <div className="commentary-comment">

         <p className="comment-content">
           {this.props.comment.content}
         </p>

       </div>

     );
   }

});
