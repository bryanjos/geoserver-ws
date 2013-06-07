Geoserver-ws
==============

Allows real-time updates from Geoserver by way of Node.js, Express, and Socket.io. Utilizes Geoserver's python plugin to
catch wfs events and send updates to the node server which in turn sends the updates to the clients via socket.io.


To use locally, do the following steps:

* Install the Geoserver Python Plugin in your installation of Geoserver.
* Restart Tomcat
* Place the wfs_events.py file into the scripts/wfs/tx folder that is created after the Geoserver Python Plugin is installed
* In the this repo's folder do "npm install" to install dependencies and then "node app" to start the server
* Open up a browser and go to "http://localhost:9000/" (or whatever you set the port to)
* In another tab or browswer, go to Geoserver and start inserting, updating, deleteing features via wfs.
* If you look at the console for the first tab, you should see the data from the requests

More to come