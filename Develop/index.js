const inquirer = require('inquirer');
const Employee = require('./lib/Employee.js');


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
    function questionSet1() {
        
        const { name, id, email } = await inquirer.prompt(employeeQuestions);
        
        const { roles } = await inquirer.prompt({
            type:'list',
            name: 'roles',
            message: `What role would you like to assign to ${name}?`,
            choices: ['Manager','Engineer','Intern', 'None']
        });

        switch (roles) {
            case 'Manager': {
                
    
            }
                
                break;
    
            case 'Engineer':
                
                break;
    
            case 'Intern':
                
                break;
        
            case 'None': {
                const employ = new Employee(name, id, email);
            }
                break;
        }
    }

    questionSet1();
    


    const another = await inquirer.prompt({
        type: 'confirm',
        name: 'another',
        message: 'Would you like to add another employee?'
    })
}

main();