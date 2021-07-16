// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');

class Engineer extends Employee {
    constructor(isEngineer){
        super(name, id, email);
        this.isEngineer = true;
    }
}

module.exports = Engineer