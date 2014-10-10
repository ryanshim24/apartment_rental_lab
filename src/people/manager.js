var Person = require("./person");
var Building = require("../rental_property/building");

function Manager(name, contact) {
  // inherit name and contact
  Person.call(this, name, contact);
  // manager manages an 'array' of buildings
  this.buildings = []; //Array that holds all the building's that the Manager mangages...

}

// Set prototype and constructor
Manager.prototype = new Person(); //Manager inherites Person >>> Manager is a Person
Manager.prototype.constructor = Manager;

Manager.prototype.addBuilding = function(building) { //When I call addBuilding method 
  // check if building is an INSTANCEOF a Building andI'm checking if the new building is currently aleady in the buildings array.
  if(this.buildings.indexOf(building) === -1 && building instanceof Building) { // if Conditions are met that it's an Building class and not inside
     this.buildings.push(building);//Then push it through the buildings array.
  }
  return this;
};

Manager.prototype.removeBuilding = function(building) {
  // remove building
  if(this.buildings.indexOf(building) > -1 && building instanceof Building) { //If building I'm looking for is an isntace of Building class 
    var index = this.buildings.indexOf(building);//And currently insie the array
    this.buildings.splice(index, 1);//Then lets remove that building out of the buildings array.
  }
  return this;
};

module.exports = Manager;