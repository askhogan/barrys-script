#BARRYS BOOTCAMP AUTOMATER

Dependencies
Node

You will need to get your cookie string from the barrys bootcamp website 
In order to get this go to :

http://booking.barrysbootcamp.com/reserve/index.cfm?action=Account.login

and click rememember me.

2- Login to the website
3- Open Developer tools 
4- CLick on Network - All 
5- Look at your request headers
5 - You will see your cookie starting COOKIETEST

eg 

COOKIETEST=Accepts%20cookies; REMEMBERME=XXXXXXXXXXXXXXXXXXXXXXXXXX; ZING1=XXXXXXXXXXXXXXXXXXXXXXXXXX; SITE=17; _ga=GA1.2.446026117.1499773146; _gid=GA1.2.555501722.1500548160; _gat=1


6- Copy this string and enter into the config file
7 - If you are not looking for the London site you will have to change the site ID
8- Once you have this string in the config file run "node time.js" in your terminal