<template>
    <section>
        <el-form :inline="true" :model="queryInfo" :rules="queryRules">
            <!-- 保单查询 -->
            <el-form-item label="查询条件：">
                <el-select v-model="queryInfo.queryType" @change="selectChange">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="queryCondition" >
                <el-input v-model="queryInfo.queryCondition" clearable  visible-change="true" placeholder="请输入查询条件" maxlength="22"></el-input>
            </el-form-item>
            <el-button type="query"  v-bind:disabled="checkDisabled" @click="Query">查询</el-button>
        </el-form>

        <hr>


        <!-- 查询返回保单列表信息 -->
        <template>
        <el-table  v-show="showQuery"
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="保单号">
                            <span>{{ props.row.policyno }}</span>
                        </el-form-item>
                        <el-form-item label="投保单号">
                            <span>{{ props.row.proposalno }}</span>
                        </el-form-item>
                        <el-form-item label="投保份数">
                            <span>{{ props.row.unit }}</span>
                        </el-form-item>
                        <el-form-item label="保费">
                            <span>{{ props.row.premium }}</span>
                        </el-form-item>
                        <el-form-item label="保额">
                            <span>{{ props.row.amount }}</span>
                        </el-form-item>
                        <el-form-item label="起保时间">
                            <span>{{ props.row.startdate }}</span>
                        </el-form-item>
                        <el-form-item label="终保时间">
                            <span>{{ props.row.enddate }}</span>
                        </el-form-item>
                        <el-form-item label="投保人姓名">
                            <span>{{ props.row.applicantName }}</span>
                        </el-form-item>
                        <el-form-item label="投保人手机">
                            <span>{{ props.row.applicantPhoneNumber }}</span>
                        </el-form-item>
                        <el-form-item label="投保人邮箱">
                            <span>{{ props.row.applicantEmail }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <span>{{ props.row.applicantIdentifyType }}</span>
                        </el-form-item>
                        <el-form-item label="投保人证件">
                            <span>{{ props.row.applicantIdentifyNumber }}</span>
                        </el-form-item>
                        <el-form-item label="投保人地址">
                            <span>{{ props.row.applicantAddress }}</span>
                        </el-form-item>
                        <el-form-item label="被保人姓名">
                            <span>{{ props.row.insuredname }}</span>
                        </el-form-item>
                        <el-form-item label="被保人手机">
                            <span>{{ props.row.phonenumber }}</span>
                        </el-form-item>
                        <el-form-item label="被保人邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <span>{{ props.row.identifytype }}</span>
                        </el-form-item>
                        <el-form-item label="被保人证件">
                            <span>{{ props.row.identifynumber }}</span>
                        </el-form-item>
                        <el-form-item label="被保人地址">
                            <span>{{ props.row.insuredAddress }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                label="保单号"
                prop="policyno">
            </el-table-column>
            <el-table-column
                label="投保人姓名"
                prop="applicantName">
            </el-table-column>
            <el-table-column
                label="投保人地址"
                prop="applicantAddress">
            </el-table-column>
            <el-table-column
                label="投保人邮件"
                prop="applicantEmail">
            </el-table-column>
            <el-table-column
                label="投保人证件号码"
                prop="applicantIdentifyNumber">
            </el-table-column>
        </el-table>
        </template>

    </section>
</template>



<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }
</style>
<script>

export default {
    data(){
        
        var checkQueryCondition = (rule, value, callback) =>{
            if(this.queryInfo.queryType == '0'){ //验证保单号长度
                if(value.length == 0){
                    callback(new Error('保单不能为空'))
                    this.checkDisabled = true                   
                }else if(value.length !== 22){
                    callback(new Error('保单号必须为22位'))
                    this.checkDisabled = true
                }else{
                    this.checkDisabled = false
                }
                
            }else if(this.queryInfo.queryType == "1"){ // 校验身份证
                var pass = true;
                var code = value;
                if(code.length != 18){
                    pass = false;
                }else{
                    code = code.split('');
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17]){
                        // tip = "校验位错误";
                        pass = false;
                    }
                }
                // if(!pass) alert(tip);
                if(pass==false){
                    callback(new Error('身份证格式有误'));
                    this.checkDisabled = true
                }else{
                    this.checkDisabled = false
                }
            }else if(this.queryInfo.queryType == "2"){ //校验名字，必须大于等于2
                if(value.length < 2){
                    callback(new Error('名字必须大于等于2位'))
                    this.checkDisabled = true
                }else{
                    this.checkDisabled = false
                }
            }
        }
        return {
            showQuery: false, // 是否显示查询结果页面
            checkDisabled: true,
            queryInfo:{
                queryType: '0',  // 默认保单号查询
                queryCondition: '',     // 输入的查询条件
            },
            identifyNumber:'',

            tableData: [ // 用于存储返回的保单数据，并展示
            ],
            options: [  // 查询条件类型
                {
                    value: '0',
                    label: '保单号'   
                },
                {
                    value: '1',
                    label: '投保人身份证'
                }, 
                {
                    value: '2',
                    label: '投保人姓名'
                }
            ],
            policyInfo:{  // 保单信息
                policyNo:"",
                proposalNo:"",
                operateTime:"",
                startDate:"",
                endDate:"",
                startHour:"0",
                endHour:"24",
                unit:"",
                insureCount:"1",
                sumPremium:"",
                sumAmount:"",
                identifyType:"",
            },
            applicantInfo:{ // 投保人信息
                name:"",
                idType:"",
                idNumber:"",
                gender:"",
                birthDay:"",
                mobile:"",
                email:"",
                address:"",
            }, 
            insuredInfo:{ // 被保人信息
                name:"",
                idType:"",
                idNumber:"",
                gender:"",
                birthDay:"",
                mobile:"",
                email:"",
                address:"",
            },    
            queryRules:{ // 规则校验
                queryCondition:[
                    {validator: checkQueryCondition, trigger: 'change'},
                ],
            },
        }
    },
    methods:{
        selectChange(){
            this.queryInfo.queryCondition = ''
        },
        Query() {
            let queryData = { //包装数据
                queryType: this.queryInfo.queryType,
                queryCondition: this.queryInfo.queryCondition,
            }

            if(!this.queryInfo.queryCondition){
                        this.$message({
                        message: '请输入查询条件！',
                         type: 'error'
                     });
                return 0
            }
            // 后台查询返回数据
            this.$http.post('http://56.145.32.32:8083/webservice/query',queryData,{ emulateJSON: true }).then((res) => {        
                var code = res.data.code;
                var message = res.data.message;
                var data =  res.data.data;
                console.log(res);

                if(data.length == 0){
                        this.$message({
                        message: '未查询到数据！',
                         type: 'success'
                     });
                }else{
                        this.$message({
                        message: '查询成功！',
                         type: 'success'
                     });
                    this.showQuery = res.data.success;
                    this.tableData = data;
                }              
            }).catch((err)=>{
            console.log(err);
                    this.$message({
                        message: '系统出错！请稍后再试或联系管理员！',
                         type: 'error'
                     });
                   });
                            
        }   
    } 
}



</script>

