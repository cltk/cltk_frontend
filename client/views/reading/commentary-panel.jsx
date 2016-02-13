Template.commentaryPanel.helpers({

});

Template.commentaryPanel.onRendered(function(){
  React.render(<Commentary />, document.getElementById("commentary-panel"));

});
