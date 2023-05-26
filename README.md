# Plany

Easy Project Planification for freelancers

This is a work in progress side project I planned to work on since a long time. The main goal is to replace a huge Excel table I am using for years in order to track my activity. If this can be useful to someone else, I would be more than happy and I hope to get help and ideas from the community.

As of December 2022 this is not even an alpha version, however I can list here the main points :

Plany will provide :

 * Manage different users
 * Each user can get their list of clients
 * Each client get a list of projects attached
 * Each project is planned accross days, or hours per day
 * An Agenda view can display which and when each project is involved

## How to test/use Plany ?

As written before, this is still a very early stage, but if you want to give a try :

 * Clone the repository
 * Create .env with your configuration data (.env-dist as example)
    * Database is selected according to version:
    - dev is SQLite
    - prod is MySQL
    - planetScale is... [planetScale](https://planetscale.com)  
 * `npm install`
 * `npm run dev`

 You can look in the fixtures for test data, add your own, change the database settings if you want to use MySQL or SQLite.

 
