"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = []; //HOlds all the peope I make. Which includes Tenants, Persons, and Managers
people.push(new app.Person("Anna Adams", "765-4321"));
people.push(new app.Tenant("Devin Daniels", "765-1234"));
people.push(new app.Tenant("Steve Smith", "744-1234"));

building.units.push(new app.Unit("12", building, 400, 2000));
building.units.push(new app.Unit("13", building, 800, 3000));
building.units.push(new app.Unit("14", building, 1800, 4500));

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact); //Creates aManager which is an instance of the Manager Class.
    aManager.addBuilding(building);//I'm pushing the building Watefront Tower into the manager.buildings array..
    building.setManager(aManager);//I'm setting the manager of the building to equal the new manager I created
    people.push(new app.Manager(name, contact));  // I'm pushing this new created Manager into the people array
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));//Tenant's which are instances of People. Therefore the tenant's I create are pushed into the people array.
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) { //Goes through the people array
      if (people[i] instanceof app.Tenant){//If the array element that I'm on is an instance of the Tenant Class
        console.log("\n" + people[i].name + " " + people[i].contact);//Than show the Peron's name and contact
        var references = people[i].references;
        if(!references) {continue;}// If that person doesn't have references move on
        for (var j = references.length - 1; j >= 0; j--) {//If they do have references 
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);//Print out the Tenant's references as well.
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);//Inside the console were adding a new Unit instance called aUnit
    building.units.push(aUnit);//Were now pushing that new unit into the building.unit array (Holds all the units that are created)
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {//Goes through the building.units array 
      console.log(" tenant: " + building.units[i].tenant +//Prints out the tenant's name
      			  " num: " + building.units[i].number + //Unit's number
                  " sqft: " + building.units[i].sqft +//Sqft
                  " rent: $" + building.units[i].rent);//And rent
    }
  }  
);

menu.addItem('Show available units', 
  function() {
      // console.log("Implement me");
      //Run's the building.availableUnits functions which creates an array of available units which I'm setting the var available to equal
      var available = building.availableUnits(); 
      for(var i=0; i<available.length; i++){//runs through this new avaiable array and then prints out the unit's that are considered available.
        console.log(" tenant: " + available[i].tenant +//tenant's name
            " num: " + available[i].number + //unit's number
                " sqft: " + available[i].sqft +//units sqft
                " rent: $" + available[i].rent);//unit's rent
      }
    }
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
    var reference = new app.Person(ref_name, ref_contact);//Tenant's referenes need to be instances of People so we create a new Person which are going to be references
    people.forEach(function(tenant){//Goes through the array of people
      //If the Name inside the array is equal to the name I'm looking for AND that array element is an instance of the Tenant CLASS
      if (tenant.name === tenant_name && tenant instanceof app.Tenant) {
        tenant.addReference(reference);//Then lets add the var reference into the tenant.references array
      }
    });
  },
  null, 
  [{'name': 'tenant_name', 'type': 'string'},
  {'name': 'ref_name', 'type': 'string'},
  {'name': 'ref_contact', 'type': 'string'}]
);

menu.addItem('Move tenant in unit', 
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      //Goes through the building.units array and see's if there is a unit.number thats equal too the unit number
      //I'm looking for... If so I then go through the people array and finds that the tenant name I'm looking for 
      //is inside the people array, that tenant must also be an instance of the Class tenant
      //Because it's a tenant it must also have more than two references
      //There must be a building manager and that unit must also be avaliable...
      building.units.forEach(function(unit) {
        if (unit.number == unit_number) {
          people.forEach(function(tenant) {
            if (tenant.name === tenant_name && tenant instanceof app.Tenant && tenant.references.length >=2 && building.manager && unit.available) {
              unit.tenant = tenant;//If all of these are true I set that teant inside the unit to be equal to the teant I found that matches the
              //tenant name and unit number
            }
          });
        }
      });

    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      // console.log("Implement me");
      //Goes through each element of the building.units array
      //If there is a unit.tenant and that unit.tenant names is equal to the name I'm looking for
      building.units.forEach(function(unit) {
        if(unit.tenant && unit.tenant.name == tenant_name) {
          unit.tenant = null;//Then set that unit.tenant equal to null hence removing the current Tenant
        }
      });
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Show total sqft rented', 
  function() {
      var total=0; //Set my variable to zero
      //Search the building.units array
      //If an element of that array unit.tenant is not empty
      //Then take the sqft of that unit and add it too total
      building.units.forEach(function(unit) {
        if (unit.tenant !==null) { 
          total += unit.sqft; 
        }
      });
      console.log("You've rented out a total sqft of: "+ total);

    }
    
);

menu.addItem('Show total yearly income', 
  function() {
      // Note: only rented units produce income
      //Search the building.units array
      //If an element of that array unit.tenant is not empty
      //Then take the rent of that unit and add it too total
      console.log("Implement me.");
      var total=0;
      building.units.forEach(function(unit) {
        if (unit.tenant !== null) {
          total +=unit.rent;
        }
      });
      console.log("You produce a yearly income of: " + total);
    } 
);

// menu.addItem('(Add your own feature ...)', 
//   function() {
//       console.log("Implement a feature that you find is useful");
//     } 
// );

// *******************************
menu.addDelimiter('*', 40);

menu.start();