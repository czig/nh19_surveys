<template>
    <v-container grid-list-md>
        <v-layout row mb-4>
            <div class="title">Welcome to the surveys for New Horizons 2019!</div>
        </v-layout>
        <v-layout row>
            <v-flex xs4>
                <v-hover>
                    <v-card slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            style="cursor: pointer"
                            @click="$router.push('entrySurvey')">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-3">Entry Survey</h3>    
                                <div class="subheading">
                                    For in-processing personnel (or for those who haven't taken an entry survey yet) 
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat 
                                    color="primary" 
                                    to="/entrySurvey" router>Begin</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex xs4>
                <v-hover>
                    <v-card slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            style="cursor: pointer"
                            @click="$router.push('campSurvey')">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-3">Camp Survey</h3>    
                                <div class="subheading">
                                    Mid-term survey for advising the commander 
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat 
                                    color="primary" 
                                    to="/campSurvey" router>Begin</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>
            <v-flex xs4>
                <v-hover>
                    <v-card slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            style="cursor: pointer"
                            @click="$router.push('exitSurvey')">
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-3">Exit Survey</h3>    
                                <div class="subheading">
                                    For out-processing personnel 
                                </div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat 
                                    color="primary" 
                                    to="/exitSurvey" router>Begin</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
export default {
    
}

</script>


<style scoped>

</style>
