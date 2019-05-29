<template>
    <v-app id="app">
        <v-toolbar dark color="primary">
            <v-toolbar-title>NH19 Surveys</v-toolbar-title>
            <v-spacer></v-spacer> 
            <v-toolbar-items>
                <v-btn flat to="/" router>Home</v-btn> 
                <v-btn flat to="/entrySurvey" router>Entry Survey</v-btn> 
                <v-btn flat to="/campSurvey" router>Camp Survey</v-btn> 
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <router-view></router-view>
        </main>
    </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}
</style>
