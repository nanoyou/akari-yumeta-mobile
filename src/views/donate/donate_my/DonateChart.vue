<template>
  <div class="card-component">
    <div style="font-weight: bold; color: #1989fa">捐款统计</div>
    <div class="chartContainer" ref="chartContainer">
      <div class="chartContent" ref="chartContent">
        <div class="chart" ref="chart"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import { useUserStore } from '../../../stores/modules/user'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { DonateHistoryDTO } from '@/api/entity'
import instance from '@/api/index'
export default {
  mounted() {
    const currentMonthIndex = new Date().getMonth()
    const chartContentWidth = ((currentMonthIndex + 1) * 100) / 3 + '%' // 计算宽度
    this.$refs.chart.style.width = chartContentWidth // 设置宽度
    this.initChart()
    this.scrollToCurrentMonth()
    this.optimizeScrolling()
    const userStore = useUserStore()
    const userID = computed(() => userStore.user?.id)
    const resultData: Ref<DonateHistoryDTO> = ref<DonateHistoryDTO>({}) // 使用 ref 创建响应式的 resultData
    console.log(userID) // 打印UserID
    const monthlyDonation: number[] = new Array(12).fill(0)
    if (userID.value) {
      console.log('用户已登录')

      instance
        .get(`/donate/${userID.value}/info`, {
          //改为自己的接口地址即可，现在是apifox的mock地址
        })
        .then((result) => {
          console.log('数据：', result)
          console.log('真正的数据：', result.data)
          resultData.value = result.data // 将数据赋值给 resultData

          // 遍历捐助物品的数据
          resultData.value.goods.forEach((donation) => {
            const createdTime = new Date(donation.createdTime)
            const year = createdTime.getFullYear()
            const month = createdTime.getMonth()

            // 只处理今年的数据
            if (!(year === new Date().getFullYear())) {
              //记得把！删掉哦
              // 累加对应月份的捐助金额
              monthlyDonation[month] += donation.totalMoney
            }
          })

          // 遍历捐助资金的数据
          resultData.value.money.forEach((donation) => {
            const createdTime = new Date(donation.createdTime)
            const year = createdTime.getFullYear()
            const month = createdTime.getMonth()

            // 只处理今年的数据
            if (year === new Date().getFullYear()) {
              // 累加对应月份的捐助金额
              monthlyDonation[month] += donation.amount / 100
            }
          })

          console.log(monthlyDonation)
          const option = this.chart.getOption()
          option.series[0].data = monthlyDonation
          this.chart.setOption(option)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('用户未登录，使用测试ID')
      axios
        .get(
          `https://mock.apifox.com/m1/3503500-0-default/donate/{test}/info`,
          {
            //改为自己的接口地址即可，现在是apifox的mock地址
          }
        )
        .then((result) => {
          console.log('数据：', result)
          console.log('真正的数据：', result.data.data)
          resultData.value = result.data.data[0] // 将数据赋值给 resultData

          // 遍历捐助物品的数据
          resultData.value.goods.forEach((donation) => {
            const createdTime = new Date(donation.createdTime)
            const year = createdTime.getFullYear()
            const month = createdTime.getMonth()

            // 只处理今年的数据
            if (!(year === new Date().getFullYear())) {
              // 累加对应月份的捐助金额
              monthlyDonation[month] += donation.totalMoney
            }
          })

          // 遍历捐助资金的数据
          resultData.value.money.forEach((donation) => {
            const createdTime = new Date(donation.createdTime)
            const year = createdTime.getFullYear()
            const month = createdTime.getMonth()

            // 只处理今年的数据
            if (year === new Date().getFullYear()) {
              // 累加对应月份的捐助金额
              monthlyDonation[month] += (donation.amount / 100).toFixed(2)
            }
          })

          console.log(monthlyDonation)
          const option = this.chart.getOption()
          option.series[0].data = monthlyDonation
          this.chart.setOption(option)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // 遍历捐助物品的数据
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
          left: 10,
          right: 10,
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
            barCategoryGap: '20%',
            name: 'Sales',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].slice(
              0,
              currentMonthIndex + 1
            ), // 仅保留当前月份之前的数据
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
                  ? '#0034D9'
                  : '#1989fa'
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
function formatAmount(amount) {
  // 将金额转换为元，并保留两位小数
  const amountInYuan = (amount / 100).toFixed(2)
  return amountInYuan // 返回格式化后的金额
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
  background-color: transparent; /* 设置为淡蓝色背景 */
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
  height: 100%;
}

.chart {
  height: 100%;
}
</style>
