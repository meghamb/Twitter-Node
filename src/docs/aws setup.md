### Login to https://console.aws.amazon.com/

- S3 storage
- Create bucket with any name say twitterbucket, select nearest region (eg mumbai)
- Go to iam service in aws https://console.aws.amazon.com/iamv2/home#/policies
- Create policy --> with read and write access given, resources-> select all resources
- Go to https://console.aws.amazon.com/iamv2/home#/users
- Add user (twitter)
  - Access key - Programmatic access(select this option)
  - Set permission - Attach existing policies directly - s3demopolicy(the policy you created in prev. step)

#### Links

- Read https://cron-job.org/en/
- Mails use smtp protocol
- If api can handle only one request at a time , but you are making 10 requests, the system will crash so use process queues

Brew

- Brew services start redis

###

Amazon EC2

- Launch instace==> choose latest ubuntu or ubuntu-focal-20.04-amd64-server(\*86) = >keep all defaults ==> review and launch ==> launch
- Download the key value <filename>.pem
- cd Downloads
- Downloads % ls |grep <filename>.pem
- Downloads % ls -l | grep <filename>.pem
- chmod 600 <filename>.pem
- ls -l | grep twit
- ssh -i <filename>.pem ubuntu@"yourPublichostsite"
  (yes)
- whoami
- https://github.com/nvm-sh/nvm#install--update-script download nvm on ubuntu ,
  - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
  - paste export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
- Check nvm is installed --> nvm -v --> shows 0.38.0 or latest version
- Exit from ubuntu by typing --> exit
- To reenter --> ssh -i <filename>.pem ubuntu@"yourPublichostsite"
- nvm i 14.17.3
- Install mongodb on ubuntu(follow https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ )

  - wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
  - echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
  - sudo apt-get update
  - sudo apt-get install -y mongodb-org
  - echo "mongodb-org hold" | sudo dpkg --set-selections
    echo "mongodb-org-database hold" | sudo dpkg --set-selections
    echo "mongodb-org-server hold" | sudo dpkg --set-selections
    echo "mongodb-org-shell hold" | sudo dpkg --set-selections
    echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
    echo "mongodb-org-tools hold" | sudo dpkg --set-selections

- Start mongodb server https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb

  - sudo systemctl start mongod
  - sudo systemctl status mongod
  - mongosh
  - exit

- Install redis

  - sudo apt-get install redis-server
  - redis-cli ping

- Install nginx

  - sudo apt-get install nginx
  - sudo service nginx status

- Install PM2. PM2 is a daemon process manager that will help you manage and keep your application online

  - npm install pm2 -g

- Code fetch from github to Ubuntu

  - check if you are at home location -->pwd
    /home/ubuntu
  - check if git exists --> git --version
    git version 2.25.1
  - git clone https://github.com/meghamb/TwitterNode.git
  - cd TwitterNode/

- Run npm
  - npm i
  - npm start

### In browser go to EC2, open instance

- EC2 > Instances > YOUR INSTANCE
- Security tab -->inbound rules - check your server port is exposed
- EC2 > Security Groups
- Edit inbound rulesInfo
- headers Type Protocol Port range Source
- Add rule http - TCP - 80 - Anywhere IPV4
- Add rule Custom TCP - TCP - 3000 - Anywhere IPV4
- Add rule Custom TCP - TCP - 3001 - Anywhere IPV4
- Public IPv4 address --> open address http://<address>:3000/

- Adding .env

  - vim .env
  - copy paste config exit --> esc --> :wq
  - pm2 start index.js
  - to check background pm2 --> pm2 start index.js
  - to stop pm2 stop index.js
  - restart pm2 start index.js

- Setting up nginx reverse proxy https://meetawaiszafar.medium.com/how-to-deploye-nodejs-expressjs-application-for-production-on-ubuntu-20-04-524e5c0b2dd8
  - cd /etc/nginx
  - sudo vim sites-available/default --> paste inside location:{
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }
  - sudo nginx -t
  - sudo systemctl restart nginx
  - now without port you can access http:"yourPublichostsite"
  - so you can remove inbound rule on port 3000 now.

Enjoy!!!
