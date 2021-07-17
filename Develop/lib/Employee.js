// Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = employee;
    }

    getName = () => {
        console.log(`This Employee's name is ${this.name}`);
        return this.name;
    }

    getEmail = () => {
        console.log(`${this.name}'s email is ${this.email}`);
        return this.email;
    }
    
    getID = () => {
        console.log(`${this.name}'s id is ${this.id}`);
        return this.id;
    }

    getRole = () => {
        console.log(`${this.name}'s role is ${this.role}`);
        return this.role;
    }
}

module.exports = Employee