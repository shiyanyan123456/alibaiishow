<template>
    <el-card class="box-card">   
          <cus-bread level1="商品管理" level2="商品分类"></cus-bread>
            <el-row>
                <el-col :span="24" class="searchArea">
                  <el-button type="success" @click="addGoodsCate()">添加分类</el-button>
                </el-col>
           </el-row>
           <!-- 分类对话框 -->
           <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">
               <el-form :model="form">
                   <el-form-item label="分类名称" :label-width="formLabelWidth">
                      <el-input v-model="form.cat_name" autocomplete="off"></el-input>
                      {{selectedOptions}}
                     <el-cascader
                        expand-trigger="hover"
                        change-on-select
                        clearable
                        :options="caslist"
                        v-model="selectedOptions"
                        :props="defaultProp"
                      ></el-cascader>
                   </el-form-item>
               </el-form>
               <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                  <el-button type="primary" @click="addCate()">确 定</el-button>
                </div>
           </el-dialog>
             <el-table height="300" :data="list" style="width: 100%">
     
      <el-tree-grid
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        label="商品分类"
        width="140"
      ></el-tree-grid>

      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>

      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-else-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    </el-card>
</template>
<script>
import ElTreeGrid from "element-tree-grid";
export default {
        components: {
            // el-tree-grid
         ElTreeGrid
        },
    data(){
        return{

             list: [],
             pagenum: 1,
             pagesize: 10,
             total: 1,
            dialogFormVisibleAdd:false,
            form:{
                cat_pia:-1,
                cat_name:"",
                cat_level:-1
            },
            formLabelWidth: "140px",
            selectedOptions:[],
            caslist:[],
            defaultProp:{
                value: "cat_id",
                label: "cat_name",
                children: "children"
            }

        }
    },
     created() {
    this.getGoodsCate();
  },
    methods:{
              async addCate() {
      // 发送post请求

      // cat_pid: -1, 父id
      // cat_level: -1 当前层级

      // 如果没选择分类 -> 添加一级分类
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      }

      // 如果选了一个分类 -> 添加的是二级分类
      if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0];
        this.form.cat_level = 1;
      }
      // 如果选了两个分类,->添加三级分类
      if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1];
        this.form.cat_level = 2;
      }

      const res = await this.$http.post(`categories`, this.form);
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getGoodsCate();
      }
    },

       async addGoodsCate(){
            const res=await this.$http.get(`categories?type=2`)
            this.caslist=res.data.data;
             this.dialogFormVisibleAdd = true;
        },
        async getGoodsCate(){
            const res=await this.$http.get( `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
             this.list =res.data.data.result;
             console.log(this.list)
             this.total=res.data.data.total;
        },
        handleSizeChange(val){
            this.pagenum=1;
            this.getGoodsCate()
        },
        handleCurrentChange(val){
            this.pagenum=val;
            this.getGoodsCate()
        }
    }

}
</script>
<style>
.box-card{
    height: 100%;
}
     .searchArea{
         margin-top: 20px;
         margin-bottom: 20px;
     }
     .searchArea .searchInput {
        width: 350px;
     }
</style>

