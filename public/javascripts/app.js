var socket = io.connect('http://localhost:9000');

socket.on('geoserver-inserted', function (data) {
    console.log(data);
});

socket.on('geoserver-updated', function (data) {
    console.log(data);
});

socket.on('geoserver-deleted', function (data) {
    console.log(data);
});
