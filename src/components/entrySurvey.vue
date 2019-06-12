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
                                        <v-radio-group :value="responses.branch"
                                                        @change="v => responses.branch = v"
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
                                        <v-radio-group :value="responses.grade"
                                                        @change="v => responses.grade = v" 
                                                       label="Grade/Rank: "
                                                       column>
                                            <v-radio label="E1-E4" value="E1-E4"></v-radio> 
                                            <v-radio label="E5-E6" value="E5-E6"></v-radio> 
                                            <v-radio label="E7-E9" value="E7-E9"></v-radio> 
                                            <v-radio label="WO1-CW2" value="WO1-CW2"></v-radio>
                                            <v-radio label="CW3-CW4" value="CW3-CW4"></v-radio>
                                            <v-radio label="O1-O3" value="O1-O3"></v-radio>
                                            <v-radio label="O4-O6" value="O4-O6"></v-radio>
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 3-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group :value="responses.status"
                                                        @change="v => responses.status = v" 
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
                                        <v-radio-group :value="responses.role"
                                                        @change="v => responses.role = v"
                                                       label="Role in New Horizons:"
                                                       column>
                                            <v-radio label="Medical" value="Medical"></v-radio> 
                                            <v-radio label="Engineering" value="Engineering"></v-radio> 
                                            <v-radio label="Support" value="Support"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                </v-layout>
                                <v-layout row mt-2>
                                    <!--question 5-->
                                    <v-flex xs12>
                                        <v-text-field :value="responses.daysAtExercise"
                                                        @change="v => responses.daysAtExercise = v"
                                                      label="How many days will you be in Guyana?"
                                                      mask="###"
                                                      >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row my-0 py-0>
                                    <!--question 6-->
                                    <v-flex xs12 my-0 py-0>
                                        <v-radio-group :value="responses.deployedPreviously"
                                                        @change="v => responses.deployedPreviously = v"
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
                                        <v-radio-group :value="responses.supportedPreviously"
                                                        @change="v => responses.supportedPreviously = v"
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
                                        <v-radio-group :value="responses.planningAttendance"
                                                        @change="v => responses.planningAttendance = v"
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
                                        <v-text-field :value="responses.religiousPreference"
                                                        @change="v => responses.religiousPreference = v"
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
                                        <v-radio-group :value="responses.homeSupport"
                                                        @change="v => responses.homeSupport = v"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="homeSupportComments"
                                                    label="Comments"
                                                    :value="responses.homeSupportComments"
                                                    @change="v => responses.homeSupportComments = v">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <div class="subheading" mt-3 mb-0 pb-0>I was adequately supported by USSOUTHCOM/AFSOUTH to deploy.</div>
                                        <v-radio-group :value="responses.afsouthSupport"
                                                        @change="v => responses.afsouthSupport = v"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="afsouthSupportComments"
                                                    label="Comments"
                                                    :value="responses.afsouthSupportComments"
                                                    @change="v => responses.afsouthSupportComments = v">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <div class="subheading" mt-3 mb-0 pb-0>I received adequate time to accomplish all pre-deployment requirements prior to my departure from my home station.</div>
                                        <v-radio-group :value="responses.adequateTime"
                                                        @change="v => responses.adequateTime = v"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                            
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="adequateTimeComments"
                                                    label="Comments"
                                                    :value="responses.adequateTimeComments"
                                                    @change="v => responses.adequateTimeComments = v">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>The deployment information I received was clear, concise, and easy to follow.</p>
                                        <v-radio-group :value="responses.deployInfo"
                                                        @change="v => responses.deployInfo = v"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="deployInfoComments"
                                                    label="Comments"
                                                    :value="responses.deployInfoComments"
                                                    @change="v => responses.deployInfoComments = v">
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap my-0 py-0>
                                    <!--question 5-->
                                    <v-flex xs12 my-0 py-0>
                                        <p class="subheading" mt-3 mb-0>I thoroughly read the reporting instructions.</p>
                                        <v-radio-group :value="responses.readInstructions"
                                                        @change="v => responses.readInstructions = v"
                                                       height="8"
                                                       row>
                                            <v-radio v-for="likertItem of likertScale" :label="likertItem" :value="likertItem" :key="likertItem"></v-radio> 
                                        </v-radio-group>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea solo
                                                    name="readInstructionsComments"
                                                    label="Comments"
                                                    :value="responses.readInstructionsComments"
                                                    @change="v => responses.readInstructionsComments = v">
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
                                                    :value="responses.additionalComments"
                                                    @change="v => responses.additionalComments = v">
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
                        <v-btn color="success" 
                                :loading="submitLoading"
                                :disabled="submitLoading"
                                @click="submit">Submit</v-btn>
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
                submitLoading: false,
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
                    readInstructions: '',
                    readInstructionsComments: '',
                    additionalComments: ''
                },
                likertScale: ['Strongly Disagree','Disagree','Slightly Disagree','Slightly Agree','Agree','Strongly Agree']
            }
        },
        components: {
            'thanks': Thanks,

        },
        methods: {
            submit: function() {
                this.submitLoading = true
                console.log(this.responses)
                axios.post("http://localhost:5005/api/submitEntrySurvey", this.responses)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        this.step = 5  
                    } else {
                        alert('Something went wrong trying to send data to server. Please try again')
                    }
                    setTimeout(() => {
                        this.submitLoading = false 
                    }, 2000)
                })
                .catch((err) => {
                    alert('Something went wrong trying to send data to server. Please try again')
                    this.submitLoading = false 
                })

            }, 
            goToStep: function(step) {
                //scroll to top of page
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.step = step
            }
        },
    }
</script>

<style scoped>
    
</style>
