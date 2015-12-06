if (Meteor.isServer) {
Meteor.startup(function(){

(function() {
    var childProcess = Npm.require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called:');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();


Meteor.methods({
  fetchUrl : function( upload, user_id ){


      Meteor.defer(function () { // use defer to avoid holding up client


        });

  }

});

})
}
