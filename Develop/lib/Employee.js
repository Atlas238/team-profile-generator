// Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName = () => {
        console.log(`This Employee's name is ${this.name}`);
    }

    getEmail = () => {
        console.log(`${this.name}'s email is ${this.email}`);
    }
    
    getID = () => {
        console.log(`${this.name}'s id is ${this.id}`);
    }
}

module.exports = Employee