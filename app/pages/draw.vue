<script setup lang="ts">
const { loggedIn } = useUserSession()
const authProviders = useState<{ google: boolean, github: boolean }>('authProviders')
const toast = useToast()
const saving = ref(false)
const drawing = ref('')

function onDraw(dataURL: string) {
  drawing.value = dataURL
}

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
  <div class="my-8">
    <div class="mx-auto max-w-[400px]">
      <p class="text-center pb-4">
        Create a drawing and share it with the world!
      </p>
      <div v-if="loggedIn">
        <DrawPad
          save-label="Share"
          :saving="saving"
          class="max-w-[400px]"
          @save="save"
          @draw="onDraw"
        />
        <!-- <AIDraw :drawing="drawing" class="mt-4" /> -->
      </div>
      <div
        v-else
        class="w-full max-w-sm space-y-6"
      >
        <div class="gap-y-6 flex flex-col">
          <div class="space-y-3">
            <UButton
              v-if="authProviders.google"
              to="/auth/google"
              label="Sign-in with Google"
              icon="i-logos-google-icon"
              color="neutral"
              variant="outline"
              size="lg"
              external
              block
            />
            <UButton
              v-if="authProviders.github"
              to="/auth/github"
              label="Sign-in with GitHub"
              icon="i-simple-icons-github"
              color="neutral"
              size="lg"
              external
              block
            />
            <UButton
              v-if="!authProviders.github && !authProviders.google"
              to="/auth/anonymous"
              label="Sign-in anonymously"
              icon="i-ph-mask-happy-duotone"
              color="neutral"
              size="lg"
              external
              block
            />
          </div>
        </div>
        <p
          v-if="authProviders.google || authProviders.github"
          class="text-center text-sm text-(--ui-text-muted)"
        >
          No personal informations regarding your GitHub or Google account are stored in database.
          Only your drawings created are stored with your username and avatar from these providers. Checkout the <UButton
            to="https://git.new/draw"
            variant="link"
            color="neutral"
            target="_blank"
            class="p-0"
          >
            source code
          </UButton> of this application.
        </p>
      </div>
    </div>
  </div>
</template>
