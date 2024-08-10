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
  if (saving.value) return
  saving.value = true
  // Transform the dataURL to a Blob
  const blob = await fetch(dataURL).then(res => res.blob())
  // Create the form data
  const form = new FormData()
  form.append('drawing', new File([blob], `drawing.jpg`, { type: 'image/jpeg' }))

  // Upload the file to the server
  await $fetch('/api/upload', {
    method: 'POST',
    body: form,
  })
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
              to="https://git.new/draw"
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
