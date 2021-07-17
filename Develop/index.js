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
        messsage: 'Would you like to add any roles to this employee?'
    }
]

const main = async () => {

    const employArr = [];
    
    // WHEN I start the application
    // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
    const teamManager = await inquirer.prompt(teamManagerQuestions);

    console.log(teamManager);

    // THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
    const another = await inquirer.prompt({
        type:'confirm',
        name:'another',
        message: `Would you like to add any employee's to your team ${teamManager.name}?`
    })
    if (another) {
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
                    const employ = new Engineer(name, id, email);
                    employArr.push(employ);
                }
                    break;
        
                case 'Intern': {
                    const employ = new Engineer(name, id, email);
                    employArr.push(employ);
                }
                    break;
            }
    
        } else {
            const employ = new Employee(name, id, email);
            employArr.push(employ);
        }

    } else {
        console.log(`Great! Generating your webpage now...`)
        fs.writeFile('./Output/index.html', //BODY OF HTML FILE HERE// )
    }
    


    

    console.log(employArr[0])

}

main();