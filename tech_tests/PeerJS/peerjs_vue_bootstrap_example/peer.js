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
            isConnected: false
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
                const messageObj = JSON.parse(data);
                this.receivedMessages.push(messageObj);
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
        getMessageAndSend() {
            if (this.isConnected && this.message.trim() !== '') {
                this.sendMessage({
                    created: new Date().toTimeString().split(" ")[0],
                    sender: this.name,
                    message: this.message,
                    type: 'short_message'
                });
                this.message = '';
            } else {
                alert('Message is empty or connection is not established. Please connect and enter a message.');
            }
        },
        sendMessage(messageObj) {
            this.receivedMessages.push(messageObj);
            this.conn.send(JSON.stringify(messageObj));  // Sends the message as a JSON string
        },
        getSeed(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        genMessageForTest(seed, requested_sizeKB) {
            // Vytvoří zprávu délky sizeKB pro daný seed
            const sizeInBytes = requested_sizeKB * 1024;
            let result = '';
            const seedLength = seed.length;
            while (result.length < sizeInBytes) {
                result += seed.repeat(Math.ceil((sizeInBytes - result.length) / seedLength)).slice(0, sizeInBytes - result.length);
            }
            return result;
        },

        getMessageObject(requested_sizeKB) {
            const seed = getSeed();
            const messageText = genMessageForTest(seed, requested_sizeKB);
            const created = new Date().toISOString(); // ISO format pro snadnou manipulaci a zobrazení

            const messageObject = {
                actual_len: messageText.length,  // Zde by mělo být opraveno na správnou délku, aktuálně je to počet znaků
                created: created,
                message: messageText,
                type: 'long_message'
            };

            return messageObject;
        },
        getLongMmsgAsString(requested_sizeKB) {
            const messageObject = getMessageObject(requested_sizeKB);
            // Generujeme JSON a následně nahradíme placeholder správnou délkou
            let jsonString = JSON.stringify(messageObject);
            const lengthPlaceholder = '<length_placeholder>';
            jsonString = jsonString.replace(lengthPlaceholder, String(jsonString.length + lengthPlaceholder.length).padStart(lengthPlaceholder.length, '0'));

            return jsonString;
        }

    }
}).mount('#app');