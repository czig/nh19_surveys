<template>
    <v-container fluid mt-0 pt-1>
        <v-tabs v-model="active" fixed-tabs>
            <v-tab :key="'entry'" @click="getEntryData">Entry</v-tab>
            <v-tab :key="'mid'" @click="getMidData">Mid-Term</v-tab>
            <v-tab :key="'exit'" @click="getExitData">Exit</v-tab>
            <v-tab-item :key="'entry'">
                <loader v-if="!loaded && showEntry"></loader>
                <entry-dashboard v-if="loaded && showEntry"
                                 :data="entryData"
                                 :loaded="loaded">
                </entry-dashboard>
            </v-tab-item>
            <v-tab-item :key="'mid'">
                <loader v-if="!loaded && showMid"></loader>
                <mid-dashboard v-if="loaded && showMid"
                               :data="midData"
                               :loaded="loaded">
                </mid-dashboard>
            </v-tab-item>
            <v-tab-item :key="'exit'">
                <loader v-if="!loaded && showExit"></loader>
                <exit-dashboard v-if="loaded && showExit"
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
            loaded: false,
            showEntry: true,
            showMid: false,
            showExit: false
        }
    },
    methods: {
        getEntryData: function() {
            console.log('entry')
            this.loaded = false 
            this.showEntry = true 
            this.showMid = false 
            this.showExit = false
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
            this.showEntry = false
            this.showMid = true
            this.showExit = false
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
            this.showEntry = false
            this.showMid = false 
            this.showExit = true 
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
        console.log('created!')
        this.getEntryData();
    },
    beforeDestroy() {
        console.log('beforeDestroy')
    }
}
</script>

<style scoped>
    
</style>
