<template>
    <div class="card mt-0">
        <div class="card-header d-flex justify-content-between align-items-center">
            <strong>Speed/Latency Test</strong>
            <div>
                <input type="number" class="form-control" id="messageSize" v-model="messageSize"
                       placeholder="Enter size" style="width: auto; display: inline-block;">
                <label for="messageSize" class="mx-2">KB</label>
                <button class="btn btn-primary" @click="sendTestMessage">Send</button>
            </div>
        </div>
        <div class="card-body p-0">
            <table class="table mb-0">
                <thead>
                <tr>
                    <th>Message/s</th>
                    <th>Speed [KB/s]</th>
                    <th>Latency [ms]</th>
                    <th>Correctly</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Last</th>
                    <td>{{ lastSpeed }}</td>
                    <td>{{ lastLatency }}</td>
                    <td>{{ lastCorrect ? 'Yes' : 'No' }}</td>
                </tr>
                <tr>
                    <th>Avg</th>
                    <td>{{ avgSpeed }}</td>
                    <td>{{ avgLatency }}</td>
                    <td>{{ avgCorrectPercents}}</td>
                </tr>
                <tr>
                    <th>Min</th>
                    <td>{{ minSpeed }}</td>
                    <td>{{ minLatency }}</td>
                    <td>-</td>
                </tr>
                <tr>
                    <th>Max</th>
                    <td>{{ maxSpeed }}</td>
                    <td>{{ maxLatency }}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                messageSize: null,
                lastSpeed: null,
                lastLatency: null,
                lastCorrect: false,
                avgSpeed: null,
                avgLatency: null,
                avgCorrectPercents: null,
                minSpeed: null,
                minLatency: null,
                maxSpeed: null,
                maxLatency: null
            };
        },
        methods: {
            sendTestMessage() {
                // Method implementation from your original code...
            }
        }
    }
</script>

<style>
    /* Styles from your original code... */
</style>
