<template>
    <div class="card mt-0">
        <div class="card-header d-flex justify-content-between align-items-center">
            <strong>Message to send</strong>
            <button class="btn btn-primary equal-width" @click="sendMessage" :disabled="!isConnected">Send</button>
        </div>
        <div class="card-body">
            <input type="text" class="form-control" id="messageToSend" v-model="message"
                   placeholder="Type your message here..." @keyup.enter="sendMessage">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['isConnected'],
        data() {
            return {
                message: ''
            };
        },
        methods: {
            sendMessage() {
                if (this.isConnected && this.message.trim() !== '') {
                    this.$emit('send-message', {
                        created: new Date().toTimeString().split(" ")[0],
                        sender: this.name,
                        message: this.message
                    });
                    this.message = '';
                } else {
                    alert('Message is empty or connection is not established. Please connect and enter a message.');
                }
            }
        }
    }
</script>

<style>
    .equal-width {
        width: auto; /* Flexible width for buttons */
    }

    .card {
        margin-top: 0; /* Removes vertical margins between cards */
        margin-bottom: 20px; /* Adds slight bottom margin for better spacing */
    }

    @media (max-width: 768px) {
        .form-label {
            font-size: 14px; /* Smaller labels for small screens */
        }

        .form-control {
            font-size: 14px; /* Smaller input text for better readability */
        }

        .card-header, .card-body {
            padding: 10px; /* Reduced padding for better space utilization */
        }
    }
</style>
