<template>
    <el-card class="box">
        <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

    <!-- 搜索框 -->
    <!-- 让它整体在一行显示 -->
    <el-row class="searchBox">
        <el-col>
            <el-input 
            @clear="getAllUsers()"
            clearable
             class="searchInput" placeholder="请输入内容" v-model="query" >
            <el-button 
            @click="searchUser()"
            slot="append" icon="el-icon-search"></el-button>
            
            </el-input>
            <el-button type="primary" @click="showDiaAddUser()">添加用户</el-button>
        </el-col>
    </el-row>
    
    <!-- 表格 -->
    <el-table :data="list" style="width:100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
     
      <el-table-column  label="创建日期" width="200">
          <template slot-scope="list">
              {{list.row.create_time|fmtdate}}
          </template>
      </el-table-column>


      <el-table-column  label="用户状态" width="120">
        <template slot-scope="scope">
            <el-switch 
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state" 
            active-color="#13ce66" 
            inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>

    <el-table-column  label="操作" width="200">
      <template slot-scope="scope">
          <el-button 
          @click="showDiaEditUser(scope.row)"
          type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button
          @click="showMsgBox(scope.row)"
           type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          <el-button
          @click="showDiaSetRole(scope.row)"
           type="success" icon="el-icon-check" circle size="mini" plain></el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total,sizes,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    

    <!-- 添加用户对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisibleadd">
      <el-form label-position="left" label-width="80px" :model="formdata">
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formdata.email"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="formdata.mobile"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
    <el-button type="primary" @click="addUser()">确 定</el-button>
  </div>
</el-dialog>


 <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="left" label-width="80px" :model="formdata">
  <el-form-item label="用户名">
    <el-input v-model="formdata.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formdata.email"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="formdata.mobile"></el-input>
  </el-form-item>
</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUser()">确 定</el-button>
  </div>
</el-dialog>


<!-- 对话框分配角色 -->
  <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form label-position="left" label-width="80px" :model="formdata">
  <el-form-item label="用户名">
    {{formdata.username}}
  </el-form-item>
  <el-form-item label="角色">
    {{selectVal}}
  <el-select v-model="selectVal" placeholder="请选择角色名称">
    <el-option label="请选择" :value="-1"></el-option>
      <el-option 
      :label="item.roleName"
      :value="item.id"
      v-for="(item,i) in roles" :key="item.id"></el-option>
    </el-select>
    </el-form-item>
</el-form> 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setRole()">确 定</el-button>
  </div>
</el-dialog>
</el-card>
</template>
<script>
export default {
  data() {
    return {
      //搜索关键字
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      list: [],
      dialogFormVisibleadd: false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleRole:false,
      formdata:{
        username:"",
        password:"",
        email:"",
        mobile:""
      },
      selectVal:-1,
      roles:[],
      currUserId:-1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //分配角色---发送请求
   async setRole(){
      const res=await this.$http.put(`users/${this.currUserId}/role`,{
        rid:this.selectVal
      })
      console.log(res)
      const {meta:{msg,status}}=res.data;
      if(status===200){
        this.dialogFormVisibleRole=false;
        this.$message.success(msg);
      }
    },

     //分配角色---显示对话框
    async showDiaSetRole(user){
      this.currUserId=user.id;

      this.formdata=user;
         this.dialogFormVisibleRole=true;
         //获取角色名称
         const res=await this.$http.get(`roles`)
         console.log(res)
         const {meta:{msg,status},data}=res.data;
         if(status===200){
           this.roles=data;
           //console.log(this.roles)
         }
         const res2=await this.$http.get(`users/${user.id}`);
         console.log(res2);
        //  const {meta:{msg2,status2},data2}=res2.data;
        //  if(status===200){
        //   this.selectVal=data2.rid;
        //  }

        this.selectVal=res.data.data.rid;
     },

    //修改状态
  async changeState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      // console.log(res);
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
     },
    //编辑
   async editUser(user){
    
       const res=await this.$http.put(`user/${this.formdata.id}`,
       this.formdata );
       const {
         meta:{msg,status}
       }=res.data;
       if(status===200){
         this.dialogFormVisibleEdit=false;
         this.getTableData()
       }
    },
    showDiaEditUser(user){ 
      this.formdata=user;
      this.dialogFormVisibleEdit=true;
    },

      //删除
    showMsgBox(user) {
      this.$confirm("是否把我删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res=await this.$http.delete(`users/${user.id}`)
          //console.log(res)
          
          const {
            meta:{msg,status}
          }=res.data;
          if(status===200){
            //this.$messfage.success("删除成功");
            this.$message.success(msg);
            this.pagenum=1;
            this.getTableData()
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    

    //添加用户
   async addUser(){
     //获取表单数据
     const res=await this.$http.post(`users`,this.formdata);
     console.log(res)
    //关闭对话框
      this.dialogFormVisibleadd=false;
      //更新列表
      this.getTableData();
   },
    
    //显示对话框
      showDiaAddUser() {
        this.formdata="";
      this.dialogFormVisibleadd = true;
    },

    //清空时获取所有用户
    getAllUsers() {
      this.getTableData();
    },

    // 搜索
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
    },
    // 当前1页 -> 点击2页 -> 获取第二页数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      // console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const { data, meta: { status, msg } } = res.data;
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
        console.log(this.list);
      }
    }
  }
};
</script>
<style>
.searchBox {
  margin-top: 30px;
}
.searchInput {
  width: 400px;
}
</style>

