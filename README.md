# Kids Hep Phone Dashboard

This project was started during Gift the Code 2017. It was designed to be used internally by Kids Help Phone.

## What is it?

Kids Help Phone Dashboard is meant to help counsellors stay motivated about what they are doing. 

There is a statistics section to help counsellors see details about who they are helping, and how far their help is 
reaching. As well, there is a quick view of the counsellor's Quality Review Scores so they can keep in mind the 
areas they are doing well in, and the areas that they need to improve. 

As well, there is a post section that allows counsellors to share their experiences and get comments and advice
from other counsellors. This promotes a community, and allows counsellors to learn different ways to approach
similar situations in the future.

## Development Environment

### Requirements
* Node
* Angular CLI
* Python 3
* pip

### Building and running the project

1. Clone the repo (`git clone https://github.com/Jesse-longname/gtc17.git`)
2. Open two terminals (They will be regerred to as `One` and `Two`)
3. In `One`, we will install client dependencies and start a watcher on the files to 
automatically build and bundle to files. Start in the root directory of the project:
    1. `cd client`
    2. `npm install` (or `yarn install` if you have Yarn)
    3. `ng build --watch`
4. In `Two`, we will start the server.
    1. `./scripts/install_local.sh`
    2. `export FLASK_APP=server/server.py`
    3. `export FLASK_DEBUG=1`
    4. `flask run --host 0.0.0.0:4200`
5. Now you can go to `localhost:4200` in your browser to view the app!

### Scripts

There are various scripts to assist in putting data into the database. You can run them
by going to a terminal and running `flask run [script-name]`. Here are a list of scripts
and what they do.
* `load_data [file_location]`
    * Loads stat data from a file (Currently `Sample Quality Data.xlsx`) into the 
    database. 
    * The `file_location` can either be relative to the root directory or an absolute 
    path.
* `create_stat_groups`
    * Creates the stat groups for the database. Intended to be used when a db is just 
    created.