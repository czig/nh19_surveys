<template>
    <v-layout row mt-5 pt-5>
        <v-progress-circular :size="120"
                             :width="12"
                             color="primary"
                             class="loader"
                             indeterminate>
        </v-progress-circular>
    </v-layout>
</template>

<script></script>

<style scoped>
.loader {
    position: absolute;
    margin: auto;
    top: 40%;
    left: 45%;
}
</style>
