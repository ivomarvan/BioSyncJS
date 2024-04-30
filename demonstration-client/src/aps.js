import { ClientAPI } from './api/ClientAPI.js';

class DemonstrationClient {
    constructor() {
        this.clientAPI = new ClientAPI();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('requestData').addEventListener('click', () => {
            this.requestDataFromServer();
        });
    }

    async requestDataFromServer() {
        const requestType = "Track hand and head"; // Example request
        try {
            const response = await this.clientAPI.makeRequest(requestType);
            document.getElementById('response').textContent = `Response: ${response}`;
        } catch (error) {
            console.error('Error making request:', error);
            document.getElementById('response').textContent = `Error: ${error.message}`;
        }
    }
}

new DemonstrationClient();
