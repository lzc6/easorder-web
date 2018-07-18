<template>
    <section>
<el-collapse >
  <el-collapse-item title="产品信息：（点击查看）" >
    <div>
        <hr>        <!-- 分割线  -->


        <el-form :inline="true" :model="productInfo">
        <el-form-item label="险种类型：">
                <el-input  v-model="productInfo.riskCode" readonly></el-input>
        </el-form-item>  

        <el-form-item label="产品代码：">
                <el-input  v-model="productInfo.rationType" readonly></el-input>
        </el-form-item>   

        <el-form-item label="保费：">
                <el-input  v-model="productInfo.premium" readonly></el-input>
        </el-form-item>

        <el-form-item label="保额：">
                <el-input  v-model="productInfo.amount" readonly></el-input>
        </el-form-item>  

        <br>        <!-- 换行 -->


        <el-form-item label="保障内容：">  

        <el-table :data="content"    stripe  style="width: 100%"  border>   
            <el-table-column  prop="item"  label="保障项目"  width="180">  </el-table-column>
            <el-table-column  prop="premium"  label="保费"  width="180">  </el-table-column>
            <el-table-column  prop="amount"  label="保额"  width="180">  </el-table-column>
            <el-table-column  prop="clause"  label="适合中国人民财产保险股份有限公司条款"  width="500">  </el-table-column>
        </el-table>

            </el-form-item>

         
         </el-form>
    </div>
        </el-collapse-item>
    </el-collapse>

         <br>        <!-- 换行 -->


		
        <a>保单信息：（必填）</a>

        <hr>          <!-- 分割线  -->

        <el-form :inline="true" :model="policyInfo" :rules="policyInfoRules">
            <el-form-item label="起保日期：" prop="startDate">
                <el-date-picker v-model="policyInfo.startDate" type="date" placeholder="选择日期" @change="getEndDate" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>  

            <el-form-item label="终保日期：">
             <el-date-picker v-model="policyInfo.endDate" type="date" placeholder="（选择起保，自动带出）" readonly value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>      

            <el-form-item label="份数（最大4份）：" prop="unit">
                <el-input-number v-model="policyInfo.unit"  :min="1" :max="4"   @change="count"></el-input-number>
            </el-form-item> 

            <el-form-item label="总保费：">
                <el-input v-model="policyInfo.sumPremium"  readonly></el-input>
            </el-form-item>

            <el-form-item label="总保额：">
                <el-input v-model="policyInfo.sumAmount"  readonly></el-input>
            </el-form-item>
           </el-form>

            <br>        <!-- 换行 -->

            <a>投保人信息：（必填）</a>
            <hr>          <!-- 分割线  -->
            <el-form :inline="true" :model="applicantInfo" :rules="applicantInfoRules">
                <el-form-item label="投保人：" prop="name">
                <el-input v-model="applicantInfo.name"  placeholder="输入姓名"  ></el-input>
                </el-form-item>

                <el-form-item label="证件类型：" prop="idType">
                    <el-select v-model="applicantInfo.idType" placeholder="请选择证件类型">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idNumber">
                <el-input v-model="applicantInfo.idNumber"  placeholder="输入证件号码" clearable></el-input>
                </el-form-item>

                <el-form-item label="性别：" prop="gender">
                <el-select v-model="applicantInfo.gender"  placeholder="选择性别">
                      <el-option label="男" value="01"></el-option>
                      <el-option label="女" value="02"></el-option>
                </el-select>
                </el-form-item> 

            <br>        <!-- 换行 -->
            <br>        <!-- 换行 -->


                <el-form-item label="出生日期：" prop="birthDay">
                <el-date-picker v-model="applicantInfo.birthDay" type="date" placeholder="选择日期" @change="getEndDate" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item> 

                <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="applicantInfo.mobile"  placeholder="输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                <el-input v-model="applicantInfo.email"  placeholder="输入邮箱"></el-input>
                </el-form-item>

            <br>        <!-- 换行 -->

                <el-form-item label="地址：" prop="address"  >
                <el-input v-model="applicantInfo.address"  placeholder="输入地址"   style="width: 1000px;"  autosize></el-input>
                </el-form-item>


            </el-form>


    </section>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import moment from "moment"

