<template>
    <v-container fluid>
        <v-tabs v-model="active" fixed-tabs>
            <v-tab :key="'entry'" @click="getEntryData">Entry</v-tab>
            <v-tab :key="'mid'" @click="getMidData">Mid-Term</v-tab>
            <v-tab :key="'exit'" @click="getExitData">Exit</v-tab>
            <v-tab-item :key="'entry'">
                <loader v-if="!loaded"></loader>
                <entry-dashboard v-if="loaded"
                                 :data="entryData"
                                 :loaded="loaded">
                </entry-dashboard>
            </v-tab-item>
            <v-tab-item :key="'mid'">
                <loader v-if="!loaded"></loader>
                <mid-dashboard v-if="loaded"
                               :data="midData"
                               :loaded="loaded">
                </mid-dashboard>
            </v-tab-item>
            <v-tab-item :key="'exit'">
                <loader v-if="!loaded"></loader>
                <exit-dashboard v-if="loaded"
                                :data="exitData"
                                :loaded="loaded">
                </exit-dashboard>
            </v-tab-item>
        </v-tabs>
        
    </v-container>
</template>

<script>
import axios from 'axios'
import loader from '@/components/loader'
import entryDashboard from '@/components/entryDashboard'
import midDashboard from '@/components/midDashboard'
import exitDashboard from '@/components/exitDashboard'
export default {
    data() {
        return {
            active: 'entry',
            entryData: [],
            midData: [],
            exitData: [],
            loaded: false
        }
    },
    methods: {
        getEntryData: function() {
            console.log('entry')
            this.loaded = false 
            axios.get('http://localhost:5005/api/getEntrySurveys').then(res => {
                console.log(res)
                this.entryData = res.data.data
                console.log(res.data.data)
                this.loaded = true 
            })
        },
        getMidData: function() {
            console.log('mid')
            this.loaded = false 
            axios.get('http://localhost:5005/api/getMidSurveys').then(res => {
                console.log(res)
                this.midData = res.data.data
                console.log(res.data.data)
                this.loaded = true 
            })
        },
        getExitData: function() {
            console.log('exit')
            this.loaded = false 
            axios.get('http://localhost:5005/api/getExitSurveys').then(res => {
                console.log(res)
                this.exitData = res.data.data
                console.log(res.data.data)
                this.loaded = true 
            })
        },
    },
    components: {
       'loader': loader, 
       'entry-dashboard': entryDashboard,
       'mid-dashboard': midDashboard,
       'exit-dashboard': exitDashboard
    },
    created() {
        this.getEntryData();
    }
}
</script>

<style scoped>
    
</style>
