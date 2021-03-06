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
            <v-flex xs6 id="homeSupport-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Home Support</span>
                    </template>
                    <span>{{ questions['homeSupport'] }}</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('homeSupport-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('homeSupport')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="afsouthSupport-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">USSOUTHCOM/AFSOUTH Support</span>
                    </template>
                    <span>{{ questions['afsouthSupport'] }}</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('afsouthSupport-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('afsouthSupport')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="adequateTime-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Adequate Time</span>
                    </template>
                    <span>{{ questions['adequateTime'] }}</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('adequateTime-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('adequateTime')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="deployInfo-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Deployment Information</span>
                    </template>
                    <span>{{ questions['deployInfo'] }}</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('deployInfo-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('deployInfo')">Comments</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 id="readInstructions-barchart">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Read Instructions</span>
                    </template>
                    <span>{{ questions['readInstructions'] }}</span>
                </v-tooltip>
                <v-btn small
                      style="visibility: hidden"
                       class="reset"
                       color="error"
                       @click="resetChart('readInstructions-barchart')">Reset</v-btn>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('readInstructions')">Comments</v-btn>
            </v-flex>
            <v-flex xs6 id="additional">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <span v-on="on" class="headline">Additional Comments</span>
                    </template>
                    <span>{{ questions['additional'] }}</span>
                </v-tooltip>
                <v-btn small
                       color="primary"
                       @click.stop="seeComments('additional')">Comments</v-btn>
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
                "No Response": 8
            },
            questions: {
                "homeSupport": "I was adequately supported by my home station unit to deploy.",
                "afsouthSupport": "I was adequately supported by USSOUTHCOM/AFSOUTH to deploy.",
                "adequateTime": "I received adequate time to accomplish all pre-deployment requirements prior to my departure from my home station.", 
                "deployInfo": "The deployment information I received was clear, concise, and easy to follow.",
                "readInstructions": "I thoroughly read the reporting instructions.",
                "additional": "Do you have any addtional comments?"
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
        handleNoResponse: function(element) {
            return element || 'No Response';   
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
            this.commentFilters = _.clone(chart ? chart.filters() : [])
            axios.post('http://localhost:5005/api/getEntryComment', {
                'comment': commentName,
                'filters': {
                    'columnName': question,
                    'filters': this.commentFilters 
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
            var supportedDim = this.ndx.dimension(d => this.handleNoResponse(d.supportedPreviously))
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

            var homeSupportChart = dc.barChart('#homeSupport-barchart')
            var homeSupportMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var homeSupportDim = this.ndx.dimension(d => this.handleNoResponse(d.homeSupport))
            var homeSupportGroup = homeSupportDim.group().reduceCount();
            homeSupportChart
            .height(250)
            .dimension(homeSupportDim)
            .group(homeSupportGroup)
            .margins(homeSupportMargins)
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

            var afsouthSupportChart = dc.barChart('#afsouthSupport-barchart')
            var afsouthSupportMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var afsouthSupportDim = this.ndx.dimension(d => this.handleNoResponse(d.afsouthSupport))
            var afsouthSupportGroup = afsouthSupportDim.group().reduceCount();
            afsouthSupportChart
            .height(250)
            .dimension(afsouthSupportDim)
            .group(afsouthSupportGroup)
            .margins(afsouthSupportMargins)
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

            var adequateTimeChart = dc.barChart('#adequateTime-barchart')
            var adequateTimeMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var adequateTimeDim = this.ndx.dimension(d => this.handleNoResponse(d.adequateTime))
            var adequateTimeGroup = adequateTimeDim.group().reduceCount();
            adequateTimeChart
            .height(250)
            .dimension(adequateTimeDim)
            .group(adequateTimeGroup)
            .margins(adequateTimeMargins)
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

            var deployInfoChart = dc.barChart('#deployInfo-barchart')
            var deployInfoMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var deployInfoDim = this.ndx.dimension(d => this.handleNoResponse(d.deployInfo))
            var deployInfoGroup = deployInfoDim.group().reduceCount();
            deployInfoChart
            .height(250)
            .dimension(deployInfoDim)
            .group(deployInfoGroup)
            .margins(deployInfoMargins)
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

            var readInstructionsChart = dc.barChart('#readInstructions-barchart')
            var readInstructionsMargins = {top: 10, right: 10, bottom: 80, left: 40}
            var readInstructionsDim = this.ndx.dimension(d => this.handleNoResponse(d.readInstructions))
            var readInstructionsGroup = readInstructionsDim.group().reduceCount();
            readInstructionsChart
            .height(250)
            .dimension(readInstructionsDim)
            .group(readInstructionsGroup)
            .margins(readInstructionsMargins)
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


        }
    },
    mounted() {
        this.drawCharts()
        dc.renderAll();
        dc.redrawAll();
        console.log('mounted entryDashboard')
    }
}
</script>

<style src="@/../node_modules/dc/dc.css"></style>
<style scoped>
</style>
