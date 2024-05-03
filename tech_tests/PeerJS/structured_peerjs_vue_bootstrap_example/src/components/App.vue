<template>
  <div>
    <ConnectionPanel />
    <SendMessagePanel />
    <ReceivedMessagesPanel />
    <SpeedTestPanel />
  </div>
</template>

<script>
import ConnectionPanel from './ConnectionPanel.vue';
import SendMessagePanel from './SendMessagePanel.vue';
import ReceivedMessagesPanel from './ReceivedMessagesPanel.vue';
import SpeedTestPanel from './SpeedTestPanel.vue';

export default {
  components: {
    ConnectionPanel,
    SendMessagePanel,
    ReceivedMessagesPanel,
    SpeedTestPanel
  }
}
</script>
