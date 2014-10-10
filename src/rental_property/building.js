"use strict"

function Building(address) {//The building Class
  // building has an address
  this.address = address;//Takes in an addess
  // and array of units
  this.units = [];//Takes in objects of the Unit class
}

Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager
  this.manager = person;
};

Building.prototype.getManager = function(){
  // return this.manager 
  return this.manager;
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  //Checks if there is a maninger, if the references inside of Tenant has over two, that the tenant were adding the unit too is inside the unit array
  //The Unit must be avaliable and tenant must be the from the Tenant class.
  var validRef = tenant.references.length >= 2;
  var inArr = this.units.indexOf(unit) > -1;
  if (this.manager &&  validRef &&  inArr && unit.available() && tenant.constructor.name === "Tenant"){
      unit.tenant= tenant;//If all of these conditions are met set the tenant of the unit to become the tenant were putting in.
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  //If there is a manager, the unit we want to remove the tenant from must be is inside the unit array
  //The tenant inside the unit must be the same tenant we want to remove. tenant must be a class of Tenant.
  var inArr = this.units.indexOf(unit) > -1;
  if (this.manager && this.units.indexOf(unit) > -1 && unit.tenant === tenant && tenant.constructor.name === "Tenant"){
      unit.tenant= null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
  //Goes through the buildings.unit array and see which of those units are avaliable.
  //Aka the unit.tenant === null;
  var filtered = [];
  for (var i=0; i<this.units.length; i++) {
    if (this.units[i].available()) {
      filtered.push(this.units[i]);
    }
  }
  return filtered;

};

Building.prototype.rentedUnits = function(){
  // return rented units
  //Goes through the buildings.unit array and see which of those units are filled.
  //Aka the unit.tenant ==== tenant
  var filtered = [];
  for (var i=0; i<this.units.length; i++) {
    if (this.units[i].available()===false) {
      filtered.push(this.units[i]);
    }
  }
  return filtered;
};

module.exports = Building;
