<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

onMounted(() => {
  // 初始化 ECharts 实例
  const myChart = echarts.init(chart.value);

  const option = {
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260, 220, 236, 195, 245, 214],
        type: 'line'
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  // 监听窗口大小变化，自适应图表大小
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
}

.chart {
  height: 250px; /* 调整高度 */
  margin: 30px 0px 500px 0px;
}
</style>
