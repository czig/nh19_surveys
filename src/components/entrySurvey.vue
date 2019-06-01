<template>
    <v-container fluid>
        <v-layout row mb-2 pb-2>
            <div class="headline">{{surveyName}}</div>
        </v-layout>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Instructions</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Demographics</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">Assessment</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 4" step="4">Additional Comments</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step step="5">Complete</v-stepper-step> 
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
                    </v-layout>
                    <!--navigation buttons-->
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="goToStep(2)">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--survey here-->
                <v-stepper-content step="2">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Demographics</span>
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
                                                      label="How many days will you be in Guyana?"
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
                                <v-layout row my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-text-field v-model="responses.religiousPreference"
                                                      label="Religious Preference"
                                                      >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>  
                        </v-form>
                    </v-layout>
                    <!--submit button-->
                    <v-layout row>
                        <v-btn color="warning" @click="step -= 1">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="goToStep(3)">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--assessment info step-->
                <v-stepper-content step="3">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Assessment</span>
                                <br>
                                <div class="subheading">
                                    Please state how strongly you agree or disagree with the following statements.
                                </div>
                                <v-layout row wrap mt-2 pt-2 mb-0 pb-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <div class="subheading" mt-3 mb-0 pb-0>I was adequately supported by my home station unit to deploy.</div>
                                        <v-radio-group v-model="responses.homeSupport"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="homeSupportComments"
                                                    label="Comments"
                                                    v-model="responses.homeSupportComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <div class="subheading" mt-3 mb-0 pb-0>I was adequately supported by USSOUTHCOM/AFSOUTH to deploy.</div>
                                        <v-radio-group v-model="responses.afsouthSupport"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="afsouthSupportComments"
                                                    label="Comments"
                                                    v-model="responses.afsouthSupportComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <div class="subheading" mt-3 mb-0 pb-0>I received adequate time to accomplish all pre-deployment requirements prior to my departure from my home station.</div>
                                        <v-radio-group v-model="responses.adequateTime"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="adequateTimeComments"
                                                    label="Comments"
                                                    v-model="responses.adequateTimeComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>The deployment information I received was clear, concise, and easy to follow.</p>
                                        <v-radio-group v-model="responses.deployInfo"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
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
                        <v-btn color="warning" @click="step -= 1">Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="goToStep(4)">Continue</v-btn>
                    </v-layout>
                </v-stepper-content>
                <!--final comments-->
                <v-stepper-content step="4">
                    <v-layout row>
                        <v-form>
                            <v-container>
                                <span class="title">Additional Comments</span>
                                <v-layout row wrap mt-2 pt-2 my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>Do you have any additional comments?</p>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="additionalComments"
                                                    label="Comments"
                                                    v-model="responses.additionalComments">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
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
                <v-stepper-content step="5">
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
                    grade: '',
                    branch: '',
                    status: '',
                    role: '',
                    daysAtExercise: 0,
                    deployedPreviously: '',
                    supportedPreviously: '',
                    planningAttendance: '',
                    religiousPreference: '',
                    homeSupport: '',
                    homeSupportComments: '',
                    afsouthSupport: '',
                    afsouthSupportComments: '',
                    adequateTime: '',
                    adequateTimeComments: '',
                    deployInfo: '',
                    deployInfoComments: '',
                    additionalComments: ''
                },
                grades: ['E1','E2','E3','E4','E5','E6','E7','E8','E9','W01','CW2','CW3','CW4','CW5','O1','O2','O3','O4','O5','O6'],
                likertScale: ['Strongly Disagree','Disagree','Slightly Disagree','Slightly Agree','Agree','Strongly Agree']
            }
        },
        components: {
            'thanks': Thanks,

        },
        methods: {
            submit: function() {
                console.log(this.responses)
                axios.post("http://localhost:5005/api/submitEntrySurvey", this.responses)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        this.step = 5  
                    } else {
                        alert('Something went wrong trying to send data to server. Please try again')
                    }
                })
                .catch((err) => {
                    alert('Something went wrong trying to send data to server. Please try again')
                })

            }, 
            goToStep: function(step) {
                //scroll to top of page
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.step = step
            }
        }
    }
</script>

<style scoped>
    
</style>
