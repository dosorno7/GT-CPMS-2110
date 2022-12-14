# Client-Project Management System
The Client-Project Management System is a web application for Georgia Tech professors of the Computer Science Junior Design Course. Professors are able to authenticate and log-in to the application using Georgia Tech's SSO Authentication service. The application will allow professors to view and manage project/team/client pairings. They will be able to filter the display and quickly grab the emails for teams, sections, clients, etc. for contacting. As students, professors, clients, and projects come and go, the Client-Project Management System is highly adaptable and allows professors to create, edit, and delete teams in one place. 

# Release Notes
## Version 1.0.0
### New Features
* Able to login to the app through GT SSO. 
* Able to register for the app by requesting access. 
* Able to navigate between Teams, Clients, and Projects pages via a tab bar.
* Able to create a student team with team number, section, client name, project name, professor, and a custom number of students and their emails. 
* Able to create a new project with client name, section, team assigned, organization, and status. 
* Able to create a new client with client name, organization, email, and status. 
* Able to verify initialized teams, projects, and clients are valid before submission through error checking and messages on creation page.
* Able to filter each column in the the grid displays by increasing/decreasing or by a specific value.
* Able to remove a team/client/project from their respective grids.
* Able to export the Teams/Clients/Projects grids to excel files.
* Able to view all information pertaining to a selected team, client, or project.
* Able to copy selected teams' student emails to clipboard from the Teams page.

### Bug Fixes
* Fixed create client/team/project modal not updating error messages when the user clicks away and returns. 
* Fixed duplicate button issue on team creation modal 
* Fixed resizing issue on all 3 pages where some of the grid columns would not resize when the browser was resized.
* Fixed bug where tab bar would not show the active tab. 
* Fixed the dropdown menu on the request access page not saving the selected choice upon submission.
* Fixed brief flash of unauthorized user page even if a valid ticket is presented when authenticating. 
* Fixed create team issue where background would remain grey and unclickable if create team is exited on the second page.
* Fixed create team issue where user is unable to create a second team after creating their first team. 
* Fixed create team issue where the error checking for the section field did not update after closing and reopening the modal.
* Fixed paging issue in the teams data-grid where, after creating a new team, the new team would multiply with each page navigation. 
* Fixed new team creation issue where the new team would only be located in the 1st position of the grid even after filtering. 

### Known Issues
* N/A

# Installation Guide

## View the application
If you simply wish to view the application as is, simply connect to the Georgia Tech VPN and go to http://cpms.cc.gatech.edu/. You will now be able to use the latest version of the application without any further installation instructions! If you wish to setup a local development version for the application to apply changes, continue reading through this installation guide.

## Set Up local webapp
The installation guide for this project has two main components. First, begin by installing node.js and npm if you don't have them installed. Visit this link https://nodejs.org/en/download/ and accept all the default settings in the installer. Then clone this repository by performing the following command: <code>git clone https://github.com/dosorno7/GT-CPMS-2110</code>. Once cloned, open a terminal window and navigate to the client directory. To get all the dependencies needed for the project, simply run the following command: <code>npm install</code>. This will automatically install all dependent packages needed to run the project. If you wish to launch a local version of the application, simply run the command <code>npm start</code>. Navigate to http://localhost:3000/ to see the result. Note that it may take 30 seconds up to a minute for the page to finish loading when launching it for the first time.

## Set Up local server
The second part of this installation guide involves starting the server locally. Before continuing, ensure that you have both NodeJS and Express.js installed on your machine. You can install NodeJS by going to the following webpage and selecting the version of NodeJS that is suitable for your machine's operating system: https://nodejs.org/en/download/. To install Express.js, simply perform the command <code>npm install express</code>. 

### Install Postgres on MAC
Additionally, the application uses PostgreSQL so you will need to install this and create the table schema locally to fully use the application's features locally on your computer. If you are on a MacOS computer, you can install PostgreSQL by using brew. Simply run the command <code>brew install postgresql</code>. Note that the PostgreSQL server may not start automatically once this is finished. If this is the case, run <code>brew services start postgresql</code>.

### Install Postgres on Windows
If you are on a Windows machine, you will not have access to brew. Instead, you can go to this website https://www.postgresql.org/download/ and follow the instructions to download the installer. When it is done installing, execute the installer and continue with all the default ports and settings. When asked to set a password, choose a password at your own discretion. 

After successful install, open a command prompt on your computer. Type the command <code>psql</code> in the command prompt. This will then prompt your password (which was chosen in the installation process). Enter your password and hit enter, this will open the psql shell in command prompt. Note that this will only work if psql was added to your PATH, go to troubleshooting if this does not work for you.  

### Configuring PostgreSQL local tables and roles

Now, we must access the PostgreSQL terminal. In your terminal window, run the following: <code>psql -d postgres -U postgres</code>. Once inside the PostgreSQL terminal, perform the following queries:

* <code>CREATE ROLE cpmsdatabasehelper WITH LOGIN PASSWORD 'CPMSGT';</code>
* <code>ALTER ROLE cpmsdatabasehelper CREATEDB;</code>

Now, exit the PostgreSQL terminal by typing <code>/q</code>. Reenter the PostgreSQL terminal with the newly created role by running <code>psql -d postgres -U cpmsdatabasehelper</code>. It may ask you for a password and if it does, simply enter the password created in the previous step: CPMSGT. Once back inside the PostgreSQL terminal, execute the following series of queries:

