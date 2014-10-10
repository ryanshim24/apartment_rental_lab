var Person = require("./person.js");

function Tenant(name, contact) {
  // inherits name contact from Person
  Person.call(this, name, contact);
  // tennant has 'array' of references
  this.references = []; //The array that holds the tenant's references...
}

// Set prototype and constructor
Tenant.prototype = new Person();//Tenant inherits the Person Class >>> Tenant is a Person
Tenant.prototype.constructor = Tenant;

Tenant.prototype.addReference = function(reference){
  // add reference to references. Reference must be of type Person
  //The reference must be from the Person Class and it can't be already in the references array of tenant.
  if (this.references.indexOf(reference) === -1 && reference instanceof Person) {
    this.references.push(reference);
  }
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references. 
  //Refernce must be from the Person Class and it MUST be in teh references array of tenant.
  if (this.references.indexOf(reference) > -1 && reference instanceof Person) {
    var index = this.references.indexOf(reference);
    this.references.splice(index, 1);
  }
};

Tenant.prototype.toString = function () {
  return "[Tenant name=" + this.name + "]";
};

module.exports = Tenant;
