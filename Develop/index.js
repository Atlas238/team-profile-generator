// Setting things up... (Calling dependencies)
const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');

// Inquirer questions we need to generate our initial manager
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

// Inquirer questions we need to generate an employee
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
    }
]

// Array to hold our generated employees
const employArr = [];

// Creates a new object with the Manager class
const registerManager = async () => {

    console.log("Welcome! Let's create your team page. Please start by entering your details.\n This program assumes you are the team manager and will asign this role to the person whose details you enter here.");

    // Asking for name, id, email and officeNumber since it is tied to our Manager class
    const {name, id, email, officeNumber} = await inquirer.prompt(teamManagerQuestions);

    // If user entered anything...
    if (name.length === 0 || id.length === 0 || email.length === 0 || officeNumber.length === 0) {
        console.log('Items may not be left blank.');
     ({ name, id, email, officeNumber })  = await inquirer.prompt(teamManagerQuestions);
    }

    // Creating new Manager (If inputs were non-zero)
    const manager = new Manager(name, id, email, officeNumber);

    // Adding our manager to employee array
    employArr.push(manager);

    console.log(`Thanks ${manager.name}.`);

}

// Creates a new object with the Engineer class
const newEngineer = async () => {

    console.log('Great! Please fill out the new employees details.');
    
    // Asking for name, id, email (same for all employee types)
    const { name, id, email }  = await inquirer.prompt(employeeQuestions);

    // Checking if user entered anything...
    if (name.length === 0 || id.length === 0 || email.length === 0) {
        console.log('Items may not be left blank.');
     ({ name, id, email })  = await inquirer.prompt(employeeQuestions);
    }
    
    console.log('The Engineer role requires registration of a github username...');

    // Asking for Engineer Github username
    const { github } = await inquirer
        .prompt({
            type: 'input',
            name: 'github',
            message: 'Username: '
        });

    // Checking if user entered something
    if (github.length === 0) {
        console.log("Github username can't be left blank.")
        ({ github }) = await inquirer.prompt({
            type: 'input',
            name: 'github',
            message: 'Username: '
        })
    }

    // Making new Engineer with inputs (IF INPUTS ARE ACCEPTED)
    const employ = new Engineer(name, id, email, github);

    // Adding new Engineer to array of employees
    employArr.push(employ);

    console.log("Thanks! Your new engineer has been added.");

}

// Creates a new object with the Intern class
const newIntern = async () => {

    console.log('Great! Please fill out the new employees details.');

    // Asking for name, id, email (same for all employee types)
    let { name, id, email }  = await inquirer.prompt(employeeQuestions);

    // Checking if user entered anything...
    if (name.length === 0 || id.length === 0 || email.length === 0) {
        console.log('Items may not be left blank.');
     ({ name, id, email })  = await inquirer.prompt(employeeQuestions);
    }

    console.log('The Intern role requires registration of a School...');

    // Asking for Intern School
    let { school } = await inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'School: '
    })

    // Checking if user entered anything...
    if ( school.length === 0 ) {

        console.log('You must provide a school.');

        ({ school }) = await inquirer.prompt({
            type: 'input',
            name: 'school',
            message: 'School: '
        });
    }

    // Making new Intern with inputs (IF INPUTS ARE ACCEPTED)
    const employ = new Intern(name, id, email, school);

    // Adding new Intern to array of employees
    employArr.push(employ);

    console.log("Thanks! Your new Intern has been added.");
}

// Creates our dynamic HTML file
const generateHTML = () => {
    
    // Holder variable for our main document template
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
    // A quick function to inject a string at a given index (this specific syntax borrowed from codegrepper.com/code-examples/javascript/javascript+add+string+to+middle+of+string)
    function addCardStack(str, index, stringToAdd){
        return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
    }
    
    // Designating an array to hold our generated employee cards as needed
    const cardStack = [];
    
    // For each loop that operates on our array of employees outputting strings with employee details injected where needed
    employArr.forEach(employeeDetails => {
        
        switch (employeeDetails.role){
            case 'Manager' : {
            // By using a card templated scoped to the case I am able to be more specific with my styling and give certain roles without having to store relative location of svg files
            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <img id="coffeeCup" src="../assets/coffee-cup.svg" alt="Coffee Cup">
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="card-list">
                        <li class="card-item">ID: ${employeeDetails.id}</li>
                        <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                        <li class="card-item">Office Number: ${employeeDetails.officeNumber}</li>
                    </ul>
                </div>
            </div>`
            // Putting new card with data into array, as well as a break for formatting...
            cardStack.push(`${card}\n`);
            } break;
            
            case 'Engineer' : {
            // Same for Engineer...
            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <img id="glasses" src="../assets/eyeglasses.svg" alt="Glasses">
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="card-list">
                        <li class="card-item">ID: ${employeeDetails.id}</li>
                        <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                        <li class="card-item">Github: <a class="card-link" href="https://github.com/${employeeDetails.github}/">${employeeDetails.github}</a></li>
                    </ul>
                </div>
            </div>`
            
            cardStack.push(`${card}\n`);

            } break;

            case 'Intern' : {
                // Same for Intern...
            let card = `
            <div class="card">
                <div class="card-header">
                    <h2 class="employee-name">${employeeDetails.name}</h2>
                    <div class="role flex">
                    <img id="student" src="../assets/graduated.svg" alt="Student">
                    <h3>${employeeDetails.role}</h3>
                    </div>
                </div>
            <div class="card-body">
                <ul class="card-list">
                    <li class="card-item">ID: ${employeeDetails.id}</li>
                    <li class="card-item">Email: <a class="card-link" href="mailto:${employeeDetails.email}">${employeeDetails.email}</a></li>
                    <li class="card-item">School: ${employeeDetails.school}</li>
                </ul>
                </div>
            </div>`
                
            cardStack.push(`${card}\n`);
            } break;
        } 
    });
    // Creating the final text from our template, injecting our cardstack, joined into one string, into the middle of our original template
    const fileText = addCardStack(template, 455, cardStack.join(""))
    // Calls fs.js and writes a new file in our Output folder(Where reset.css and style.css live) and sends a message if successful ending our app.
    fs.writeFile('./Output/index.html', fileText, (err) => {
        if (err) console.log(err);
        else {
            console.log('All Done! Check the output folder to find your new index.html file!');
        }
    });
}

// Our actual applicaton function, handles start to finish
const main = async () => {

    // First we assume a manager is using our app and call the registerManager function
    await registerManager();

    // Defining a variable for our do/while loop
    let exit = false;
    
    // Do/While that asks if you would like to add either an Engineer or Intern, or exit the application.
    do {
        const { another } = await inquirer.prompt({
            type:'list',
            name:'another',
            message: 'Would you like to add another engineer, or intern? Or are you finished building your team?',
            choices: ['Engineer','Intern','All Done']
        })

        // Switch case to handle choice...
        switch(another) {

            // User picked Engineer, so we call our newEngineer function and break, going back to our above prompt
            case 'Engineer': {
                await newEngineer();
            } break;

            // User picked Intern, so we call newIntern function and break, going back to our prompt
            case 'Intern': {
                await newIntern();
            } break;

            // User pick All Done, so we set exit to true (exiting us from our while loop after we break this block), call our generate HTML function which takes our inputs and creates our new index.html in Output 
            case 'All Done': {
                console.log('Sounds good! Generating your page now...');

                exit = true;

                await generateHTML();

            } break;
        }
    } while (exit !== true);
}

// Calling our main function to start things off
main();