* <code>CREATE DATABASE cpms;</code>
* <code>\c cpms;</code>
* <code>CREATE TABLE team(id SERIAL PRIMARY KEY, team_number int UNIQUE, section VARCHAR(30), project VARCHAR(30), client VARCHAR(30), professor VARCHAR(30));</code>
* <code>CREATE TABLE student (id SERIAL PRIMARY KEY, team_number int, name VARCHAR(30), email VARCHAR(30));</code>
* <code>CREATE TABLE client (id SERIAL PRIMARY KEY, email VARCHAR(30) UNIQUE, client_name VARCHAR(30), organization VARCHAR(30), status VARCHAR(20));</code>
* <code>CREATE TABLE project (id SERIAL PRIMARY KEY, organization VARCHAR(30), client_name VARCHAR(30), team_number int, section VARCHAR(30), status VARCHAR(30));</code>

You may now exit the PostgreSQL terminal by typing <code>/q</code>.

Now, once you have a local version of the frontend running on http://localhost:3000/, open a new terminal window and navigate to the server folder. Run the command <code>npm install</code> to install the remaining dependencies and packages needed to run the server. To start the server, simply run the following command: <code>node server.js</code>. The server should now be running in http://localhost:3001/. However, there is no need for you to open localhost on port 3001 on your browser. You may now use the application's frontend on http://localhost:3000/ which will interact with the running server.

## Deploying changes to the virtual machine

If you wish to deploy changes to the virtual machine, two scripts have been provided for ease. If you wish to deploy client-side changes, go to the client folder and open the <code>deploy.sh</code> file. Switch out the gburdell3 in this line <code>scp -r build/* gburdell3@cpms.cc.gatech.edu:/var/www/130.207.114.64</code> and replace it with your Georgia Tech username. Then, simply open a terminal window at the client folder and run <code>bash deploy.sh</code>. Now, if you wish to deploy server-side changes, go to the server folder and follow the same procedure with the <code>deploy.sh</code> file in that folder.

Note that your username must be authorized to access the virtual machine to deploy any changes. You can verify if you are authorized by attempting to SSH into the virtual machine by using the command <code>ssh -l YOUR_GT_USERNAME_HERE cpms.cc.gatech.edu</code> where YOUR_GT_USERNAME_HERE represents your Georgia Tech username. If prompted for a password, simply enter your Georgia Tech password.  

## Common Setup Issues and Troubleshooting

A common setup issue can arise sometimes when finishing attempting to access the PostgreSQL console for the first time. Running <code>psql -d postgres -U postgres</code> for the first time can sometimes prompt you for a password. If you have not set a password before for the postgres user (the default user created by default by the installation), this may become an issue to execute the subsequent steps in the installation guide. To resolve this issue, you must do the following:
1. Locate the pg_hba.conf file on your machine. If you are on a Linux based system, you can do so by executing <code>locate pg_hba.conf</code> on your terminal. If you are on a Windows machine, you can usually find it on the following path: <code>C:\Program Files\PostgreSQL\YOUR_DOWNLOADED_VERSION_HERE\data\pg_hba.conf</code>.
2. Open the configuration file with your favorite text editor. You can also do so from the command line by doing <code>nano YOUR_FILE_PATH_HERE</code> or <code>vim YOUR_FILE_PATH_HERE</code>.
3. Change the following lines (note that we are only changing the authentication method from peer or md5 to trust in each of these lines):
    * <code>local all postgres trust</code>
    * <code>host all all 127.0.0.1/32 trust</code>
    * <code>host all all ::1/128 trust</code>
4. Restart the PostgreSQL service for the changes to take effect. If you are on a MacOS machine, you can do so by executing <code>brew services stop postgresql</code> followed by executing <code>brew services start postgresql</code>. If you are on a Linux based machine, you can do so by executing <code>sudo systemctl restart postgresql</code>. 
5. Run <code>psql -d postgres -U postgres</code> once again and you should now be able to login to the PostgreSQL terminal without having to provide a password. 
6. Change the postgres user password by executing the following query: <code>ALTER USER postgres PASSWORD 'root'</code>. Then, exit the PostgreSQL terminal by typing <code>\q</code>.
7. Reopen the pg_hba.conf file and change back the previously edited lines to the following:
    * <code>local all postgres md5</code>
    * <code>host all all 127.0.0.1/32 md5</code>
    * <code>host all all ::1/128 md5</code>
8. Restart the PostgreSQL service once again.
9. You should now be able to execute <code>psql -d postgres -U postgres</code> and securely login with your new set password.

### Module not found errors
It is possible that when you run npm start, you will encounter module not found errors. 
For example this: Module not found: Error: Can't resolve 'file-saver'

1. Find the name of the module that cannot be resolved (in the above error, file-saver is the missing module)
2. run npm install (missing module) (in this case, npm install file-saver). 

### Postgres issues
An error message that you may see when running psql is:
<code>'psql' is not recognized as an internal or external command</code>

If you get this issue on a windows machine, then it is likely that psql is not added to your path. There are two options to remedy this.
1. Type path in the windows search bar
2. Click on environment variables
3. New system variable
4. For the variable name put psql, for the variable value put the path to the Postgres15 bin (it should look similar to this path <code>C:\Program Files\PostgreSQL\15\bin</code>
5. Finally, run <code>refreshenv</code> in your command prompt and then test psql in the prompt

The other option if this does not work is:
1. Open a command prompt
2. CD into the directory with the bin (again, it will look something like this: <code>C:\Program Files\PostgreSQL\15\bin</code>)
3. Run the command psql.exe 

## Running the application
To run the application, you must start the webapp and the server. To start the webapp, navigate to the client directory in a new terminal and run <code>npm start</code>. To start the server, navigate to the server directory in a new terminal and run <code>node server.js</code> 



