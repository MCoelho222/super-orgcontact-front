<template>
    <div class="statsdiv">
        <p id="initial-msg">Most of your contacts are from...</p>
        <p id="top-domain">{{ top.domain }}</p>
        <div id="g-pie-chart" class="container-fluid">
            <GChart type="PieChart" :data="chartData" :options="chartOptions.chart"></GChart>
        </div>
    
    </div>
</template>
<script>
import { GChart } from 'vue-google-charts'

export default {
    components: {
        GChart
    },
    data() {
        return {
            chartData: [],
            chartOptions: {
                chart: {
                    title: 'Contacts by Domain',
                    width: 1500,
                    height: 500
                }
            },
            top: {}
        }
    },
    methods: {

    },
    computed: {

    },
    mounted() {
        let data = localStorage.getItem('people')
        if (data != null) {
            let contacts = JSON.parse(data).contacts

            let contactsKeys = Object.keys(contacts)
            let chartLegend = ['Domain', 'Total']
            this.chartData.push(chartLegend)
            let top = {
                'domain': null,
                'total': 0
                }
            contactsKeys.forEach(item => {
                const domainArray = contacts[item]
                if (domainArray.length > top.total) {
                    top.domain = item
                    top.total = domainArray.length
                }
                this.chartData.push([item, domainArray.length])
            })
            this.top = top
        } 
    }
}
</script>
<style scoped>
#initial-msg {
    padding-top: 30px;
    font-size: large;
}
#top-domain {
    color:dodgerblue;
    font-weight: bolder;
    animation: mymove 5s infinite;
}
@keyframes mymove {
  50% {font-size: 40px;}
}
</style>