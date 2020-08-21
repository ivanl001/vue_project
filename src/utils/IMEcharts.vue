<template>
  <div style="height: 100%" ref="echartsRef">
    echarts
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "IMEcharts",

  props: {
    echartData: {
      type: Object,
      default() {
        return {
          label: [],
          data: []
        };
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },

  //初始化echarts
  methods: {
    initCharts() {
      this.setupChartData();
      if (this.theEcharts) {
        this.theEcharts.setOption(this.options);
      } else {
        this.theEcharts = echarts.init(this.$refs.echartsRef);
        this.theEcharts.setOption(this.options);
      }
    },

    setupChartData() {
      console.log("ivanl001-----------");

      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.echartData.label;
        this.axisOption.series = this.echartData.data;
      } else {
        this.noAxisOption.series = this.echartData.series;
        console.log(this.noAxisOption.series);
      }
    },
    resizeCharts() {
      this.theEcharts ? this.theEcharts.resize() : "";
    }
  },

  mounted() {
    window.addEventListener('resize', this.resizeCharts);
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeCharts);
  },

  computed: {
    options() {
      //这里根据是否是带x轴，然后返回对应的数据
      return this.isAxisChart ? this.axisOption : this.noAxisOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },

  data() {
    return {
      theEcharts: null,
      axisOption: {
        tooltip:{
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine:{
            lineStyle:{
              color: "#17b3a3"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle:{
                color: "#17b3a3"
              }
            }
          },

        ],
        series: [],
        color:['#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089']
      },
      noAxisOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    };
  },

  watch: {
    echartData: {
      handler: function() {
        this.initCharts();
      },
      //这里一定要写这个，要不然监听不到
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeCharts()
      }, 300)
    }
  }
};
</script>

<style scoped></style>
