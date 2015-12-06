// file: client/init.js
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    console.log("uploader finished", index, fileInfo, templateContext);
    $("input.file-info").data().filename = fileInfo.name;
    console.log($("input.file-info").data());
  };
});
