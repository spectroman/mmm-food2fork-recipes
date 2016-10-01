/* MMM2 Module */

/* spectroman's
 * Module: food 2 fork Recipes
 *
 * By Spectroman https://juliochegedus.com
 * MIT Licensed.
 */

Module.register("mmm-food2fork-recipes",{

        // Default module config.
        defaults: {
                APIkey: "", // API key from food 2 fork
                updateInterval: 3600 * 1000, // every hour
                animationSpeed: 1000,
                listSize: 4,
                fade: true,
                fadePoint: 0.25, // Start on 1/4th of the list.
                initialLoadDelay: 2500, // 2.5 seconds delay.
                retryDelay: 2500,

                apiSearch: "http://food2fork.com/api/search",

                daysTable: {
                        "1": "natural",
                        "2": "chicken",
                        "3": "vegan",
                        "4": "indian",
                        "5": "japanese",
                        "6": "quick",
                        "0": "vegetarian"
                },
        },

        // Define required scripts.
        getScripts: function() {
                return ["moment.js"];

        },

        // Define required scripts.
        getStyles: function() {
                return ["recipes.css"];
        },

        // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                this.loaded = false;
                this.scheduleUpdate(this.config.initialLoadDelay);

                this.updateTimer = null;

        },

        updateRecipes: function() {
                var self = this;
                var d = new Date();
                var n = d.getDay()
                var rPage = function() { return Math.floor(Math.random() * 4); };
                var pageNum = rPage();
                var pRequest;
                if (pageNum > 0) {
                    pRequest = "&page="+pageNum;
                } else {
                    pRequest = "&page=1";
                }
                var url = this.config.apiSearch + "?key=" + this.config.APIkey + "&q=" + this.config.daysTable[n]+pRequest;
                self.sendSocketNotification("GET_RECIPE", {config: this.config, url: url});
        },

        socketNotificationReceived: function(notification, payload) {
                if(notification === "RECIPE"){
                                this.processRecipe(payload);
                                this.scheduleUpdate();
                }

        },

        processRecipe: function(data) {

                this.foodlist = [];
                var idxCheck = [];
                for(count=0; count < this.config.listSize; count++) {
                    var rindex = function() {
                        return Math.floor(Math.random() * data.recipes.length);
                    };
                    var rec = rindex();
                    if (count > 0) {
                      var c=0;
                      while (idxCheck[c]) { 
                        rec=rindex();
                        if (rec === idxCheck[c]) {
                          rec=rindex();
                        }
                        c++;
                      }
                    }
//                  console.log("From: "+data.recipes[rec].publisher+", Name: "+data.recipes[rec].title);
                    this.foodlist.push({
                        publisher: data.recipes[rec].publisher,
                        namedish: data.recipes[rec].title,
                        image: data.recipes[rec].image_url
                    });
                    idxCheck[count]=rec;
                }
                this.loaded = true;
                this.updateDom(this.config.animationSpeed);
        },

        scheduleUpdate: function(delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                        self.updateRecipes();
                }, nextLoad);
        },


        // Override dom generator.
        getDom: function() {
                var table = document.createElement("table");
                table.className = "small";
                for (var l in this.foodlist) {
                        var food = this.foodlist[l];
                        var row = document.createElement("tr");
                        table.appendChild(row);

                        var imgCell = document.createElement("td");
                        var img = "<img src='" + food.image + "' height='50' width='50'>";
                        imgCell.innerHTML = img;
                        row.appendChild(imgCell);

                        var dishCell = document.createElement("td");
                        dishCell.className = "name";
                        dishCell.innerHTML = food.namedish;
                        row.appendChild(dishCell);

                        var pubCell = document.createElement("td");
                        pubCell.innerHTML = food.publisher;
                        row.appendChild(pubCell);

                        if (this.config.fade && this.config.fadePoint < 1) {
                                if (this.config.fadePoint < 0) {
                                        this.config.fadePoint = 0;
                                }
                                var startingPoint = this.foodlist.length * this.config.fadePoint;
                                var steps = this.foodlist.length - startingPoint;
                                if (l >= startingPoint) {
                                        var currentStep = l - startingPoint;
                                        row.style.opacity = 1 - (1 / steps * currentStep);
                                }
                        }
                    
                }
                return table;
        }
});
