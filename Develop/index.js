const inquirer = require('inquirer');
const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');


const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Employee Name: '
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter Employee ID: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Employee Email: '
    }
]

const main = async () => {
        
        const { name, id, email } = await inquirer.prompt(employeeQuestions);
        
        const { roles } = await inquirer.prompt({
            type:'list',
            name: 'roles',
            message: `What role would you like to assign to ${name}?`,
            choices: ['Manager','Engineer','Intern', 'None']
        });

        switch (roles) {
            case 'Manager': {
                const employ = new Manager(name, id, email);
                console.log(employ);
            }
                
                break;
    
            case 'Engineer': {
                const employ = new Engineer(name, id, email);
                console.log(employ)
            }

                
                break;
    
            case 'Intern': {
                const employ = new Engineer(name, id, email);
                console.log(employ)
            }
                
                break;
        
            case 'None': {
                const employ = new Employee(name, id, email);
            }
                break;
        }
}

main();