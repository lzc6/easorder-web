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
                <el-input-number v-model="policyInfo.unit"  :min="1" :max="4"   @change="count"  ></el-input-number>
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


                <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="applicantInfo.mobile"  placeholder="输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                <el-input v-model="applicantInfo.email"  placeholder="输入邮箱"></el-input>
                </el-form-item>

           

                <el-form-item label="地址：" prop="address"  >
                <el-input v-model="applicantInfo.address"  placeholder="输入地址"   style="width: 1000px;"  autosize></el-input>
                </el-form-item>
                <br>        <!-- 换行 -->
                

                <el-form-item label="性别：" prop="gender">
                <el-select v-model="applicantInfo.gender"  placeholder="选择性别">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                </el-select>
                </el-form-item> 



                <el-form-item label="出生日期：" prop="birthDay">
                <el-date-picker v-model="applicantInfo.birthDay" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item> 




            </el-form>



                 <br>        <!-- 换行 -->

            <a>被保人信息：（必填）</a>
                        <el-button   @click="copy" type="info" round size="mini">同步投保人和被保人信息</el-button>  

            <hr>          <!-- 分割线  -->
            <el-form :inline="true" :model="insuredInfo" :rules="insuredInfoRules">
                <el-form-item label="投保人：" prop="name">
                <el-input v-model="insuredInfo.name"  placeholder="输入姓名"  ></el-input>
                </el-form-item>

                <el-form-item label="证件类型：" prop="idType">
                    <el-select v-model="insuredInfo.idType" placeholder="请选择证件类型">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idNumber">
                <el-input v-model="insuredInfo.idNumber"  placeholder="输入证件号码" clearable></el-input>
                </el-form-item>


                <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="insuredInfo.mobile"  placeholder="输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                <el-input v-model="insuredInfo.email"  placeholder="输入邮箱"></el-input>
                </el-form-item>



                <el-form-item label="地址：" prop="address"  >
                <el-input v-model="insuredInfo.address"  placeholder="输入地址"   style="width: 1000px;"  autosize></el-input>
                </el-form-item>

                <br>

                <el-form-item label="性别：" prop="gender">
                <el-select v-model="insuredInfo.gender"  placeholder="选择性别">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                </el-select>
                </el-form-item> 




                <el-form-item label="出生日期：" prop="birthDay">
                <el-date-picker v-model="insuredInfo.birthDay" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item> 




            </el-form>     
            <el-button type="primary" round @click="insure"> 投保 </el-button>  
            <el-button type="danger" round @click="reset"> 重置 </el-button>


          <!-- 保单信息弹出框 -->
            <el-dialog title="保单信息" :visible.sync="policynoDialog" center  fullscreen  @close="reset" >
        <el-form :inline="true" :model="policyInfo" disabled >

             <el-form-item label="保单号：" >
                <el-input v-model="policyInfo.policyNo"  ></el-input>
            </el-form-item> 

             <el-form-item label="投保单号：" >
                <el-input v-model="policyInfo.proposalNo"  ></el-input>
            </el-form-item>   

               

            <el-form-item label="起保日期：">
                <el-date-picker v-model="policyInfo.startDate" type="date"  @change="getEndDate" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>  

            <el-form-item label="终保日期：">
             <el-date-picker v-model="policyInfo.endDate" type="date"   value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>      

            <el-form-item label="份数（最大4份）：">
                <el-input-number v-model="policyInfo.unit"  :min="1" :max="4"   @change="count"  ></el-input-number>
            </el-form-item> 

            <el-form-item label="总保费：">
                <el-input v-model="policyInfo.sumPremium"  ></el-input>
            </el-form-item>

            <el-form-item label="总保额：">
                <el-input v-model="policyInfo.sumAmount"  ></el-input>
            </el-form-item>
           </el-form>

            <a>投保人信息：</a>
            <hr>          <!-- 分割线  -->
            <el-form :inline="true" :model="applicantInfo" disabled>
                <el-form-item label="投保人：" >
                <el-input v-model="applicantInfo.name" ></el-input>
                </el-form-item>

                <el-form-item label="证件类型：" >
                    <el-select v-model="applicantInfo.idType"  >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  ></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idNumber">
                <el-input v-model="applicantInfo.idNumber"   clearable  ></el-input>
                </el-form-item>

                <el-form-item label="性别：" prop="gender">
                <el-select v-model="applicantInfo.gender"  >
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                </el-select>
                </el-form-item> 




                <el-form-item label="出生日期：" prop="birthDay">
                <el-date-picker v-model="applicantInfo.birthDay" type="date" disabled value-format="yyyy-MM-dd" ></el-date-picker>
                </el-form-item> 

                <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="applicantInfo.mobile"  disabled ></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                <el-input v-model="applicantInfo.email" disabled ></el-input>
                </el-form-item>

  

                <el-form-item label="地址：" prop="address"  >
                <el-input v-model="applicantInfo.address"  disabled   style="width:250%;"  autosize ></el-input>
                </el-form-item>
        
            </el-form>

            <a>被保人信息:</a>
            <hr>          <!-- 分割线  -->
            <el-form :inline="true" :model="insuredInfo" disabled>
                <el-form-item label="投保人：" >
                <el-input v-model="insuredInfo.name"    ></el-input>
                </el-form-item>

                <el-form-item label="证件类型：" >
                    <el-select v-model="insuredInfo.idType"  >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                     </el-select>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idNumber">
                <el-input v-model="insuredInfo.idNumber"  clearable size="mini"></el-input>
                </el-form-item>

                <el-form-item label="性别：" prop="gender">
                <el-select v-model="insuredInfo.gender"   >
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                </el-select>
                </el-form-item> 



                <el-form-item label="出生日期："  >
                <el-date-picker v-model="insuredInfo.birthDay" type="date"  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item> 

                <el-form-item label="手机号码：">
                <el-input v-model="insuredInfo.mobile" ></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" >
                <el-input v-model="insuredInfo.email" ></el-input>
                </el-form-item>


                <el-form-item label="地址："  >
                <el-input v-model="insuredInfo.address"     style="width:250%;"  autosize ></el-input>
                </el-form-item>


            </el-form>                
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="policynoDialog = false">确 定</el-button>
            </div>
            </el-dialog>     


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
           var checkName = (rule, value, callback) =>{
            var reg = /^[\u4E00-\u9FA5]{2,15}$/;
            if(!reg.test(value)){
                callback(new Error('姓名不符合标准'));
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
                        var bornnum1 = code.substr(6,1);
                        var bornnum2 = code.substr(7,1);
                        var bornnum3 = code.substr(8,1);
                        var bornnum4 = code.substr(9,1);
                        var bornnum5 = code.substr(10,1);
                        var bornnum6 = code.substr(11,1);
                        var bornnum7 = code.substr(12,1);
                        var bornnum8 = code.substr(13,1);
                        var g = "-";
                        var bornnum = bornnum1+bornnum2+bornnum3+bornnum4+g+bornnum5+bornnum6+g+bornnum7+bornnum8;
                        this.applicantInfo.birthDay = bornnum;
                        if(sexnum%2==1){
                            this.applicantInfo.gender = "1";
                        }else{
                           this.applicantInfo.gender = "2"; 
                        }
                    }   
            }
        }
            var checkIdnumber2 = (rule, value, callback) =>{
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
                        var bornnum1 = code.substr(6,1);
                        var bornnum2 = code.substr(7,1);
                        var bornnum3 = code.substr(8,1);
                        var bornnum4 = code.substr(9,1);
                        var bornnum5 = code.substr(10,1);
                        var bornnum6 = code.substr(11,1);
                        var bornnum7 = code.substr(12,1);
                        var bornnum8 = code.substr(13,1);
                        var g = "-";
                        var bornnum = bornnum1+bornnum2+bornnum3+bornnum4+g+bornnum5+bornnum6+g+bornnum7+bornnum8;
                        this.insuredInfo.birthDay = bornnum;
                        if(sexnum%2==1){
                            this.insuredInfo.gender = "1";
                        }else{
                           this.insuredInfo.gender = "2"; 
                        }
                    }   
            }
        }          
         var checkPhoneNumber = (rule, value, callback) =>{
                if(!(/^1[34578]\d{9}$/.test(value))){
                    callback(new Error('手机号码格式有误'));
             }
         } 
         var checkEmail = (rule, value, callback) =>{
                    if(value != "") {
                       var  varreg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                        var isok= varreg.test(value);
                        if(!isok) {
                      callback(new Error('邮箱格式有误'));
                            }
                    }
         } 
        return{ 
            listLoading:false,
            policynoDialog:false,

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
            productInfo: {
                pipeCode:"EOP44120001",
                md5EncryptedValue:"x",
                businessUnitCode:"BUC44120001",
                riskCode:"EAA",
                rationType:'EAA440000h',
                premium:"100",
                amount:"75400",
                },            
            policyInfo:{
                policyNo:"",
                proposalNo:"",
                operateTime:"",
                startDate:"",
                endDate:"",
                startHour:"0",
                endHour:"24",
                unit:"",
                insureCount:"1",
                sumPremium:"100",
                sumAmount:"75400",
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
             insuredInfo:{
                name:"",
                idType:"01",
                idNumber:"",
                gender:"",
                birthDay:"",
                mobile:"",
                email:"",
                address:"",
            },                      
            policyInfoRules:{
                startDate:[
                    {required: true, message: '请输入起保日期', trigger: 'change'},
                    {validator: checkStartdate, trigger: 'change'}
                ],
                unit:[
                    {required: true, message: '请选择份数', trigger: 'change'}
                ]
            },
            

            applicantInfoRules:{
                name: [
                    {required: true, message: '请输入姓名', trigger: 'change'},
                    { min: 2, max: 15, message: '姓名至少2个字，至多15个字', trigger: 'change' },
                    {validator: checkName, trigger: 'change'},

                ],
                idType: [
                    {required: true, message: '请选择证件类型', trigger: 'change'}
                    
                ],
                idNumber: [
                    {required: true, message: '请输入证件号码', trigger: 'change'},
                    {validator: checkIdnumber, trigger: 'change'}
                ],
                gender:[
                     {required: true, message: '请选择性别', trigger: 'change'}
                ], 
                birthDay:[
                     {required: true, message: '请输入生日日期', trigger: 'change'}
                ],
                mobile:[
                     {required: true, message: '请输入手机号码', trigger: 'change'},
                     {validator: checkPhoneNumber, trigger: 'change'}
                ],
                email:[
                     {required: true, message: '请输入邮箱', trigger: 'change'},
                     {validator: checkEmail, trigger: 'change'}
                ],
                address:[
                     {required: true, message: '请输入地址', trigger: 'change'}
                ],
            },

            insuredInfoRules:{
                name: [
                    {required: true, message: '请输入姓名', trigger: 'change'},
                    { min: 2, max: 15, message: '姓名至少2个字，至多15个字', trigger: 'change' },
                    {validator: checkName, trigger: 'change'},

                ],
                idType: [
                    {required: true, message: '请选择证件类型', trigger: 'change'}
                    
                ],
                idNumber: [
                    {required: true, message: '请输入证件号码', trigger: 'change'},
                    {validator: checkIdnumber2, trigger: 'change'}
                ],
                gender:[
                     {required: true, message: '请选择性别', trigger: 'change'}
                ], 
                birthDay:[
                     {required: true, message: '请输入生日日期', trigger: 'change'}
                ],
                mobile:[
                     {required: true, message: '请输入手机号码', trigger: 'change'},
                     {validator: checkPhoneNumber, trigger: 'change'}
                ],
                email:[
                     {required: true, message: '请输入邮箱', trigger: 'change'},
                     {validator: checkEmail, trigger: 'change'}
                ],
                address:[
                     {required: true, message: '请输入地址', trigger: 'change'}
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
},
        checkStartdate  () {
            var today = this.getTodayFormatDate();
            if(this.policyInfo.startDate==""){
                        this.$message({
                        message: '起保日期不能为空！',
                         type: 'error'
                    });
                    return false;                       
            }
            else if(this.policyInfo.startDate<=today){
                        this.$message({
                        message: '起保日期不能少于当前日期',
                         type: 'error'
                    });                
                    return false;
            }else{
                return true;
            }
        },
        checkUnit(){
            if(this.policyInfo.unit==undefined){
                        this.$message({
                        message: '投保份数不能为空！',
                         type: 'error'
                    });
                    return false;                  
            }else if(this.policyInfo.unit<0||this.policyInfo.unit>4){
                        this.$message({
                        message: '投保份数不能少于1份或者多于4份！',
                         type: 'error'
                    });
            }else{
                return true;
            }
        },
        checkName  (value) {
            var reg = /^[\u4E00-\u9FA5]{2,15}$/;
            if(!reg.test(value)){
               return true;
            }
        },        
        checkApplicantName(){
            if(this.applicantInfo.name==""){
                        this.$message({
                        message: '投保人姓名不能为空！',
                         type: 'error'
                         
                    });
                     return false;                  
            }else if(this.applicantInfo.name<2||this.applicantInfo.name>15){
                        this.$message({
                        message: '投保人姓名不能少于两个字或大于15个字！',
                         type: 'error'
                    });
                    return false;
            }else if(this.checkName(this.applicantInfo.name)){
                        this.$message({
                        message: '投保人姓名不符合标准！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
            }
        },
        checkInsuredName(){
            if(this.insuredInfo.name==""){
                        this.$message({
                        message: '被保人姓名不能为空！',
                         type: 'error'
                         
                    });
                     return false;                  
            }else if(this.insuredInfo.name<2||this.insuredInfo.name>15){
                        this.$message({
                        message: '被保人姓名不能少于两个字或大于15个字！',
                         type: 'error'
                    });
                    return false;
            }else if(this.checkName(this.insuredInfo.name)){
                        this.$message({
                        message: '被保人姓名不符合标准！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
            }
        },        
        checkIdnumber(idType,idNumber){
            if(idType=="01"){
                    var pass = true;
                    var code = idNumber;
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
                        return true;
                    } 
            }
        },
        checkApplicantIdnumber(){
            var applicantType = this.applicantInfo.idType;
            var aplicantIdnumber = this.applicantInfo.idNumber;
            if(this.checkIdnumber(applicantType,aplicantIdnumber)){
                    this.$message({
                        message: '投保人身份证不符合标准！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
                }
            },
        checkInsuredIdnumber(){
            var insuredType = this.insuredInfo.idType;
            var insuredIdnumber = this.insuredInfo.idNumber;
            if(this.checkIdnumber(insuredType,insuredIdnumber)){
                    this.$message({
                        message: '被保人身份证不符合标准！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
                }
            },            
        checkMobileNumber(value){
             if(!(/^1[34578]\d{9}$/.test(value))){
                 return true;
             }          
        },
        checkApplicantMobile(){
            if(this.checkMobileNumber(this.applicantInfo.mobile)){
                    this.$message({
                        message: '投保人手机号码格式有误！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
                }
        },
        checkInsuredMobile(){
            if(this.checkMobileNumber(this.insuredInfo.mobile)){
                    this.$message({
                        message: '被保人手机号码格式有误！',
                         type: 'error'
                    });
                    return false;
            }
            else{
                return true;
                }
        },
        checkEmail(value){
                var  varreg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                var isok= varreg.test(value);
                if(!isok) {
                return true;
                     }          
        },
        checkApplicantEmail(){
            if(this.checkEmail(this.applicantInfo.email)){
                    this.$message({
                        message: '投保人邮箱格式有误！',
                         type: 'error'
                    });
             return false;
            }else{
                return true;                
            }
        },
        checkInsuredEmail(){
            if(this.checkEmail(this.insuredInfo.email)){
                    this.$message({
                        message: '被保人邮箱格式有误！',
                         type: 'error'
                    });
             return false;
            }else{
                return true;                
            }
        },
        checkAddress(value){
            if(value==""){
                return true;
            }
        },
        checkApplicantAddress(){
             if(this.checkAddress(this.applicantInfo.address)){
                      this.$message({
                        message: '投保人地址不能为空！',
                         type: 'error'
                    });
             return false;              
             }else{
                 return true;
             }
        },
        checkInsuredAddress(){
             if(this.checkAddress(this.insuredInfo.address)){
                      this.$message({
                        message: '被保人地址不能为空！',
                         type: 'error'
                    });
             return false;              
             }else{
                 return true;
             }
        },
        copy(){
            this.insuredInfo.name=this.applicantInfo.name;
            this.insuredInfo.idType=this.applicantInfo.idType;
            this.insuredInfo.idNumber=this.applicantInfo.idNumber;
            this.insuredInfo.gender=this.applicantInfo.gender;
            this.insuredInfo.birthDay=this.applicantInfo.birthDay;
            this.insuredInfo.mobile=this.applicantInfo.mobile;
            this.insuredInfo.email=this.applicantInfo.email;
            this.insuredInfo.address=this.applicantInfo.address;
            this.$message({
                        message: '同步成功！',
                         type: 'success'
                    });

        },
        reset(){
           this.policyInfo.startDate=""
           this.policyInfo.unit="1"
           this.policyInfo.sumPremium="100"
           this.policyInfo.sumAmount="75400"
           

            this.applicantInfo.name=""
            this.applicantInfo.idType="01"
            this.applicantInfo.idNumber=""
            this.applicantInfo.gender=""
            this.applicantInfo.birthDay=""
            this.applicantInfo.mobile=""
            this.applicantInfo.email=""
            this.applicantInfo.address=""


            this.insuredInfo.name=""
            this.insuredInfo.idType="01"
            this.insuredInfo.idNumber=""
            this.insuredInfo.gender=""
            this.insuredInfo.birthDay=""
            this.insuredInfo.mobile=""
            this.insuredInfo.email=""
            this.insuredInfo.address=""

             this.$message({
                        message: '重置成功！',
                         type: 'success'
                    });

        },
        insure(){
            var t = this;
            if(t.checkStartdate()&&t.checkUnit()
            &&t.checkApplicantName()&&t.checkApplicantIdnumber()&&t.checkApplicantMobile()&&t.checkApplicantEmail()&&t.checkApplicantAddress()
            &&t.checkInsuredName()&&t.checkInsuredIdnumber()&&t.checkInsuredMobile()&&t.checkInsuredEmail()&&t.checkInsuredAddress())
            {
                t.policyInfo.operateTime = this.getNowFormatDate();
 				let data = { 
                    pipeCode: this.productInfo.pipeCode,
                    md5EncryptedValue:this.productInfo.md5EncryptedValue,
                    businessUnitCode:this.productInfo.businessUnitCode,
                    riskCode:this.productInfo.riskCode,
                    rationType:this.productInfo.rationType,
                    premium:this.productInfo.premium,
                    amount:this.productInfo.amount,

                    operateTime:this.policyInfo.operateTime,
                    startDate:this.policyInfo.startDate,
                    endDate:this.policyInfo.endDate,
                    startHour:this.policyInfo.startHour,
                    endHour:this.policyInfo.endHour,
                    unit:this.policyInfo.unit,
                    insureCount:this.policyInfo.insureCount,
                    sumPremium:this.policyInfo.sumPremium,
                    sumAmount:this.policyInfo.sumAmount,

                    insurename:this.applicantInfo.name,
                    insureidType:this.applicantInfo.idType,
                    insureidNumber:this.applicantInfo.idNumber,
                    insuregender:this.applicantInfo.gender,
                    insurebirthDay:this.applicantInfo.birthDay,
                    insuremobile:this.applicantInfo.mobile,
                    insureemail:this.applicantInfo.email,
                    insureaddress:this.applicantInfo.address,

                    insuredname:this.insuredInfo.name,
                    insuredidType:this.insuredInfo.idType,
                    insuredidNumber:this.insuredInfo.idNumber,
                    insuredgender:this.insuredInfo.gender,
                    insuredbirthDay:this.insuredInfo.birthDay,
                    insuredmobile:this.insuredInfo.mobile,
                    insuredemail:this.insuredInfo.email,
                    insuredaddress:this.insuredInfo.address
                };   
                        const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中！',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)'
                    });

                    this.$http.post('http://56.145.32.32:8083/webservice/insure',data,{ emulateJSON: true }).then((res) => {
                    loading.close();
                    var code = res.data.code;
                    var message = res.data.message;
                    var policyno = res.data.data;
                    var proposalNo = res.data.data2;

                    if(code=="1"){
                    this.$confirm(message,'',{
                        confirmButtonText: '确定',
                        type:"success",
                        center: true,
                        showCancelButton:false,
                        showClose:false,
                        closeOnClickModal:false
                    }).then(()=>{
                    this.policyInfo.policyNo = policyno;
                    this.policyInfo.proposalNo = proposalNo; 
                    this.policynoDialog = true;
                    // this.reset();
                    })
                }else{
                        this.$confirm(message,'',{
                        confirmButtonText: '确定',
                        type:"error",
                        center: true,
                        showCancelButton:false
                    })
                }
                   }).catch((err)=>{
                       loading.close();
                    this.$message({
                        message: '系统出错！请稍后再试或联系管理员！',
                         type: 'error'
                     });
                     this.listLoading = false;
                   });
                            
                }
            }
        },

}
</script>
