<template>
    <v-container fluid>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">{{surveyName}}</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step step="2">Complete</v-stepper-step> 
            </v-stepper-header>
            <v-stepper-items>
                <!--survey here-->
                <v-stepper-content step="1">
                    <v-layout row>
                        <v-flex xs12>
                            AUTHORIZATION: Per USSOUTHCOM Regulation 35-2, you are required to fill out this questionnaire as part of the mandated Level III Assessment.  
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <strong>All surveys are anonymous. Demographic information is collected for assessment purposes only and not reported individually.</strong>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <strong>Demographic Information</strong>
                                <v-layout row>
                                    <!--question 1-->
                                    <v-flex xs4>
                                        <v-select :items="grades"
                                                  label="Grade"
                                                  hint="Please select your grade."
                                                  persistent-hint
                                                  v-model="responses.grade">
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row mb-0 pb-0>
                                    <!--question 2-->
                                    <v-flex xs12 mb-0 pb-0>
                                        <v-radio-group v-model="responses.branch"
                                                       label="Branch of Service: "
                                                       row>
                                            <v-radio label="Air Force" value="Air Force"></v-radio> 
                                            <v-radio label="Army" value="Army"></v-radio> 
                                            <v-radio label="Marines" value="Marines"></v-radio> 
                                            <v-radio label="Navy" value="Navy"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 3-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.status" 
                                                       label="Status: "
                                                       row>
                                            <v-radio label="Active" value="Active"></v-radio> 
                                            <v-radio label="Guard" value="Guard"></v-radio> 
                                            <v-radio label="Reserve" value="Reserve"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 4-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.skill_level"
                                                       label="Skill Level:"
                                                       hint="Please select your skill level in your current job." 
                                                       persistent-hint
                                                       column>
                                            <v-radio label="Entry (0-2 yrs)" value="Entry"></v-radio> 
                                            <v-radio label="Intermediate (3-5 yrs)" value="Intermediate"></v-radio> 
                                            <v-radio label="Advanced (6+ yrs)" value="Advanced"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                            </v-container>  
                        </v-form>
                    </v-layout>
                    <!--submit button-->
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="submit">Submit</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--completion step-->
                <v-stepper-content step="2">
                    <thanks></thanks>
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="/" router>Home</v-btn> 
                    </v-layout>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
    
</template>

<script>
    import axios from 'axios'
    import Thanks from '@/components/thanks'
    export default {
        data() {
            return {
                surveyName: 'Entry Survey',
                step: 1, 
                responses: {
                    heard: '',
                    next: '' 
                },
                grades: ['E1','E2','E3','E4','E5','E6','E7','E8','E9','O1','O2','O3','O4','O5','O6'],
                branches: ['Air Force','Army','Marines','Navy'],
                statuses: ['Active','Guard','Reserve']
            }
        },
        components: {
            'thanks': Thanks           
        },
        methods: {
            submit: function() {
                console.log(this.responses)
                this.step = 2  
            } 
        }
    }
</script>

<style scoped>
    
</style>
