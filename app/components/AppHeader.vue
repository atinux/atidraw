<script setup>
const showModal = ref(false)
const { loggedIn, clear } = useUserSession()
</script>

<template>
  <UHeader>
    <template #logo>
      <div class="flex items-center gap-1">
        <UIcon name="i-ph-image-square-duotone" />
        <h3>Instadraw</h3>
      </div>
    </template>
    <template #right>
      <UButton
        to="https://github.com/atinux/instadraw"
        color="gray"
        variant="ghost"
        icon="i-simple-icons-github"
      />
      <UButton
        to="/draw"
        icon="i-ph-pencil"
        @click="showModal = true"
      >
        Draw
      </UButton>
      <UButton
        v-if="loggedIn"
        color="gray"
        icon="i-ph-power"
        @click="clear"
      />
    </template>
  </UHeader>
</template>
