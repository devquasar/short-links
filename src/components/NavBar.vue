<template>
  <div>
    <v-app-bar color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Create Short Links! With T.LY</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link v-for="(menu, index) in menuItems" :key="index" :to="menu.path">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    menuItems: [
      {
        path: '/',
        icon: 'mdi-home',
        title: 'Home'
      }
    ],
    drawer: false,
    group: null
  })
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
