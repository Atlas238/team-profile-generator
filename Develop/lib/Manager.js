// Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js');
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.role = 'Manager';
        this.isManager = true;
        this.officeNumber = officeNumber;
    }
    getOfficeNumber = () => {
        console.log(`${this.name}'s office number is ${this.officeNumber}.`);
        return this.officeNumber;
    }
}

module.exports = Manager