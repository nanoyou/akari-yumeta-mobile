<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)

onMounted(() => {
  // 模拟儿童学习积分数据
  const data = [
    { date: '01-01', score: 10 },
    { date: '02-01', score: 20 },
    { date: '03-01', score: 35 },
    { date: '04-01', score: 50 },
    { date: '05-01', score: 60 }
  ]

  // 提取日期和分数数据
  const dates = data.map((item) => item.date)
  const scores = data.map((item) => item.score)

  // 初始化 ECharts 实例
  const myChart = echarts.init(chart.value)

  // 配置项
  const option = {
    title: {
      textStyle: {
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 分'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '学习积分',
        type: 'line',
        stack: '总量',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#1890ff'
        },
        lineStyle: {
          color: '#1890ff',
          width: 2
        },
        areaStyle: {
          color: 'rgba(24, 144, 255, 0.1)'
        },
        data: scores
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)

  // 监听窗口大小变化，自适应图表大小
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  margin: 20px auto;
}

.chart {
  height: 200px; /* 调整高度 */
}
</style>
