<template>
    <el-card class="box">
        <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
           <!-- 搜索框 -->
              <el-row class="searchArea">
      <el-col :span="24">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
     <el-table  border stripe :data="list" style="width: 100%">
      <!-- 序号 -->
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="goods_name" label="商品名称"></el-table-column>

      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>

      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>

      <el-table-column label="创建日期" width="120">
        <template slot-scope="scope">{{scope.row.add_time | fmtdate}}</template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- 分页组件 -->
    
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="pagesize"
      layout="total,sizes,prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    </el-card>
</template>
<script>
export default {
    data(){
        return {
            searchValue:"",
            list:[],
             pagesize:2,
             total:-1,
             pagenum:1

        }
    },
    created(){
         this.loadData()
    },
    methods:{
  
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.loadData();
    },
    // 当前1页 -> 点击2页 -> 获取第二页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.loadData();
    },
        handleSearch(){},
         async loadData(){
             const {data:resData}=await this.$http.get(
                 `goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}` 
             );
             this.total=resData.data.total;
             this.list=resData.data.goods;
             console.log(this.list)
         }  
        
    }
    
}
</script>
<style>
      .box{
          height: 100%;
          /* width: 100%; */
         
      }
      .searchArea{
           width: 400px;;
          margin-top: 10px;
      }
     .searchArea .searchInput{
          margin-bottom: 20px ;
     }
</style>

