<template>
    <v-container fluid>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Demographic Information</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Assessment Information</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step step="3">Complete</v-stepper-step> 
            </v-stepper-header>
            <v-stepper-items>
                <!--survey here-->
                <v-stepper-content step="1">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Demographic Information</span>
                                <v-layout row>
                                    <!--question 1-->
                                    <v-flex xs12>
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
                                                       column>
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
                                                       column>
                                            <v-radio label="Active" value="Active"></v-radio> 
                                            <v-radio label="Guard" value="Guard"></v-radio> 
                                            <v-radio label="Reserve" value="Reserve"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 4-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.role"
                                                       label="Role:"
                                                       hint="Please select your role in New Horizons." 
                                                       persistent-hint
                                                       column>
                                            <v-radio label="Medical" value="Medical"></v-radio> 
                                            <v-radio label="Engineering" value="Engineering"></v-radio> 
                                            <v-radio label="Support" value="Support"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                            </v-container>  
                        </v-form>
                    </v-layout>
                    <!--submit button-->
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="step = 2">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--assessment info step-->
                <v-stepper-content step="2">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Assessment Information</span>
                                <v-layout row wrap mt-2 pt-2 mb-0 pb-0>
                                    <!--question 5-->
                                    <v-flex xs12>
                                        <div class="subheading" mt-3 mb-0 pb-0>I have the right skill sets to execute the mission.</div>
                                        <v-radio-group v-model="responses.skillSets"
                                                       height="8"
                                                       row>
                                            <v-radio label="Strongly Disagree" value="Strongly Disagree"></v-radio> 
                                            <v-radio label="Disagree" value="Disagree"></v-radio> 
                                            <v-radio label="Slightly Disagree" value="Slightly Disagree"></v-radio> 
                                            <v-radio label="Slightly Agree" value="Slightly Agree"></v-radio> 
                                            <v-radio label="Agree" value="Agree"></v-radio> 
                                            <v-radio label="Strongly Agree" value="Strongly Agree"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="skillSetsComments"
                                                    label="Comments"
                                                    v-model="responses.skillSetsComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>I have been properly trained to execute my assigned tasks.</p>
                                        <v-radio-group v-model="responses.training"
                                                       height="8"
                                                       row>
                                            <v-radio label="Strongly Disagree" value="Strongly Disagree"></v-radio> 
                                            <v-radio label="Disagree" value="Disagree"></v-radio> 
                                            <v-radio label="Slightly Disagree" value="Slightly Disagree"></v-radio> 
                                            <v-radio label="Slightly Agree" value="Slightly Agree"></v-radio> 
                                            <v-radio label="Agree" value="Agree"></v-radio> 
                                            <v-radio label="Strongly Agree" value="Strongly Agree"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="trainingComments"
                                                    label="Comments"
                                                    v-model="responses.trainingComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>The deployed environment enhances my ability to execute the mission.</p>
                                        <v-radio-group v-model="responses.deployedEnv"
                                                       height="8"
                                                       row>
                                            <v-radio label="Strongly Disagree" value="Strongly Disagree"></v-radio> 
                                            <v-radio label="Disagree" value="Disagree"></v-radio> 
                                            <v-radio label="Slightly Disagree" value="Slightly Disagree"></v-radio> 
                                            <v-radio label="Slightly Agree" value="Slightly Agree"></v-radio> 
                                            <v-radio label="Agree" value="Agree"></v-radio> 
                                            <v-radio label="Strongly Agree" value="Strongly Agree"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="deployedEnvComments"
                                                    label="Comments"
                                                    v-model="responses.deployedEnvComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout wrap row my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>The deployment information I was given is clear, concise, and easy to follow.</p>
                                        <v-radio-group v-model="responses.deployInfo"
                                                       height="8"
                                                       row>
                                            <v-radio label="Strongly Disagree" value="Strongly Disagree"></v-radio> 
                                            <v-radio label="Disagree" value="Disagree"></v-radio> 
                                            <v-radio label="Slightly Disagree" value="Slightly Disagree"></v-radio> 
                                            <v-radio label="Slightly Agree" value="Slightly Agree"></v-radio> 
                                            <v-radio label="Agree" value="Agree"></v-radio> 
                                            <v-radio label="Strongly Agree" value="Strongly Agree"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="deployInfoComments"
                                                    label="Comments"
                                                    v-model="responses.deployInfoComments">
                                        </v-textarea>
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
                <v-stepper-content step="3">
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
                surveyName: 'Camp Survey',
                step: 1, 
                responses: {
                    grade: '',
                    branch: '',
                    status: '',
                    role: '',
                    skillSets: '',
                    skillSetsComments: '',
                    training: '',
                    trainingComments: '',
                    deployedEnv: '',
                    deployedEnvComments: '',
                    deployInfo: '',
                    deployInfoComments: ''
                },
                grades: ['E1','E2','E3','E4','E5','E6','E7','E8','E9','O1','O2','O3','O4','O5','O6'],
            }
        },
        components: {
            'thanks': Thanks           
        },
        methods: {
            submit: function() {
                console.log(this.responses)
                axios.post("http://localhost:5005/api/submitCampSurvey", this.responses)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        this.step = 3  
                    } else {
                        alert('Something went wrong trying to send data to server. Please try again')
                    }
                })
                .catch((err) => {
                    alert('Something went wrong trying to send data to server. Please try again')
                })

            } 
        }
    }
</script>

<style scoped>
    
</style>
