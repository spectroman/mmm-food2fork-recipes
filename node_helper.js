var request = require('request');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

        start: function() {
                console.log("Starting node helper: " + this.name);

        },

        socketNotificationReceived: function(notification, payload) {
                var self = this;
                console.log("Downloading recipes with signal: " + notification + " From URL: " + payload.url);

                if(notification === "GET_RECIPE"){

                        var recipeJsonUri = payload.url;

                        request(recipeJsonUri, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                        //              console.log(body);
                                        self.sendSocketNotification("RECIPE", JSON.parse(body));
                                }
                        });

                }

        },
});
