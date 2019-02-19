<template>
   <el-card class="box">
     <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
     <el-button type="primary" class="btn">添加角色</el-button>
     <!-- 表格 -->
      <el-table :data="roles" style="width:100%">
          <el-table-column type="expand">
             <template slot-scope="scope">
                  <!-- 行列 -->
                  <el-row class="level1" v-for="(item1,i) in scope.row.children" :key="item1.id">
                      <el-col :span="4">
                          <el-tag 
                          @close="deleRigths(scope.row,item1)"
                          closable
                          type="danger">{{item1.authName}}</el-tag>
                          <i class="el-icon-arrow-right"></i>
                      </el-col>
                       <el-col :span="20">
                             <el-row class="level2" v-for="(item2,i) in scope.row.children" :key="item2.id">
                      <el-col :span="4">
                          <el-tag 
                          @close="deleRigths(scope.row,item2)"
                          closable
                          type="info"
                          >{{item2.authName}}</el-tag>
                          <i class="el-icon-arrow-right"></i>
                      </el-col>
                       <el-col :span="20">
                           <el-tag
                            @close="deleRigths(scope.row,item3)"
                            closable
                               v-for="(item3,i) in item2.children"
                               :key="item3.id"
                                type="warning"
                            >{{item3.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
                <el-row v-if="scope.row.children.length===0">
                    <el-col>
                        <span>未分配权限</span>
                    </el-col>
                </el-row>
             </template>
          </el-table-column>
      <el-table-column type="index" label="#" width="160"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
     
    <el-table-column  label="操作" width="200">
      <template slot-scope="scope">

          <el-button 
          type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button
           type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          <el-button
          @click="showDiaSetRights(scope.row)"
           type="success" icon="el-icon-check" circle size="mini" plain></el-button>
      </template>
    </el-table-column>
    </el-table>
     <!-- 对话框 分配权限 -->
     <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <!-- node-key 每个节点唯一标识,值来源于treedata中的key名 -->
       <el-tree
        ref="treeDom"
        :data="treedata"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrCheck"
        :props="defaultProps"
      ></el-tree> 
       
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
    data(){
       return{
           roles:[],
           dialogFormVisible:false,
           treedata:[],
           arrCheck:[],
           defaultProps:{
               label:"authName",
               children:"children"
           },
           currRoleId:-1
       }
    },
    created(){
         this.getRoles();
     },
 methods:{
       async setRights(){
           
       },


    async deleRigths(role,rights){
        console.log(role,rights)
        const res=await this.$http.delete(`roles/${role.id}/rights/${rights.id}`);
         console.log(res)
         const{meta:{msg,status},data}=res.data;
         if(status===200){
             this.$message.success(msg);
             this.getRoles()
         }
     },
    async showDiaSetRights(){
         const res=await this.$http.get(`rights/tree`);
         console.log(res)
         const{
             meta:{msg,status},
             data
         }=res.data;
         if(status===200){
             this.treedata=data;
             const res2=await this.$http.get(`roles`)
             console.log(res2.data.data)
              }
            
           
      
         this.dialogFormVisible=true;
     },
     
     async getRoles(){
         const res=await this.$http.get(`roles`);
         console.log(res)
         this.roles=res.data.data;
        }
     }
   }
</script>
<style>
    .box{
        height: 100%;
    }
    .btn{
        margin-top: 20px;
    }
    .level1{
        margin-bottom: 10px;
    }
    .level2{
        margin-bottom: 10px;
    }
</style>


