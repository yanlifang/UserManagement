User Anthentication Service 

First, run the development server: 
## Installation
npm install 

## NodeJS HTTPS server 
https [to create nodejs server] 

# To generate credentials 
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem

## Usage
Login through social media.
User can login either through google, twitter, facebook or linkedin 

After you login, users can be redirected to our project homepage.

There is option to logout social media account. 

This application has been deployed to aws Elastic Beanstalk services. 
http://httpuser-env.eba-uqchs28j.us-east-2.elasticbeanstalk.com/

Deploy to Heroku: https://user-manage-ly.herokuapp.com/
