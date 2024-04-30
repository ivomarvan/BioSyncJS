import { SocketAPI, UsbAPI, DirectAPI } from './api/index.js';

class BiometricServer {
    constructor() {
        this.api = this.initializeAPI();
        this.api.onRequest((data) => this.handleRequest(data));
    }

    initializeAPI() {
        // Configuration setting to choose the type of API
        switch (config.apiType) {
            case 'SOCKET':
                return new SocketAPI();
            case 'USB':
                return new UsbAPI();
            default:
                return new DirectAPI();
        }
    }

    handleRequest(data) {
        console.log("Request received:", data);
        document.getElementById('status').textContent = `Request: ${data}`;
        // Dummy response
        const response = `Processed coordinates for ${data}`;
        this.api.sendResponse(response);
    }
}

const server = new BiometricServer();
