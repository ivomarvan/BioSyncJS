// Base class for API handling
class BaseAPI {
    constructor() {
        this.listeners = [];
    }

    onRequest(callback) {
        this.listeners.push(callback);
    }

    sendResponse(response) {
        console.log("Sending response:", response);
        // Implementation needed for specific API
    }
}

export class SocketAPI extends BaseAPI {
    constructor() {
        super();
        // Initialize WebSocket or similar
    }

    sendResponse(response) {
        // Send response over WebSocket
    }
}

export class UsbAPI extends BaseAPI {
    constructor() {
        super();
        // Initialize USB connection
    }

    sendResponse(response) {
        // Send response over USB
    }
}

export class DirectAPI extends BaseAPI {
    sendResponse(response) {
        // Directly interface with a local client
    }
}
