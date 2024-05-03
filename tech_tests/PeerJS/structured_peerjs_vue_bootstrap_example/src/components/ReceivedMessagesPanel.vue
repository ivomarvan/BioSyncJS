<template>
    <div class="card mt-0 mb-0">
        <div class="card-header">
            <strong>Received messages</strong>
        </div>
        <div class="card-body">
            <div v-for="msg in receivedMessages" :key="msg.created" class="mb-1">
                <span class="badge rounded-pill badge-primary">{{ msg.created }}</span>&nbsp;
                <span :class="['badge rounded-pill', (msg.sender==this.name) ? 'badge-success' : 'badge-warning']">
                    {{ msg.sender }}
                </span>:&nbsp;
                <span>{{ msg.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['receivedMessages', 'name']
    }
</script>

<style>
    /* Styles from your original code... */
</style>
