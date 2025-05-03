<template>
  <div v-if="frontmatter">
    <h1 class="text-4xl mb-2">{{ frontmatter.title }}</h1>
    <p class="text-sm text-gray-500 mb-6">{{ frontmatter.date }}</p>

    <div
      ref="contentRef"
      class="prose prose-invert mb-6"
      v-html="mainHtml"
    ></div>

    <Tabs v-if="tabs.length" :tabs="tabs" />
  </div>
  <p v-else>Loading…</p>
</template>

<script>
import { ref, onMounted, nextTick, createApp } from 'vue'
import { useRoute }      from 'vue-router'
import matter            from 'gray-matter'
import MarkdownIt        from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import Tabs         from '../components/Tabs.vue'
import RandomText   from '../components/RandomText.vue'
import ImageCaption from '../components/ImageCaption.vue'

export default {
  name: 'ContentView',
  components: { Tabs },
  setup() {
    const route       = useRoute()
    const frontmatter = ref(null)
    const mainHtml    = ref('')
    const tabs        = ref([])
    const contentRef  = ref(null)

    // setup markdownit
    const md = new MarkdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    })
    md.use(MarkdownItContainer, 'tab', {
      validate: params => /^tab\s+(.*)$/.test(params.trim()),
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^tab\s+(.*)$/)
        if (tokens[idx].nesting === 1) {
          const title = md.utils.escapeHtml(m[1])
          return `<div class="tab" data-title="${title}">`
        } else {
          return `</div>`
        }
      }
    })

    const base = import.meta.env.DEV
      ? '/content'
      : 'https://cdn.jsdelivr.net/gh/DeceitfulDragon/unseen-things@main/public/content/'

    onMounted(async () => {
      // fetch markdown
      const id  = route.params.id
      const res = await fetch(`${base}/${id}.md`)
      const txt = await res.text()
      const { data, content } = matter(txt)
      frontmatter.value = data

      // render to HTML
      const rawHtml = md.render(content)
      const doc     = new DOMParser().parseFromString(rawHtml, 'text/html')

      // 3) extract tab blocks
      const tabElements = Array.from(doc.querySelectorAll('div.tab'))
      tabs.value = tabElements.map(el => ({
        title:   el.dataset.title,
        content: el.innerHTML
      }))
      tabElements.forEach(el => el.remove())

      mainHtml.value = doc.body.innerHTML

      // wait for v-html
      await nextTick()

      // mount <random-text> components
      contentRef.value
        .querySelectorAll('random-text')
        .forEach(el => {
          const items    = JSON.parse(el.getAttribute('items') || '[]')
          const interval = parseInt(el.getAttribute('interval')) || 10000
          createApp(RandomText, { items, interval }).mount(el)
        })

      // mount <image-caption> components
      contentRef.value
        .querySelectorAll('image-caption')
        .forEach(el => {
          const props = {
            src:     el.getAttribute('src'),
            caption: el.getAttribute('caption'),
            alt:     el.getAttribute('alt')   || '',
            width:   el.getAttribute('width') || '100%'
          }
          createApp(ImageCaption, props).mount(el)
        })
    })

    return { frontmatter, mainHtml, tabs, contentRef }
  }
}
</script>