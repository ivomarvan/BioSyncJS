<template>
    <div class="card mt-0">
        <div class="card-header d-flex justify-content-between align-items-center">
            <strong>Connection</strong>
            <div>
                <button class="btn btn-primary equal-width" @click="connect" v-if="!isConnected">Connect</button>
                <button class="btn btn-danger equal-width" @click="disconnect" v-else>Disconnect</button>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <label for="myId" class="form-label">My ID</label>
                    <input type="text" class="form-control" id="myId" :value="myId" readonly>
                </div>
                <div class="col-md-4">
                    <label for="partnerId" class="form-label">Partner's ID</label>
                    <input type="text" class="form-control" id="partnerId" v-model="partnerId">
                </div>
                <div class="col-md-4">
                    <label for="status" class="form-label">Status</label>
                    <input type="text" class="form-control" id="status" :value="status" readonly>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['isConnected', 'myId', 'partnerId', 'status'],
        methods: {
            connect() {
                this.$emit('connect');
            },
            disconnect() {
                this.$emit('disconnect');
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
