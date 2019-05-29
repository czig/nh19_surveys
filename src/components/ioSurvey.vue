<template>
    <v-container fluid>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">IO Survey</v-stepper-step> 
                <v-divider></v-divider>
                <v-stepper-step step="2">Complete</v-stepper-step> 
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form>
                        <v-container>
                            <v-layout row>
                                <v-flex xs4>
                                    Have you heard of New Horizons?
                                    <v-radio-group v-model="heard">
                                        <v-radio label="Yes" value="yes"></v-radio> 
                                        <v-radio label="No" value="no"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                        </v-container>  
                    </v-form>
                    <v-layout row>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="submit">Submit</v-btn>
                    </v-layout>
                </v-stepper-content>
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
               step: 1, 
            }
        },
        components: {
            'thanks': Thanks           
        },
        methods: {
            submit: function() {
                this.step = 2  
            } 
        }
    }
</script>

<style scoped>
    
</style>
