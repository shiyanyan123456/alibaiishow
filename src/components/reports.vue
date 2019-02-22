<template>
<el-card>
    <cus-bread level1="订单管理" level2="订单列表"></cus-bread>
    <div id="main" style="width:600px; height:400px;" >

    </div>
</el-card>
</template>
<script>
import MyEcharts from "echarts";
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.initEcharts()
    },
    methods:{
        async initEcharts(){
            const myChart = MyEcharts.init(document.getElementById("main"));
           
            const res =await this.$http.get('reports/type/1')
             console.log(res)
             const option2=res.data.data;
             const option1={
           
                title: {
                    text: '我是图片'
                    },
                tooltip: {
                   trrigger:"axis",
                axisPointer:{
                   type:"cross",
                label:{
                   backgroundColor:"#6a7985"
                     }
                   }
                },
               toolbox:{
                feature:{
                   seveAsImage:{}
                  }
               },
            
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
               }
             };
         const option={...option2,...option1}
         myChart.setOption(option);
        }
    }
}
</script>
<style>

</style>


