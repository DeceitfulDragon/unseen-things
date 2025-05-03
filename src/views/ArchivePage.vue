<template>
  <div>
    <h2 class="text-3xl mb-6">Archive</h2>

    <div v-if="items.length"
         class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="item in items"
        :key="item.id"
        :to="`/archive/${item.id}`"
        class="block bg-gray-950 border border-gray-800 rounded overflow-hidden transform transition duration-200 hover:shadow-lg hover:scale-102"
      >
        <img
          :src="thumbnailUrl(item.thumbnail)"
          alt=""
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl mb-1">{{ item.title }}</h3>
          <p v-if="item.lastSeen" class="text-sm text-gray-400">
            Last seen: {{ item.lastSeen }}
          </p>
          <p v-if="item.entryDate" class="text-sm text-gray-400">
            Entry: {{ item.entryDate }}
          </p>
        </div>
      </router-link>
    </div>

    <p v-else class="text-center text-gray-500">Loading…</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import matter from 'gray-matter'

export default {
  name: 'ArchivePage',
  setup() {
    const items = ref([])

    const base = import.meta.env.DEV
      ? '/content'
      : 'https://cdn.jsdelivr.net/gh/DeceitfulDragon/unseen-things@main/public/content/'

    onMounted(async () => {
      // fetch list of IDs
      const listRes = await fetch(`${base}/index.json`)
      const ids     = await listRes.json()

      // for each ID, fetch .md and pull frontmatter
      const promises = ids.map(async id => {
        const res  = await fetch(`${base}/${id}.md`)
        const text = await res.text()
        const { data } = matter(text)

        return {
          id,
          title:     data.title,
          thumbnail: data.thumbnail,
          lastSeen:  data.lastSeen,
          entryDate: data.entryDate
        }
      })

      items.value = await Promise.all(promises)
    })

    // resolve local vs CDN
    function thumbnailUrl(path) {
      return path.startsWith('http')
        ? path
        : (import.meta.env.DEV ? `/content/${path}` : `${base}/${path}`)
    }

    return { items, thumbnailUrl }
  }
}
</script>