<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="left-top">
          <div class="user">
            <img :src="userImg" alt="" />
            <div class="user-info">
              <p class="name">ivanl001</p>
              <p class="access">admin</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间：<span>2020-08-20</span></p>
            <p>上次登陆地点：<span>shanghai</span></p>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          class="left-bottom"
          style="height: 555px; margin-top: 20px"
        >
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>

          <!--          <div v-for="(val, index) in tableLabel" :key="index">{{index}}</div>-->
        </el-card>
      </el-col>

      <el-col :span="16">
        <div class="num">
          <el-card
            shadow="hover"
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ backgroundColor: item.color }"
            ></i>
            <div class="detail">
              <p class="number">$ {{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>

        <el-card shadow="hover">
          <!--<div style="height: 280px">abc</div>-->
          <!-- <e-charts
            style="height: 280px"
            :chartData="echartData.order"
          ></e-charts>-->
          <i-m-echarts
            style="height: 280px"
            :echartData="allEchartData.order"
          ></i-m-echarts>
        </el-card>

        <div class="right-bottom">
          <el-card shadow="hover">
            <!--<div style="height: 260px"></div>-->
            <i-m-echarts
              style="height: 260px"
              :echartData="allEchartData.user"
            ></i-m-echarts>
          </el-card>
          <el-card shadow="hover">
            <!--<div style="height: 260px"></div>-->
            <i-m-echarts
              style="height: 260px"
              :echartData="allEchartData.videos"
              :isAxisChart="false"
            ></i-m-echarts>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IMEcharts from "../../utils/IMEcharts";
export default {
  name: "Home",
  components: {
    IMEcharts
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      tableData: [],
      allEchartData: {
        order: {
          label: [],
          data: []
        },
        user: {
          label: [],
          data: []
        },
        videos: {
          series: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getStatisticalData").then(res => {
        res = res.data;
        this.tableData = res.data.tableData;
        const order = res.data.orderData;
        this.allEchartData.order.label = order.date;
        //data里面是key-value形式的，所以需要进行处理
        //this.echartData.order.data = order.data;
        let keys = Object.keys(order.data[0]);

        keys.forEach(key => {
          this.allEchartData.order.data.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: "line"
          });
        });

        console.log("vainl000=ddfdaf", res.data.userData);

        // 用户柱状图
        this.allEchartData.user.label = res.data.userData.map(
          item => item.date
        );
        this.allEchartData.user.data.push({
          name: "新增用户",
          data: res.data.userData.map(item => item.new),
          type: "bar"
        });
        this.allEchartData.user.data.push({
          name: "活跃用户",
          data: res.data.userData.map(item => item.active),
          type: "bar",
          barGap: 0
        });

        console.log("user_data:", this.allEchartData.user);

        // 视频饼图
        this.allEchartData.videos.series.push({
          data: res.data.videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {
    //这里是页面已经渲染好了，再去请求，所以把数据请求放在create里面
    /*this.$http.get("/home/getStatisticalData").then(res => {
      console.log(res.data);
    });*/
  }
};
</script>

<style lang="scss" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 100%;
      margin-right: 20px;
    }
    .user-info {
      /*background-color: rosybrown;*/
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999;
      }
    }
  }

  .login-info {
    /*background-color: #33aef0;*/
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 40px;
      }
    }
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
      .icon {
        font-size: 30px;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
      }
      .detail {
        /*background-color: blue;*/
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .number {
          font-size: 25px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          color: #999;
        }
      }
    }
  }

  .right-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card {
      width: 48%;
    }
  }
}
</style>
