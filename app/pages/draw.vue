<script setup lang="ts">
const { loggedIn } = useUserSession()
const toast = useToast()

const authProviders = [
  {
    label: 'Sign-in with Google',
    icon: 'i-logos-google-icon',
    color: 'white',
    size: 'lg',
    to: '/auth/google',
    external: true,
  },
  {
    label: 'Sign-in with GitHub',
    icon: 'i-simple-icons-github',
    color: 'black',
    size: 'lg',
    to: '/auth/github',
    external: true,
  },
]

const saving = ref(false)

async function save(dataURL: string) {
  saving.value = true
  const dateIn2050 = new Date('2050-01-01').getTime()
  const blob = await fetch(dataURL).then(res => res.blob())
  const file = new File([blob], `${dateIn2050 - Date.now()}.jpg`, { type: 'image/jpeg' })

  await useUpload('/api/upload')(file)
  .then(() => {
    toast.add({
      title: 'Drawing shared!',
      description: 'Your drawing has been shared with the world.',
      color: 'green',
    })
    navigateTo('/')
  }).catch((err) => {
    toast.add({
      title: 'Could not share drawing',
      description: err.data?.message || err.message,
      color: 'red',
    })
  })
  saving.value = false
}
</script>

<template>
  <UPageBody>
    <p class="text-center pb-4">
      Create a drawing and share it with the world!
    </p>
    <div class="max-w-[400px] mx-auto">
      <DrawPad
        v-if="loggedIn"
        save-label="Share"
        :saving="saving"
        @save="save"
      />
      <UAuthForm
        v-else
        :providers="authProviders"
      >
        <template
          #footer
        >
          <p class="text-center">
            No personal informations regarding your GitHub or Google account are stored in database.
            Only your drawings created are stored with your username and avatar from these providers. Checkout the <UButton
              to="https://github.com/atinux/instadraw"
              variant="link"
              color="black"
              :padded="false"
              target="_blank"
            >
              source code
            </UButton> of this application.
          </p>
        </template>
      </UAuthForm>
    </div>
  </UPageBody>
</template>
