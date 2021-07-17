const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');



// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

const teamManagerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter your Team Manager's Name: `
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter your Team Manager's ID: `
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter your Team Manager's Email: `
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `Enter your Team Manager's Office Number: `
    }
]

const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `Enter your new Employee's Name: `
    },
    {
        type: 'input',
        name: 'id',
        message: `Enter your new Employee's ID: `
    },
    {
        type: 'input',
        name: 'email',
        message: `Enter your new Employee's Email: `
    },
    {
        type: 'confirm',
        name: 'extraRoles',
        messsage: `Would you like to add any roles to this employee?`
    }
]

const main = async () => {

    const employArr = [];
    
    // WHEN I start the application
    // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
    const {name, id, email, officeNumber} = await inquirer.prompt(teamManagerQuestions);

    const manager = new Manager(name, id, email, officeNumber);

    console.log(`Thanks ${manager.name}.`);

    // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
    const { another } = await inquirer.prompt({
        type:'confirm',
        name:'another',
        message: `Would you like to add any employee's to your team, ${manager.name}?`
    })
    console.log(another);
    if (another === true) {
        
        const { name, id, email, extraRoles } = await inquirer.prompt(employeeQuestions);

        if (extraRoles) {

            const { roles } = await inquirer.prompt({
                type: 'list',
                name:'roles',
                message: 'Which role would you like to assign?',
                choices: ['Engineer', 'Intern', 'None']
            })
    
            switch (roles) {
                
                case 'Engineer': {
                    console.log('The Engineer role requires registration of a github username...');
                    const { github } = await inquirer.prompt({
                        type: 'input',
                        name: 'github',
                        message: 'Username: '
                    });
                    const employ = new Engineer(name, id, email, github);
                    employArr.push(employ);
                    console.log(employArr[0])
                }
                    break;
        
                case 'Intern': {
                    console.log('The Intern role requires registration of a School...');
                    const { school } = await inquirer.prompt({
                        type: 'input',
                        name: 'school',
                        message: 'School: '
                    })
                    const employ = new Intern(name, id, email, school);
                    employArr.push(employ);
                }
                    break;
            }
    
        } else {
            const employ = new Employee(name, id, email);
            employArr.push(employ);
        }

    } else {
        console.log(`Great! Generating your webpage now...`);
        // TODO: Add lines to call generateHTML function with arguments of employees

        
    };
}

const generateHTML = async () => {
    
    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./reset.css">
        <link rel="stylesheet" href="./style.css">
        <title>Team Portfolio</title>
    </head>
    <body>
    
        <header>
            <h1>My Team</h1>
        </header>
    
        <main class='flex flex-around'>
        
        </main>
    
    </body>
    </html>
    `
    const card = `<div class="card">
    <div class="card-header">
        <h2 class="employee-name">Jim</h2>
        <div class="role flex">
            <icon></icon>
            <h3></h3>
        </div>
    </div>
    <div class="card-body">
        <ul class="card-list">
            <li class="card-item"><a id="email" class="card-link" href="#"></a></li>
            <li class="card-item"><a id="ID" href="#"></a></li>
         </ul>
    </div>
    </div>`

    function addCard(str, index, stringToAdd){
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
      }

      console.log(addCard(template, 497, card));
      

// console.log(template[497])
}

generateHTML();
// main();