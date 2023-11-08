<template>
  <div class="card-component">
    <div style="font-weight: bold; color: red">捐款统计</div>
    <div class="chartContainer" ref="chartContainer">
      <div class="chartContent" ref="chartContent">
        <div class="chart" ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
  mounted() {
    this.initChart()
    this.scrollToCurrentMonth()
    this.optimizeScrolling()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart)

      const currentMonthIndex = new Date().getMonth()
      const months = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
      const xAxisData = months.slice(0, currentMonthIndex + 1) // 仅保留当前月份之前的月份数据

      const option = {
        grid: {
          top: 25,
          left: 0,
          right: 0,
          bottom: 20
        },
        xAxis: {
          data: xAxisData,
          axisLabel: {
            interval: 0,
            rotate: 0,
            color: '#000000', // 设置 x 轴标签字体颜色为黑色
            align: 'center' // 设置 x 轴标签居中显示
          }
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: 'Sales',
            type: 'bar',
            data: [
              100, 200, 150, 300, 250, 180, 220, 480, 300, 250, 500, 150
            ].slice(0, currentMonthIndex + 1), // 仅保留当前月份之前的数据
            label: {
              show: true,
              position: 'top',
              formatter: '{c}'
            },
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: 'solid',
              borderColor: '#73c0de',
              shadowColor: '#5470c6',
              shadowBlur: 3,
              color: (params) => {
                // 判断当前项是否为当前月份的柱子，是则返回自定义的颜色，否则返回默认颜色
                return params.dataIndex === currentMonthIndex
                  ? '#FF0000'
                  : '#91cc75'
              }
            },
            markPoint: {
              data: [
                {
                  name: '当前月',
                  coord: [currentMonthIndex, xAxisData[currentMonthIndex]],
                  value: ''
                }
              ],
              itemStyle: {
                color: '#FF0000',
                shadowColor: '#FF0000',
                borderType: 'dashed',
                opacity: 0.5
              }
            }
          }
        ]
      }

      this.chart.setOption(option)
    },
    scrollToCurrentMonth() {
      const currentMonthIndex = new Date().getMonth()
      const containerWidth = this.$refs.chartContainer.offsetWidth
      const monthWidth = containerWidth / 3 // 假设显示3个月
      const scrollLeft = Math.max(0, (currentMonthIndex - 1) * monthWidth)
      this.$refs.chartContent.scrollLeft = scrollLeft // 将 scrollLeft 应用到 chartContent 上
    },
    optimizeScrolling() {
      const totalMonths = 12
      const containerWidth = this.$refs.chartContainer.offsetWidth
      const monthWidth = containerWidth / 3 // 每个月份的宽度，假设显示3个月
      const lastVisibleMonthIndex = Math.floor(containerWidth / monthWidth)

      if (lastVisibleMonthIndex < totalMonths) {
        const scrollOffset = (totalMonths - 3) * monthWidth
        this.$refs.chartContainer.scrollLeft += scrollOffset
      }
    }
  }
}
</script>

<style>
.card-component {
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
  background-color: #e6f3ff; /* 设置为淡蓝色背景 */
}

.chartContainer {
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  margin: 0;
  padding: 0;
}

.chartContent {
  width: 400%; /* 设置为显示12个月份的宽度 */
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
