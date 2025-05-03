<template>
  <div class="min-h-screen bg-black text-gray-200 font-mono flex flex-col">
    <!-- NAVBAR -->
    <nav class="flex items-center justify-between px-6 py-4 border-b border-gray-700">
      <!-- logo + title -->
      <div class="flex items-center">
        <img src="/logo/logo.webp" alt="Logo" class="h-8 w-auto mr-4" />
        <span class="hidden sm:inline text-2xl font-bold">THE WITNESS'S ARCHIVE</span>
      </div>

      <!-- links -->
      <ul class="flex space-x-6">
        <li><router-link to="/" class="hover:underline">HOME</router-link></li>
        <li><router-link to="/archive" class="hover:underline">ARCHIVE</router-link></li>
        <li><router-link to="/about" class="hover:underline">ABOUT</router-link></li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="flex-1 px-4 py-8 w-full mx-auto 
         max-w-3xl     /* default */
         lg:max-w-5xl  /* on ≥1024px wide */">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="px-6 py-4 border-t border-gray-700 text-center text-sm text-gray-500">
      I remember them so you don't have to.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>