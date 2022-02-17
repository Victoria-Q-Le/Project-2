# Project-2: Include 3 main features

###  7 restful routes:

Including: index, new, create, show, edit, update, destroy; to manipulate the books collection.

### The session & authentication controllers:
to ensure that only signed up users can have access and ability to books database.

The user controller has 2 routes: new and post:
  I had some issues with accessing the info that users entered into the form to create their profile. So I have done some digging and noticed that req.body couldn't read those information from the form so I have passed in bodyParser.json to store the data in JSON format.

The session controller has 3 routes: new, post and delete to access the log in page, log in and log out respectively.
  Same principal applied to new and post routes but delete rounds was a little bit different.
  We used method-overide in class to change post route to delete but I wasnt able to do so in sessions_controller.js so instead using delete route I changed it to post route so I could easily access by form.  

### The Google Map API:
I used the Google Map API to link my app and Google Map together, the user can fill out information regarding the latitude and longitude pf the store where they got their books from. This information will later be used at the location of the marker. Then the API will take this location deliver it to Google Map, which later reflect the location of the marker correlatively to its long/lat
