const {createApp} = Vue;
createApp({
    data() {
        return {
            myId: '',
            partnerId: '',
            message: '',
            status: 'Disconnected',
            receivedMessages: [],
            peer: null,
            conn: null,
            longMessageSize: 1,  // in KB
            isConnected: false,
            // statistics
            stats: {
                count: 0,
                last: {
                    speed: '',
                    latency: '',
                    correct: ''
                },
                min: {
                    speed: '',
                    latency: '',

                },
                avg: {
                    speed: '',
                    latency: '',
                    correctPct: ''
                },
                max: {
                    speed: '',
                    latency: ''
                }
            },
        };
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.myId = urlParams.get('my_id') || "10001";
        this.partnerId = urlParams.get('partner_id') || "10002";
        const nameParam = urlParams.get('name');
        this.name = nameParam ? nameParam : "Unknown";

        this.peer = new Peer(this.myId);
        this.peer.on('connection', conn => {
            this.conn = conn;
            this.handleConnection();
        });
    },
    methods: {
        connect() {
            if (!this.isConnected && this.partnerId) {
                this.conn = this.peer.connect(this.partnerId);
                if (this.conn) {
                    this.handleConnection();
                } else {
                    console.error('Connection failed to establish.');
                    this.status = 'Connection failed';
                }
            }
        },
        disconnect() {
            if (this.conn) {
                this.conn.close();
                this.conn = null;
                this.isConnected = false;
                this.status = 'Disconnected';
            }
        },
        handleConnection() {
            this.conn.on('open', () => {
                this.isConnected = true;
                this.status = `Connected to: ${this.conn.peer}`;
            });
            this.conn.on('data', (data) => {
                const messageObj = Messages.getDeserialized(data);
                if (messageObj.type === 'long_message') {
                    this.receiveLongMessage(messageObj);
                } else {
                    this.storeShortMessage(messageObj);
                }
            });
            this.conn.on('close', () => {
                this.isConnected = false;
                this.status = 'Disconnected';
                this.conn = null;
            });
            this.conn.on('error', (err) => {
                this.isConnected = false;
                this.status = `Connection failed: ${err}`;
            });
        },
        storeShortMessage(messageObj) {
            messageObj.created = messageObj.created.toLocaleTimeString();
            this.receivedMessages.push(messageObj);
        },
        getAndSendShortMessage() {
            if (this.isConnected && this.message.trim() !== '') {
                this.sendShortMessage(this.message);
                this.message = '';
            } else {
                alert('Message is empty or connection is not established. Please connect and enter a message.');
            }
        },
        sendShortMessage(messageStr) {
            const messageObj = Messages.getShortMsgObj(messageStr, this.name);
            const msgStr = Messages.getSerialized(messageObj);
            this.conn.send(msgStr);  // Sends the message as a JSON string
            this.storeShortMessage(messageObj);
        },
        getAndSendLongMessage() {
            const messageObj = Messages.getLongMsgObj(this.longMessageSize, this.name);
            this.conn.send(Messages.getSerialized(messageObj));  // Sends the message as a JSON string
            this.storeShortMessage({
                sender: this.name,
                message: `Long message of ${this.longMessageSize} KB sent`,
                created: new Date()
            });
        },
        receiveLongMessage(messageObj) {
            this.stats.count++;
            const time_diff = new Date() - messageObj.created;
            const controlStr = Messages.genTxtForTest(messageObj.seed, messageObj.requested_KB);
            const correct = messageObj.message === controlStr;
            // time in ms, length in bytes, speed in KB/s
            this.stats.last.speed = (messageObj.message.length / time_diff).toFixed(2);
            this.stats.last.latency = time_diff;
            this.stats.last.correct = correct ? 'Yes' : 'No';
            if (this.stats.min.speed === '' || this.stats.min.speed > this.stats.last.speed) {
                this.stats.min.speed = this.stats.last.speed;
            }
            if (this.stats.min.latency === '' || this.stats.min.latency > this.stats.last.latency) {
                this.stats.min.latency = this.stats.last.latency;
            }
            if (this.stats.max.speed === '' || this.stats.max.speed < this.stats.last.speed) {
                this.stats.max.speed = this.stats.last.speed;
            }
            if (this.stats.max.latency === '' || this.stats.max.latency < this.stats.last.latency) {
                this.stats.max.latency = this.stats.last.latency;
            }
            if (this.stats.count === 1) {
                this.stats.avg.speed = this.stats.last.speed;
                this.stats.avg.latency = this.stats.last.latency;
                this.stats.avg.correctPct = correct ? 100 : 0;
            } else {
                this.stats.avg.speed = (this.stats.avg.speed * (this.stats.count - 1) + this.stats.last.speed) / this.stats.count;
                this.stats.avg.latency = (this.stats.avg.latency * (this.stats.count - 1) + this.stats.last.latency) / this.stats.count;
                this.stats.avg.correctPct = (this.stats.avg.correctPct * (this.stats.count - 1) + (correct ? 100 : 0)) / this.stats.count;
            }
            messageObj.message = `Long message of ${messageObj.requested_KB} KB received`;
            this.storeShortMessage(messageObj);
        }
    }
}).mount('#app');