# Tutke.io

Tutke.io is an app that enables tutors and students to connect. You can sign up as either one, depending on whether you wish to learn, or teach.
Both can post to the site, tutors put out ads about what they tutor, and students put out requests of what they are looking to learn. 
Students can respond to tutors' listings and vice versa. To know if they are compatible, they can view each other's profiles, read reviews, and listings, current and past alike.
Our goal is to spread knowledge.

## Installation
#### First you need to clone this repository using command and change {bitbucket_username} with your account's username : 

```bash
$ git clone https://{bitbucket_username}@bitbucket.org/spproject/tutke-app.git
```

#### If you want to run tutke.io app you must have installed all of the following prerequisites:
* npm
* node
* MongoDB (v3.6.*)

### How to install the prerequisites:
* [MongoDB guide](https://docs.mongodb.com/manual/installation/)
* [Node.js + npm](https://nodejs.org/en/download/)

#### After you have your local database set up, run command in your pc's root folder: 

```bash
$ mongod
```

#### Then intstall all of the dependecies using command inside the /app folder: 

```bash
$ npm install
```

#### After the dependecies are installed you can run the app  with command:

```bash
$ npm start
```

## Environmental variables

Environmental variables must be inside .env file inside app folder.

* JWT_PASSWORD=your_jwt_secret
* RECAPTCHA_SECRET=your_recapthca_secret
* MLAB_URI=your_mlab_uri
* NODE_ENV=develop OR production based on your enviroment

## Seed

There is a seed script that helps you populate base data into your database (e.g. admin account, languages). Navigate to app/app_api/models/seed.

```bash
$ cd app/app_api/models/seed
```

Create .env file with this enviromental variables:

* MLAB_URI=your_mlab_uri
* NODE_ENV=develop OR production based on your enviroment

Run seed.js script using:

```bash
$ node seed.js
```

You can add your own stages of seeding and define data inside ./data folder.


## App urls
* Local app url: http://localhost:3000/
* Heroku app url: https://tutke-io.herokuapp.com/

## Api url
* Local app url: http://localhost:3000/api/
* Heroku app url: https://tutke-io.herokuapp.com/api/

## User roles
* #### Not registered user:
	* Can browse site but can't use any action on the page (edit, delete, add).
	* Can see users profiles.
	* Can search trough lectures on the page.
	* Can register as tutor or student.
	
Every other user role can perform all of the actions that "Not registered user" can, except for registration.

* #### Admin:
	* Can delete all of the lectures, comments and users.
	* Can use admin console where hec an drop database or initialize it.
	* Can edit or delete his own account.
	* Can see my profile page.
	* Can see admin console page.


* #### Tutor:
	* Can add new posted lecture.
	* Can delete his own posted lectures.
	* Can edit his own posted lecutes.
	* Can delete his own sent pending lecture offers.
	* Can respond to lecture request from student.
	* Can send lecture offer to student.
	* Can edit or delete his own account.
	* Can see my profile page.


* #### Student:
	* Can add new reqested lecture.
	* Can delete his own reqested lectures.
	* Can edit his own reqested lecutes.
	* Can delete his own sent pending lecture requests.
	* Can respond to lecture offer from tutor.
	* Can send lecture request to tutor.
	* Can edit or delete his own account.
	* Can add comments to tutors.
	* Can edit or delete his own comments.

## Supported devices
* Xiaomi Redmi Note 3
* Samsung Galaxy s8
* iPhone 6s
* PCs

## User's input checking
* All of the fields on Sign Up, Edit my account, Add lecture and Update lecture pages are required (varies based on user's role). Input values are strings, but we have some special cases.
* Passwords fields on Sign Up page and  Edit my account page: First and second password field must match and password must contain at least one lower case character, at least one upper case character and must be at least 8 characters long. (3 points validation)
* Username field on Sign Up page and  Edit my account page: Username must be at least 6 characters long and must contain alphanumeric values. (3 points validation)
* Price field on Add lecture and Edit lecture page: Price must be a number.
* Description field on Add lecture and Edit lecture page: Description must be at least 200 characters long.

## Feautured Screens (Outdated - screens were made in the planing phase)

* ### [Log In screen](docs/logIn.png):
	* User can log in.
	* User can be redirected to sign up page.

* ### [Sign Up screen](docs/signUp.png):
	* User can create an account. He can choose between two roles: tutor and student. Account creation is personalized based on choosen role.
	
* ### Index/main screen: [Lectures tab](docs/index.png) and [Student's requests tab](docs/indexTutor.png):
	* Users can browse listings, either tutoring ads or students' requests; Users can browse tutors/students; Users can see their ratings; Users can see the listings both
	
* ### [Student's profile screen](docs/profileStudent.png) with [Taken lectures tab](docs/takenLectures.png):
	* Users can see the profile of a student; their profile picture, some basic info, Requests they have put up, Taken lectures (lectures that both agreed on)
* ### [Tutor's profile screen](docs/profileTutor.png) with [Lectures tab](docs/lectures.png)
	* Users can see the profile of a tutor; their profile pictures, their rating,  some basic info (name, education, faculty), ads they have put up, reviews.
	
* ### [Full offer view screen](docs/offerFullView.png):
	* User can see detailed offer and decide if he wants to take it.
	
* ### [Pop up - send Offer](docs/sendOffer.png):
	* When a user acts as a Tutor, he can look through requests of Students who couldn't find any suitable Tutor offers and have posted their own requests. By clicking Send Offer button on any of this request, a pop up opens that shows him the request in full. The tutor can then type in his desired pay per hour and possibly add an optional message. This information gets sent to the user of the original request.

* ### [Pop up - Add New Request](docs/addNewRequest.png):
	* By clicking on the float button(marked with the symbol +) on the homepage, a Student opens up a pop up that enables him to add a new request in case he can't find a fitting offer among the Tutors offers. The student proceeds by naming main subject of interest, choosing a category for which this interest would apply and setting up an expiration date by which he needs a Tutor to respond. He also picks his stage of education to better infrom Tutors of his position. Adding a message is optional. By clicking the button Post, his request is posted for all the Tutors to see.

* ### [Pop up - Send Request](docs/sendRequest.png):
	* Users active as students can browse offered lectures on the homepage by switching to the Lectures tab. By clicking on the Send Request button on one of this offers, a student opens up a pop up window that presents him the entire offer, including the price. If a student wishes to reserve himself a spot with the tutor, he has to pick his current level of knowledge in the offered subject. He can also add an additional message and send his request to the author/tutor of the offer.
	
* ### [Pop up - add offer](docs/addNewTutorService.png):
	* By clicking on the float button(marked with +) while being on the Student's Requests tab on the homepage, a user can add a new tutor's service. He has to name a specific subject, choose a category for the said subject and pick a date until which he is ready to offer his service. He also picks a targeted group based on the level of education and names his price per hour for such a service. Finally, he can add an optional message before posting his offer on the webpage for all students to see.
	
* ### [Pop up - edit Offer](docs/popUp-editOffer.png):
	* From his profile page, a tutor can access his active offers. He can delete them or edit them. By clicking on the button edit, a pop up window opens which allows the user to change the offers Title, Choose a different category, change the expiration date and focused educating group, change the price and edit his lecture's desrctiption. By clicking on the button Validate, his changes to the offer take effect.
	
	
## Integration with outsourced api:
* Google's reCAPTCHA
* Google Analytics

## Web App loading times:

| Screens:                       | Chrome        | Firefox |
| -------------                  |:-------------:| -------:|
| Sign Up screen (/register)     | 817ms         |  2320ms |
| Log In screen (/login)         | 558ms         |   930ms |
| Index/main screen (/)          | 766ms         |  1003ms |
| Profile screen (/user/:userId) | 726ms         |   665ms |
| My Account screen (/account)   | 597ms         |  1100ms |
| /db                            | 474ms         |   658ms |

Both browsers need the most time (2320ms) to load the Sign Up Screen. The biggest reason is the use of reCAPTCHA on this screen. Because reCAPTCHA is the product of Google, it is better optimised for its web browser Chrome and loads with it faster. For reCAPTCHA to work properly, the browser has to fetch fonts, images, scripts and other data which slows down the loading process.
Additionally, all the screens load times are slowed by loading scripts of angular, bootstrap, analytics and other JS files that are required for the website to work. Because of the nature of the app not having any pictures, the screens can load faster.

## JMeter load/stress test

Database, application and JMeter all ran on the same local machine while testing.

#### Machine specifications:
* Proccessor: Intel(R) Core(TM) i5-4670 CPU 3.40 GHz
* RAM: 8.00 GB
* Disk: 256 GB SSD

### Tests:

* Sample - number of requests sent
* Avg - an Arithmetic mean for all responses (sum of all times / count)
* Min - Minimal response time (ms)
* Max - Maximum response time (ms)
* Deviation - the Standard Deviation of the sample elapsed time
* Error rate - percent of requests with errors
* Throughput - how many requests per second does your server handle. Larger is better.
* KB/Sec - self expalanatory
* Avg. Bytes - average response size

* Number of Threads: (Number of users connects to the target website)
* Loop Count: (Number of time to execute testing)
* Ramp-Up Period: (How long to delay before starting the next user)

#### 1.
* Number of Threads: 4450
* Loop Count: 1
* Ramp-Up Period: 10

##### Result:

| Label | #Samples | Average | Min | Max | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
| ----- | -------- | ------- | --- | --- | --------- | --------| ---------- | --------------- | ----------- | ---------- |
| HTTP  | 4450     | 181     | 2   | 664 | 181.24    | 0.000%  | 405.8/sec  | 848.38          | 46.76       | 2141.0     |

This is the maximum number of load (users at the same time) that our application can serve without any errors. Standard deviation is quite low and server's Throughput is very high which is very good.

#### 2.
* Number of Threads: 7500
* Loop Count: 1
* Ramp-Up Period: 10

##### Result:

| Label | #Samples | Average | Min | Max  | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
| ----- | -------- | ------- | --- | ---- | --------- | --------| ---------- | --------------- | ----------- | ---------- |
| HTTP  | 7500     | 1890    | 17  | 3840 | 571.336   | 35,07%  | 519.1/sec  | 1194.85         | 38.30       | 2356.8     |

If we higher the load then we can see some troubles. More than one third of requests responds with an error (mostly "Connection refused"). We can se that the max and the average response time is alot higher under heavier load.

#### 3.
* Number of Threads: 15000
* Loop Count: 1
* Ramp-Up Period: 10

##### Result:

| Label | #Samples | Average | Min | Max  | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
| ----- | -------- | ------- | --- | ---- | --------- | --------| ---------- | --------------- | ----------- | ---------- |
| HTTP  | 15000    | 2889    | 7   | 7271 | 922.21    | 71.91%  | 882.1/sec  | 2216.11         | 28.55       | 2572.5     |

If we higher the load to 15k users the app is almost not functional anymore becouse almost two thirds of requests fail, but the server is still up and running.
At this point and higer (25k, 35k, etc) of users app is not functional anymore. Loading times are too long for use and most of the requests fails. But the server doesn't crash and is still running.
At 5000 users server should scale and get more resources.

You can see more detailed reports in app/tests/JMeter/repors folder.


## Development guidelines:
* ### Develop branch
	* All development happens here, you can add more branches for specific features and when that feature is completed merge it back to develop branch.

* ### Master branch
	* Master branch is meant only for releases when we are certain that all new added features are working correctly.
	
## Git workflow:
* Commit
* Pull -> resolve merge conflicts if any
* Push
	
