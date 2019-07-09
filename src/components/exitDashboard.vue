<template>
    <v-container fluid>
        <v-dialog
            v-model="showComments"
            width="600">
            <v-card>
                <v-card-title class="headline mb-0 pb-0">{{ questions[activeQuestion] }}
                </v-card-title>
                <v-card-text>
                    <div class="pt-0 mt-0 mb-3 subheading">
                        <div>Members responding with: 
                            <span class="title font-weight-regular">{{ commentFilters.length > 0 ? commentFilters.join(", ") : 'anything' }}</span>
                        </div>
                        <div>Total Responses: 
                            <span class="title font-weight-regular">{{ filteredResponses }}</span>
                        </div>
                        <div>Number of Responses leaving a comment: 
                            <span class="title font-weight-regular">{{ filteredComments }}</span>
                        </div>
                    </div>
                    <v-card v-for="(comment,index) in comments" :key="index" class="mb-1">
                        <v-card-title class="subheading">{{ comment }}</v-card-title> 
                    </v-card>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error"
                           flat
                           @click="showComments = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout row>
            <div>
                <span class="title font-weight-light">Filtered Records:</span>
                <span id="count"></span> 
            </div>
            <v-spacer></v-spacer>
            <v-btn small
                   color="error"
                   @click="resetAll">
                Reset All
            </v-btn>
        </v-layout>
        <v-layout row>
            <v-subheader class="headline">
                Demographics
            </v-subheader>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
            <v-flex xs6 id="grade-barchart">
                <span class="headline">Grade</span>
                <v-btn small
                       style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('grade-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs3 id="branch-barchart">
                <span class="headline">Branch</span>
                <v-btn small
                        style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('branch-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs3 id="status-barchart">
                <span class="headline">Status</span>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('status-barchart')">Reset</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs2 id="role-barchart">
                <span class="headline">Role</span>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('role-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs4 id="days-barchart">
                <span class="headline">Days at Exercise</span>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('days-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs2 id="deployed-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Deployed Previously</span>
                    </template>
                    <span>Have you deployed before?</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('deployed-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs2 id="supported-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Supported Previously</span>
                    </template>
                    <span>Have you supported other New Horizons exercises in the past?</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('supported-barchart')">Reset</v-btn>
            </v-flex>
            <v-flex xs2 id="planning-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Planning Attendance</span>
                    </template>
                    <span>Did you attend any of the planning conferences?</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('planning-barchart')">Reset</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-subheader class="headline">
                Responses 
            </v-subheader>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
            <v-flex xs6 id="deployAbility-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Deploy Ability</span>
                    </template>
                    <span>This exercise improved my ability to deploy and return from deployments.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('deployAbility-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('deployAbility')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="conductingForeign-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Foreign Training</span>
                    </template>
                    <span>Conducting this exercise in a foreign country improved my training/skill development more than a similar exercise in the United States.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('conductingForeign-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('conductingForeign')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="otherServices-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Other Services</span>
                    </template>
                    <span>This exercise improved my ability to work with other services.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('otherServices-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('otherServices')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="partnerNation-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Partner Nation</span>
                    </template>
                    <span>This exercise improved my ability to work with partner nation forces.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('partnerNation-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('partnerNation')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="knowledge-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Knowledge</span>
                    </template>
                    <span>This exercise enhanced my military knowledge, skills, and/or abilities.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('knowledge-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('knowledge')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="utilization-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Utilization</span>
                    </template>
                    <span>I feel that my skillsets were properly utilized to execute the mission.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('utilization-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('utilization')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="training-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Training</span>
                    </template>
                    <span>I was properly trained to execute my assigned tasks.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('training-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('training')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="livingConditions-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Living Conditions</span>
                    </template>
                    <span>I am satisfied with the living conditions in my deployed location.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('livingConditions-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('livingConditions')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="healthNeeds-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Health Needs</span>
                    </template>
                    <span>My mental, physical, social, AND spiritual health needs were satisfied in my deployed location.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('healthNeeds-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('healthNeeds')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="timelyEquipment-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Timely Equipment</span>
                    </template>
                    <span>I was given the right equipment and resources in a timely manner.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('timelyEquipment-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('timelyEquipment')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="neededEquipment-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Needed Equipment</span>
                    </template>
                    <span>I was given all of the equipment and resources I needed to completed my assigned tasks.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('neededEquipment-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('neededEquipment')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="planningRating-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Planning Rating</span>
                    </template>
                    <span>Rate the overall quality of the planning for New Horizons.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('planningRating-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('planningRating')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="commNetworks-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Communication Networks</span>
                    </template>
                    <span>The provided communication networks were sufficient to accomplish the tasks I was assigned.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('commNetworks-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('commNetworks')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="communicate-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Communicate</span>
                    </template>
                    <span>I was able to communicate effectively, both within the Task Force and to outside organizations.</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('communicate-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('communicate')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-subheader class="headline">
                Host Nation Relations 
            </v-subheader>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
            <v-flex xs6 id="socialExchanges-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Social Interactions</span>
                    </template>
                    <span>The social interactions I had with the Guyanese were generally...</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('socialExchanges-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('socialExchanges')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="professionalExchanges-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Professional Interactions</span>
                    </template>
                    <span>The professional interactions I had with the Guyanese were generally...</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('professionalExchanges-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('professionalExchanges')">Comments</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            likertOrdering: {
                "Strongly Disagree": 1,
                "Disagree": 2,
                "Slightly Disagree": 3,
                "Neutral": 4,
                "Slightly Agree": 5,
                "Agree": 6,
                "Strongly Agree": 7,
                "NA": 8,
                "No Response": 9,
            },
            interactionOrdering: {
                "All Negative": 1,
                "More Negative": 2,
                "Equal": 3,
                "More Positive": 4,
                "All Positive": 5,
                "NA": 6
            },
            questions: {
                "deployAbility": "This exercise improved my ability to deploy and return from deployments.",
                "conductingForeign": "Conducting this exercise in a foreign country improved my training/skill development more than a similar exercise in the United States.",
                "otherServices": "This exercise improved my ability to work with other services.",
                "partnerNation": "This exercise improved my ability to work with partner nation forces.",
                "knowledge": "This exercise enhanced my military knowledge, skills, and/or abilities.",


                "utilization": "I feel that my skillsets were properly utilized to execute the mission.",
                "training": "I was properly trained to execute my assigned tasks.",
                "livingConditions": "I am satisfied with the living conditions in my deployed location.",
                "healthNeeds": "My mental, physical, social, AND spiritual health needs were satisfied in my deployed location.",
                "timelyEquipment": "I was given the right equipment and resources in a timely manner.",
                "neededEquipment": "I was given all of the equipment and resources I needed to completed my assigned tasks.",
                "planningRating": "Rate the overall quality of the planning for New Horizons.",
                "commNetworks": "The provided communication networks were sufficient to accomplish the tasks I was assigned.",
                "communicate": "I was able to communicate effectively, both within the Task Force and to outside organizations.",
                "socialExchanges": "The social interactions I had with the Guyanese were generally...",
                "professionalExchanges": "The professional interactions I had with the Guyanese were generally...",
            },
            showComments: false,
            activeQuestion: '',
            comments: [],
            commentFilters: [],
            filteredResponses: 0,
            filteredComments: 0,
        }
    },
    props: {
        data: {
            type: Array,
            required: true,
        },
        loaded: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ndx: function() {
            return crossfilter(this.data) 
        },
    },
    watch: {
        showComments: function(val) {
            if (val == false) {
                this.activeQuestion = ''
                this.comments = []
                this.filteredResponses = 0
                this.filteredComments = 0
                this.commentFilters = []
            }
        }   
    },
    methods: {
        resetAll: function() {
            dc.filterAll()
            dc.redrawAll()
        },
        resetChart: function(id) {
            dc.chartRegistry.list().filter((chart) => {
                return chart.anchorName() == id
            }).forEach((chart) => {
                chart.filterAll()
            }) 
            dc.redrawAll()
        },
        seeComments: function(question) {
            //show dialog
            this.showComments = true   
            //build variables
            this.activeQuestion = question
            var commentName = question + 'Comments'
            //grab chart
            var chart = dc.chartRegistry.list().filter((chart) => {
                var chartId = question + '-barchart'
                return chart.anchorName() == chartId 
            })[0]
            this.commentFilters = _.clone(chart.filters())
            axios.post('http://localhost:5005/api/getExitComment', {
                'comment': commentName,
                'filters': {
                    'columnName': question,
                    'filters': chart.filters()
                } 
            }).then((res) => {
                this.filteredResponses = res.data.data.length
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i][commentName]) {
                        this.comments.push(res.data.data[i][commentName])
                    }
                } 
                this.filteredComments = this.comments.length
            })
        },
        handleNoResponse: function(element) {
            return element || 'No Response';   
        },
        noResponseOrdering: function(element) {
            return element.key === 'No Response' ? 'ZZZ' : element.key;   
        },
        drawCharts: function() {
            var count = this.ndx.groupAll().reduceCount();
            var countND = dc.numberDisplay("#count")
            countND.group(count)
                .formatNumber(d3.format("d"))
                .valueAccessor(d => d)
                .html({
                    one:"<span style=\"color:steelblue; font-size: 20px;\">%number</span>"
                });


            var gradeChart = dc.barChart('#grade-barchart')
            var gradeMargins = {top: 10, right: 10, bottom: 60, left: 40}
            var gradeDim = this.ndx.dimension(d => this.handleNoResponse(d.grade))
            var gradeGroup = gradeDim.group().reduceCount();
            gradeChart
            .dimension(gradeDim)
            .group(gradeGroup)
            .margins(gradeMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var branchChart = dc.barChart('#branch-barchart')
            var branchMargins = {top: 10, right: 10, bottom: 60, left: 40}
            var branchDim = this.ndx.dimension(d => this.handleNoResponse(d.branch))
            var branchGroup = branchDim.group().reduceCount();
            branchChart
            .height(200)
            .dimension(branchDim)
            .group(branchGroup)
            .margins(branchMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var statusChart = dc.barChart('#status-barchart')
            var statusMargins = {top: 10, right: 10, bottom: 60, left: 40}
            var statusDim = this.ndx.dimension(d => this.handleNoResponse(d.status))
            var statusGroup = statusDim.group().reduceCount();
            statusChart
            .height(200)
            .dimension(statusDim)
            .group(statusGroup)
            .margins(statusMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var roleChart = dc.barChart('#role-barchart')
            var roleMargins = {top: 10, right: 10, bottom: 60, left: 40}
            var roleDim = this.ndx.dimension(d => this.handleNoResponse(d.role))
            var roleGroup = roleDim.group().reduceCount();
            roleChart
            .height(275)
            .dimension(roleDim)
            .group(roleGroup)
            .margins(roleMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var daysChart = dc.barChart('#days-barchart')
            var daysMargins = {top: 10, right: 10, bottom: 40, left: 40}
            var daysDim = this.ndx.dimension(d => d.daysAtExercise)
            var daysGroup = daysDim.group().reduceCount();
            daysChart
            .height(275)
            .dimension(daysDim)
            .group(daysGroup)
            .margins(daysMargins)
            .x(d3.scaleLinear().domain([0,d3.max(this.data, d => d.daysAtExercise) + 10]))
            .xUnits(dc.units.integers)
            .brushOn(true)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true);

            var deployedChart = dc.barChart('#deployed-barchart')
            var deployedMargins = {top: 10, right: 10, bottom: 60, left: 40}
            var deployedDim = this.ndx.dimension(d => this.handleNoResponse(d.deployedPreviously))
            var deployedGroup = deployedDim.group().reduceCount();
            deployedChart
            .height(200)
            .dimension(deployedDim)
            .group(deployedGroup)
            .margins(deployedMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var supportedChart = dc.barChart('#supported-barchart')
            var supportedMargins = {top: 10, right: 10, bottom: 50, left: 40}
            var supportedDim = this.ndx.dimension(d => d.supportedPreviously)
            var supportedGroup = supportedDim.group().reduceCount();
            supportedChart
            .height(200)
            .dimension(supportedDim)
            .group(supportedGroup)
            .margins(supportedMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var planningChart = dc.barChart('#planning-barchart')
            var planningMargins = {top: 10, right: 10, bottom: 50, left: 40}
            var planningDim = this.ndx.dimension(d => this.handleNoResponse(d.planningAttendance))
            var planningGroup = planningDim.group().reduceCount();
            planningChart
            .height(200)
            .dimension(planningDim)
            .group(planningGroup)
            .margins(planningMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering(d => this.noResponseOrdering(d))
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var deployAbilityChart = dc.barChart('#deployAbility-barchart')
            var deployAbilityMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var deployAbilityDim = this.ndx.dimension(d => this.handleNoResponse(d.deployAbility))
            var deployAbilityGroup = deployAbilityDim.group().reduceCount();
            deployAbilityChart
            .height(250)
            .dimension(deployAbilityDim)
            .group(deployAbilityGroup)
            .margins(deployAbilityMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var conductingForeignChart = dc.barChart('#conductingForeign-barchart')
            var conductingForeignMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var conductingForeignDim = this.ndx.dimension(d => this.handleNoResponse(d.conductingForeign))
            var conductingForeignGroup = conductingForeignDim.group().reduceCount();
            conductingForeignChart
            .height(250)
            .dimension(conductingForeignDim)
            .group(conductingForeignGroup)
            .margins(conductingForeignMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var otherServicesChart = dc.barChart('#otherServices-barchart')
            var otherServicesMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var otherServicesDim = this.ndx.dimension(d => this.handleNoResponse(d.otherServices))
            var otherServicesGroup = otherServicesDim.group().reduceCount();
            otherServicesChart
            .height(250)
            .dimension(otherServicesDim)
            .group(otherServicesGroup)
            .margins(otherServicesMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var partnerNationChart = dc.barChart('#partnerNation-barchart')
            var partnerNationMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var partnerNationDim = this.ndx.dimension(d => this.handleNoResponse(d.partnerNation))
            var partnerNationGroup = partnerNationDim.group().reduceCount();
            partnerNationChart
            .height(250)
            .dimension(partnerNationDim)
            .group(partnerNationGroup)
            .margins(partnerNationMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var knowledgeChart = dc.barChart('#knowledge-barchart')
            var knowledgeMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var knowledgeDim = this.ndx.dimension(d => this.handleNoResponse(d.knowledge))
            var knowledgeGroup = knowledgeDim.group().reduceCount();
            knowledgeChart
            .height(250)
            .dimension(knowledgeDim)
            .group(knowledgeGroup)
            .margins(knowledgeMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var utilizationChart = dc.barChart('#utilization-barchart')
            var utilizationMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var utilizationDim = this.ndx.dimension(d => this.handleNoResponse(d.utilization))
            var utilizationGroup = utilizationDim.group().reduceCount();
            utilizationChart
            .height(250)
            .dimension(utilizationDim)
            .group(utilizationGroup)
            .margins(utilizationMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var trainingChart = dc.barChart('#training-barchart')
            var trainingMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var trainingDim = this.ndx.dimension(d => this.handleNoResponse(d.training))
            var trainingGroup = trainingDim.group().reduceCount();
            trainingChart
            .height(250)
            .dimension(trainingDim)
            .group(trainingGroup)
            .margins(trainingMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var livingConditionsChart = dc.barChart('#livingConditions-barchart')
            var livingConditionsMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var livingConditionsDim = this.ndx.dimension(d => this.handleNoResponse(d.livingConditions))
            var livingConditionsGroup = livingConditionsDim.group().reduceCount();
            livingConditionsChart
            .height(250)
            .dimension(livingConditionsDim)
            .group(livingConditionsGroup)
            .margins(livingConditionsMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var healthNeedsChart = dc.barChart('#healthNeeds-barchart')
            var healthNeedsMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var healthNeedsDim = this.ndx.dimension(d => this.handleNoResponse(d.healthNeeds))
            var healthNeedsGroup = healthNeedsDim.group().reduceCount();
            healthNeedsChart
            .height(250)
            .dimension(healthNeedsDim)
            .group(healthNeedsGroup)
            .margins(healthNeedsMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var timelyEquipmentChart = dc.barChart('#timelyEquipment-barchart')
            var timelyEquipmentMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var timelyEquipmentDim = this.ndx.dimension(d => this.handleNoResponse(d.timelyEquipment))
            var timelyEquipmentGroup = timelyEquipmentDim.group().reduceCount();
            timelyEquipmentChart
            .height(250)
            .dimension(timelyEquipmentDim)
            .group(timelyEquipmentGroup)
            .margins(timelyEquipmentMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var neededEquipmentChart = dc.barChart('#neededEquipment-barchart')
            var neededEquipmentMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var neededEquipmentDim = this.ndx.dimension(d => this.handleNoResponse(d.neededEquipment))
            var neededEquipmentGroup = neededEquipmentDim.group().reduceCount();
            neededEquipmentChart
            .height(250)
            .dimension(neededEquipmentDim)
            .group(neededEquipmentGroup)
            .margins(neededEquipmentMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var planningRatingChart = dc.barChart('#planningRating-barchart')
            var planningRatingMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var planningRatingDim = this.ndx.dimension(d => this.handleNoResponse(d.planningRating))
            var planningRatingGroup = planningRatingDim.group().reduceCount();
            planningRatingChart
            .height(250)
            .dimension(planningRatingDim)
            .group(planningRatingGroup)
            .margins(planningRatingMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return Number(d.key); 
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var commNetworksChart = dc.barChart('#commNetworks-barchart')
            var commNetworksMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var commNetworksDim = this.ndx.dimension(d => this.handleNoResponse(d.commNetworks))
            var commNetworksGroup = commNetworksDim.group().reduceCount();
            commNetworksChart
            .height(250)
            .dimension(commNetworksDim)
            .group(commNetworksGroup)
            .margins(commNetworksMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var communicateChart = dc.barChart('#communicate-barchart')
            var communicateMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var communicateDim = this.ndx.dimension(d => this.handleNoResponse(d.communicate))
            var communicateGroup = communicateDim.group().reduceCount();
            communicateChart
            .height(250)
            .dimension(communicateDim)
            .group(communicateGroup)
            .margins(communicateMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.likertOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var socialExchangesChart = dc.barChart('#socialExchanges-barchart')
            var socialExchangesMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var socialExchangesDim = this.ndx.dimension(d => this.handleNoResponse(d.socialExchanges))
            var socialExchangesGroup = socialExchangesDim.group().reduceCount();
            socialExchangesChart
            .height(250)
            .dimension(socialExchangesDim)
            .group(socialExchangesGroup)
            .margins(socialExchangesMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.interactionOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

            var professionalExchangesChart = dc.barChart('#professionalExchanges-barchart')
            var professionalExchangesMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var professionalExchangesDim = this.ndx.dimension(d => this.handleNoResponse(d.professionalExchanges))
            var professionalExchangesGroup = professionalExchangesDim.group().reduceCount();
            professionalExchangesChart
            .height(250)
            .dimension(professionalExchangesDim)
            .group(professionalExchangesGroup)
            .margins(professionalExchangesMargins)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .brushOn(false)
            .elasticY(true)
            .yAxisLabel("Count")
            .controlsUseVisibility(true)
            .ordering((d) => {
                return this.interactionOrdering[d.key]
            })
            .on('pretransition',(chart) => {
                chart.selectAll('g.x text')
                     .attr('text-anchor',"end")
                     .attr('transform',"translate(-8,0)rotate(-45)");
            });

        }
    },
    mounted() {
        this.drawCharts()
        dc.renderAll();
        dc.redrawAll();
        console.log('mounted exitDashboard')
    }
}
</script>

<style src="@/../node_modules/dc/dc.css"></style>
<style scoped>
</style>
