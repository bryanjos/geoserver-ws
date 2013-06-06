Geoserver-ws
==============

Allows real-time updates from Geoserver by way of Node.js, Express, and Socket.io. Utilizes Geoserver's python plugin to
catch wfs events and send updates to the node server which in turn sends the updates to the clients via socket.io.