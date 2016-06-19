Translation = React.createClass({

  propTypes: {
    translation: React.PropTypes.object.isRequired
  },

  render() {

     const translationClassName = "meta-item translation";

     return (
        <div className={translationClassName}>
         {this.props.translation.text.map(function(text, i){

          return <p key={i} className="translation-text" dangerouslySetInnerHTML={{__html: text}}></p>

          })}

        </div>

     );
   }

});
