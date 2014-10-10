"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('Show available units', 
  function() {
      // console.log("Implement me");
      var available = building.availableUnits();
      for(var i=0; i<available.length; i++){
        console.log(" tenant: " + available[i].tenant +
            " num: " + available[i].number + 
                " sqft: " + available[i].sqft +
                " rent: $" + available[i].rent);
      }
    }
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
    var reference = new app.Person(ref_name, ref_contact);
    people.forEach(function(tenant){
      if (tenant.name === tenant_name && tenant instanceof app.Tenant) {
        tenant.references.push(reference);
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
      // console.log("Implement me.");
      building.units.forEach(function(unit) {
        if (unit.number === unit_number) {
          people.forEach(function(tenant) {
            if (tenant.name === tenant_name && tenant instanceof app.Tenant) {
              unit.tenant = tenant;//_name;
              // console.log(unit.tenant, tenant_name, unit);
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
      building.units.forEach(function(unit) {
        if(unit.tenant.name == tenant_name) {
          unit.tenant = null;
        }
      });
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Show total sqft rented', 
  function() {
      var total=0;
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