export default {
    data() {
           var checkStartdate = (rule, value, callback) =>{
            var today = this.getTodayFormatDate();
            if(value<=today){
                callback(new Error('起保日期必须大于当前日期'));
            }
        }
           var checkIdnumber = (rule, value, callback) =>{
            var idType = this.applicantInfo.idType;
            if(idType=="01"){
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
                    }else{
                        var code = value;
                        var sexnum = code.substr(-2,1);
                        var bornnum = code.substr(6,8);
                        this.applicantInfo.birthDay = bornnum;
                        console.log(bornnum);
                        if(sexnum==1){
                            this.applicantInfo.gender = "01";
                        }else{
                           this.applicantInfo.gender = "02"; 
                        }
                    }   
            }
        }   
        var check 
        return{ 
            productInfo: {
                riskCode:"EAA",
                rationType:'EAA440000h',
                premium:"100",
                amount:"75400",
                pipeCode:"EOP44120001"
                },
            content:[
                {
                item:"扩展超龄人员：",
                premium:"2",
                amount:"0",
                clause:"附加超龄人员保险条款"
                },
                 {
                item:"意外身故、残疾给付：",
                premium:"43",
                amount:"50000",
                clause:"意外伤害保险条款"
                },
                {
                item:"意外医疗费用补偿：",
                premium:"40",
                amount:"20000",
                clause:"附加意外伤害医疗保险条款（2009版）"
                },   
                {
                item:"意外住院津贴：",
                premium:"15",
                amount:"5400",
                clause:"附加意外伤害住院津贴保险条款（2009版）"
                },                                            
            ],
            policyInfo:{
                operateTime:"",
                startDate:"",
                endDate:"",
                startHour:"0",
                endHour:"24",
                unit:"1",
                insureCount:"1",
                sumPremium:"100",
                sumAmount:"75400",
            },
            policyInfoRules:{
                startDate:[
                    {required: true, message: '请输入起保日期', trigger: 'blur'},
                    {validator: checkStartdate, trigger: 'blur'}
                ],
                unit:[
                    {required: true, message: '请选择份数', trigger: 'blur'}
                ]
            },
            



            applicantInfo:{
                name:"",
                idType:"01",
                idNumber:"",
                gender:"",
                birthDay:"",
                mobile:"",
                email:"",
                address:"",
            },
            applicantInfoRules:{
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    { min: 4, max: 30, message: '姓名至少2个字，至多15个字', trigger: 'blur' }
                ],
                idType: [
                    {required: true, message: '请选择证件类型', trigger: 'blur'}
                    
                ],
                idNumber: [
                    {required: true, message: '请输入证件号码', trigger: 'blur'},
                    {validator: checkIdnumber, trigger: 'blur'}
                ],
                gender:[
                     {required: true, message: '请选择性别', trigger: 'blur'}
                ], 
                birthDay:[
                     {required: true, message: '请输入生日日期', trigger: 'blur'}
                ],
                mobile:[
                     {required: true, message: '请输入手机号码', trigger: 'blur'}
                ],
                email:[
                     {required: true, message: '请输入邮箱', trigger: 'blur'}
                ],
                address:[
                     {required: true, message: '请输入地址', trigger: 'blur'}
                ],
            },
            options: [{
                value: '01',
                label: '身份证'
                }, {
                value: '02',
                label: '户口本'
                }, {
                value: '03',
                label: '护照'
                }, {
                value: '04',
                label: '军官证'
                }, {
                value: '07',
                label: '港澳居民身份证'
                },{
                value: '25',
                label: '港澳居民来往内地通行证'
                },{
                value: '26',
                label: '台湾居民来往内地通行证'
                },
                ],
                }

    },
    
    methods:{
        
        getEndDate(){
     
        var  startDate = this.policyInfo.startDate;
        var endDate = this.addDate(startDate);
        this.policyInfo.endDate = endDate;
        },
        addDate(date){
           var d=new Date(date); 
           var year=d.getFullYear()+1;
            var month=d.getMonth()+1;
            if(month<10){
                month  = "0"+month;
            } 
            var day = d.getDate()-1;
            if(day<10){
                day = "0"+day;
            } 
            var val = year+"-"+month+"-"+day; 
            return val;     
        },
        count(){
            var sumPremium = this.policyInfo.unit * 100;
            this.policyInfo.sumPremium = sumPremium;
            var sumAmount = this.policyInfo.unit * 75400;
            this.policyInfo.sumAmount = sumAmount;
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
                }
            if (strDate >= 0 && strDate <= 9) {
                 strDate = "0" + strDate;
                }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
            var now =  currentdate +":000"
            return now;
},
        getTodayFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
                }
            if (strDate >= 0 && strDate <= 9) {
                 strDate = "0" + strDate;
                }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            return currentdate;
}
    }
    
}
</script>
