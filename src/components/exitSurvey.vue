<template>
    <v-container fluid>
        <v-layout row mb-2 pb-2>
            <div class="headline">{{surveyName}}</div>
        </v-layout>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Instructions</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Demographic Information</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">Assessment Information</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step step="4">Complete</v-stepper-step> 
            </v-stepper-header>
            <v-stepper-items>
                <!--begin-->
                <v-stepper-content step="1">
                    <v-layout row>
                        <span class="title">Instructions</span>
                    </v-layout>
                    <v-layout row mt-4>
                        <div class="subheading">All surveys are anonymous. Demographic information is collected for assessment purposes only and is not reported individually.</div>
                    </v-layout>
                    <v-layout row mt-2>
                        <div class="subheading">Please use the buttons at the bottom of the forms to navigate between steps.</div>
                        <div class="subheading">Thanks for your time!</div>
                    </v-layout>
                    <!--navigation buttons-->
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="step = 2">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--survey here-->
                <v-stepper-content step="2">
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
                                <v-layout row mt-4 pt-2>
                                    <!--question 5-->
                                    <v-flex xs12>
                                        <v-text-field v-model="responses.daysAtExercise"
                                                      label="Days in Country"
                                                      mask="###"
                                                      >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 6-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.deployedPreviously"
                                                       label="Have you deployed before?"
                                                       column>
                                            <v-radio label="Yes" value="Yes"></v-radio> 
                                            <v-radio label="No" value="No"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 7-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.supportedPreviously"
                                                       label="Have you supported other New Horizons exercises in the past?"
                                                       column>
                                            <v-radio label="Yes" value="Yes"></v-radio> 
                                            <v-radio label="No" value="No"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 7-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group v-model="responses.planningAttendance"
                                                       label="Did you attend any of the planning Conferences?"
                                                       column>
                                            <v-radio label="Yes" value="Yes"></v-radio> 
                                            <v-radio label="No" value="No"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                            </v-container>  
                        </v-form>
                    </v-layout>
                    <!--submit button-->
                    <v-layout row>
                        <v-btn color="warning" @click="step -= 1">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="step = 3">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--assessment info step-->
                <v-stepper-content step="3">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Assessment Information</span>
                                <v-layout row wrap mt-2 pt-2 mb-0 pb-0>
                                    <!--question 5-->
                                    <v-flex xs12>
                                        <div class="subheading" mt-3 mb-0 pb-0>This exercise improved my ability to deploy and return from deployments.</div>
                                        <v-radio-group v-model="responses.deployAbility"
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
                                                    name="deployAbilityComments"
                                                    label="Comments"
                                                    v-model="responses.deployAbilityComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout wrap row my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>Conducting this exercise in a foreign country improved my training/skill development more than a similar exercise in the United States.</p>
                                        <v-radio-group v-model="responses.conductingForeign"
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
                                                    name="conductingForeignComments"
                                                    label="Comments"
                                                    v-model="responses.conductingForeignComments">
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
                                        <p class="subheading" mt-3 mb-0>The deployed environment empowers me to execute the mission.</p>
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
                            </v-container>  
                        </v-form>
                    </v-layout>
                    <!--submit button-->
                    <v-layout row>
                        <v-btn color="warning" @click="step -= 1">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="submit">Submit</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--completion step-->
                <v-stepper-content step="4">
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
                surveyName: 'Exit Survey',
                step: 1, 
                responses: {
                    grade: '',
                    branch: '',
                    status: '',
                    role: '',
                    daysAtExercise: 0,
                    deployedPreviously: '',
                    supportedPreviously: '',
                    planningAttendance: '',
                    deployAbility: '',
                    deployAbilityComments: '',
                    conductingForeign: '',
                    conductingForeignComments: '',
                    training: '',
                    trainingComments: '',
                    deployedEnv: '',
                    deployedEnvComments: '',
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
                axios.post("http://localhost:5005/api/submitExitSurvey", this.responses)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        this.step = 4  
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
