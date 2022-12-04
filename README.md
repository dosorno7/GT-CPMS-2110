# Client-Project Management System
The Client-Project Management System is a web application for Georgia Tech professors of the Computer Science Junior Design Course. Professors are able to authenticate and log-in to the application using Georgia Tech's SSO Authentication service. The application will allow professors to view and manage project/team/client pairings. They will be able to filter the display and quickly grab the emails for teams, sections, clients, etc. for contacting. As students, professors, clients, and projects come and go, the Client-Project Management System is highly adaptable and allows professors to create, edit, and delete teams in one place. 

# Release Notes
## Version 0.4.0
### New Features
* Able to remove clients. 
* Able to remove projects.
* Able to add multiple students at once when creating a team.
* Able to verify initialized client is valid before submission through error checking and messages on creation page.
* Able to verify initialized project is valid before submission through error checking and messages on creation page.
* Able to manage a selected team.

### Bug Fixes
* Fixed create client/team/project modal not updating error messages when the user clicks away and returns. 

### Known Issues
* The team creation modal has 3 add student buttons instead of 1
* Resizing the teams page window does not resize the section or team number columns of the data grid.
* Unauthorized user page breifly appears even if a valid ticket is presented.
* The tab bar does not show any active tabs.
* The dropdown menu does not save the selected choice upon submission on the request access page.

## Version 0.3.0
### New Features
* Able to remove teams. 
* Able to create a new client with client name, organization, email, and status.  
* Able to create a new project with client name, section and team assigned if applicable, organization, and status. 
* Able to filter the display by team number, section, or alphabetically, so that I can view all the teams easily. 
* Able to add students and emails when creating a student team. 
* Able to verify initialized team is valid before submission through error checking and messages on creation page. 

### Bug Fixes
* Fixed tab bar only showing the first tab as active despite switching pages. 

### Known Issues
* Resizing the teams page window does not resize the section or team number columns of the data grid.
* Unauthorized user page breifly appears even if a valid ticket is presented.
* The tab bar does not show any active tabs.
* The dropdown menu does not save the selected choice upon submission on the request access page.

## Version 0.2.0
### New Features
* Able to initialize a student team with team number, section, client name, project name, and professor. 
* Able to navigate between Teams, Clients, and Projects pages via a tab bar.

### Bug Fixes
* Fixed paging issue in the teams data-grid where, after creating a new team, the new team would multiply with each page navigation. 
* Fixed new team creation issue where the new team would only be located in the 1st position of the grid even after filtering. 

### Known Issues
* Resizing the teams page window does not resize the section or team number columns of the data grid.
* Unauthorized user page breifly appears even if a valid ticket is presented.
* When a new page is navigated to, the tab bar does not accurately reflect the active page.
* The dropdown menu does not save the selected choice upon submission on the request access page.

## Version 0.1.0
### New Features
* Able to login to the app through GT SSO 
* Able to register for the app by requesting access 
* Able to view teams in a grid format on the landing page 

### Bug Fixes
N/A

### Known Issues 
* Resizing the window does not resize the section or team number columns of the data grid. 
* The dropdown menu does not save the selected choice upon submission.

# Installation Guide
The installation guide for this project has two main components. First, begin by cloning this repository by performing the following command: <code>git clone https://github.com/dosorno7/GT-CPMS-2110</code>. Once cloned, open a terminal window and navigate to the client directory. To get all the dependencies needed for the project, simply run the following command: <code>npm install</code>. This will automatically install all dependent packages needed to run the project. If you wish to launch a local version of the application, simply run the command <code>npm start</code>. Navigate to http://localhost:3000/ to see the result. Note that it may take 30 seconds up to a minute for the page to finish loading when launching it for the first time.

The second part of this installation guide involves starting the server locally. Before continuing, ensure that you have both NodeJS and Express.js installed on your machine. You can install NodeJS by going to the following webpage and selecting the version of NodeJS that is suitable for your machine's operating system: https://nodejs.org/en/download/. To install Express.js, simply perform the command <code>npm install express</code>. 

Additionally, the application uses PostgreSQL so you will need to install this and create the table schema locally to fully use the application's features locally on your computer. If you are on a MacOS computer, you can install PostgreSQL by using brew. Simply run the command <code>brew install postgresql</code>. Note that the PostgreSQL server may not start automatically once this is finished. If this is the case, run <code>brew services start postgresql</code>. Now, we must access the PostgreSQL terminal. In your terminal window, run the following: <code>psql -d postgres -U postgres</code>. Once inside the PostgreSQL terminal, perform the following queries:

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


