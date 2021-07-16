// Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name, id, email){
        super(name, id, email);
        this.isIntern = true;
    }
}

module.exports = Intern