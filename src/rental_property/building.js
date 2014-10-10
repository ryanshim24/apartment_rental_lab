"use strict"

function Building(address) {
  // building has an address
  this.address = address;
  // and array of units
  this.units = [];
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
  var validRef = tenant.references.length >= 2;
  var inArr = this.units.indexOf(unit) > -1;
  if (this.manager &&  validRef &&  inArr && unit.available() && tenant.constructor.name === "Tenant"){
      unit.tenant= tenant;
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  var inArr = this.units.indexOf(unit) > -1;
  if (this.manager && this.units.indexOf(unit) > -1 && unit.tenant === tenant && tenant.constructor.name === "Tenant"){
      unit.tenant= null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
  var filtered = [];
  for (var i=0; i<this.units.length; i++) {
    if (this.units[i].available()) {
      filtered.push(this.units[i]);
    }
  }
  return filtered;

  // return this.units.filter(function(unit){
  //   return unit.available();
  // });
};

Building.prototype.rentedUnits = function(){
  // return rented units
  var filtered = [];
  for (var i=0; i<this.units.length; i++) {
    if (this.units[i].available()===false) {
      filtered.push(this.units[i]);
    }
  }
  return filtered;
};

module.exports = Building;
