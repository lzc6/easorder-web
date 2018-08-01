<template>
    <section>
        <el-form :inline="true" :model="surrendInfo" :rules="surrendRules">
            <!-- 保单退保 -->
            <el-form-item  prop="policyno" >
                <el-input v-model="surrendInfo.policyno" clearable  visible-change="true" placeholder="请输入保单号" maxlength="22"></el-input>
            </el-form-item>
            <el-button type="query"  v-bind:disabled="checkDisabled" @click="surrend">提交</el-button>
        </el-form>               
    </section>
</template>

<script>
export default {
    
    data(){
        var checkPolicyno = (rule, value, callback) =>{
            if(value.length !== 22){
                callback(new Error('保单号必须为22位'))
                this.checkDisabled = true
            }else{
                this.checkDisabled = false
            }
        }
        return{
            checkDisabled: true,
            surrendInfo:{
                policyno: ''
            },
            surrendRules:{ // 规则校验
                policyno:[
                    {validator: checkPolicyno, trigger: 'change'},
                ],
            },
        }
    },
    methods:{ 
        surrend(){
            let surrendData = {
                policyno : this.surrendInfo.policyno
            }
            
            const loading = this.$loading({
                lock: true,
                text: '退保中，请勿刷新/关闭浏览器！',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            });
            this.$http.post('http://56.145.32.32:8083/webservice/surrend',surrendData,{ emulateJSON: true }).then((res) => { 
                loading.close()
                this.$message(
                    {
                    message: res.data.message,
                    type: 'error'
                });
           
            }).catch((err)=>{
                loading.close()
                this.$message(
                    {
                    message: '系统出错！请稍后再试或联系管理员！',
                    type: 'error'
                });
            });
        }
    }
}
</script>
