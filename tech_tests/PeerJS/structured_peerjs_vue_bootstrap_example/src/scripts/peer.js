const { Peer } = require('peerjs');

const peer = new Peer();

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
});

module.exports = peer;
