<!--人员报表 -->
<template>
    <div :style="{ 'height': documentClientHeight+ 'px'}">
        <iframe id="mainIframe" name="mainIframe" ref="mainIframe" :src="urlTxt" frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
        }
    },
    methods: {
        initName(){
            switch (Number(this.type)) {
                //在职主页
                case 1:
                    return "在职主页";
                //在职年龄分析
                case 2:
                    return "在职年龄分析";
                //在职学历分析
                case 3:
                    return "在职学历分析";
                //在职职级分析
                case 4:
                    return "在职职级分析";
                //在职司龄分析
                case 5:
                    return "在职司龄分析";
                //入职主页
                case 6:
                    return "入职主页";
                //离职主页
                case 7:
                    return "离职主页";
            }
        },
        initId(){
            switch (Number(this.type)) {
                //在职主页
                case 1:
                    return "118";
                //在职年龄分析
                case 2:
                    return "119";
                //在职学历分析
                case 3:
                    return "120";
                //在职职级分析
                case 4:
                    return "121";
                //在职司龄分析
                case 5:
                    return "122";
                //入职主页
                case 6:
                    return "123";
                //离职主页
                case 7:
                    return "124";
            }
        },
        otherName(){
            switch (Number(this.type)) {
                // 考勤分析
                case 8:
                    return "考勤分析";
                //考勤分析明细
                case 9:
                    return "考勤分析明细";
                //打卡明细分析
                case 10:
                    return "打卡明细分析";
                //考勤综合分析
                case 11:
                    return "考勤综合分析";
                //库存统计报表
                case 12:
                    return "库存统计报表";
                //质量管理驾驶舱
                case 13:
                    return "质量管理驾驶舱";
                //质量成本与效率管理
                case 14:
                    return "质量成本与效率管理";
            }
        },
        otherId(){
            switch (Number(this.type)) {
                // 考勤分析
                case 8:
                    return "126";
                //考勤分析明细
                case 9:
                    return "127";
                //打卡明细分析
                case 10:
                    return "128";
                //考勤综合分析
                case 11:
                    return "129";
                //库存统计报表
                case 12:
                    return "131";
                //质量管理驾驶舱
                case 13:
                    return "143";
                //质量成本与效率管理
                case 14:
                    return "144";
            }
        },
        sendQuery(){
            var childName = this.initName();
            var childId = this.initId();
            var nextName = this.otherName();
            var nextId = this.otherId();

            if(Number(this.type) == 8 || Number(this.type) == 9 || Number(this.type) == 10 || Number(this.type) == 11){
                var params = {
                    data: {
                        userId: this.userObj.userId,
                        userName: this.userObj.username,
                        fullName: this.userObj.name,
                        systemId: "125",//系统id
                        systemName: "人员考勤",
                        menuId: nextId,
                        menuName: nextName,
                        proType: 4
                    },
                    indexName: "1521_operation_log",
                    indexType: "processrecode"
                };
            }else  if(Number(this.type) == 12){
                var params = {
                    data: {
                        userId: this.userObj.userId,
                        userName: this.userObj.username,
                        fullName: this.userObj.name,
                        systemId: "130",//系统id
                        systemName: "供应链仓储管理",
                        menuId: nextId,
                        menuName: nextName,
                        proType: 4
                    },
                    indexName: "1521_operation_log",
                    indexType: "processrecode"
                };
            } else if(Number(this.type) == 12||Number(this.type) == 13){
                var params = {
                    data: {
                        userId: this.userObj.userId,
                        userName: this.userObj.username,
                        fullName: this.userObj.name,
                        systemId: "142",//系统id
                        systemName: "质量分析管理",
                        menuId: nextId,
                        menuName: nextName,
                        proType: 4
                    },
                    indexName: "1521_operation_log",
                    indexType: "processrecode"
                };
            } else{
                var params = {
                    data: {
                        userId: this.userObj.userId,
                        userName: this.userObj.username,
                        fullName: this.userObj.name,
                        systemId: "117",//系统id
                        systemName: "人力报表",
                        menuId: childId,
                        menuName: childName,
                        proType: 4
                    },
                    indexName: "1521_operation_log",
                    indexType: "processrecode"
                };
            }
            this.$api.common.getIframQuery(params).then(res => {
                console.log(res)
            })
        }
    },
    created(){
        this.sendQuery();
    },
    mounted() {
        //debugger
        //this.$refs['mainIframe'].src=this.urlTxt;
    },
    watch: {
        type:{
            handler(val, oldVal){
                if(val != oldVal){
                    this.initName();
                    this.initId();
                    this.otherName();
                    this.otherId();
                    this.sendQuery();
                }
            },
            deep:true
        },
    },

    computed: {
        documentClientHeight: {
            get() { return this.$store.state.common.documentClientHeight },
            set(val) { this.$store.commit('updateDocumentClientHeight', val) }
        },
        type:{
            get(){
                return this.$route.query.type;
            }
        },
        userObj: {
            get(){
                return this.$store.state.common.user;
            }
        },
        urlTxt: {
            get() {
                switch (Number(this.type)) {
                    //在职主页
                    case 1:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/Incumbencyhomepage.html';
                        //在职年龄分析
                    case 2:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/ageanalysis.html';
                        //在职学历分析
                    case 3:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/educationanalysis.html';
                        //在职职级分析
                    case 4:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/rankanalysis.html';
                        //在职司龄分析
                    case 5:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/silinganalysis.html';
                        //入职主页
                    case 6:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/entryhomepage.html';
                        //离职主页
                    case 7:
                        return 'http://192.168.19.212/BigdataPlatform/manpowereport/quithomepage.html';
                        // 考勤分析
                    case 8:
                        return 'http://192.168.19.212/BigdataPlatform/attendence/attendanceanalysis.html';
                        //考勤分析明细
                    case 9:
                        return 'http://192.168.19.212/BigdataPlatform/attendence/attendanceanalysisdetail.html';

                        //打卡明细分析
                    case 10:
                        return 'http://192.168.19.212/BigdataPlatform/attendence/punchcardanalysis.html';

                        //考勤综合分析
                    case 11:
                        return 'http://192.168.19.212/BigdataPlatform/attendence/comprehensiveattendanceanalysis.html';

                        //库存统计BI报表
                    case 12:
                        return 'http://192.168.19.212/BigdataPlatform/SupplyChainWarehousingManagement/inventorystatementreport.html';

                        //质量管理驾驶舱
                    case 13:return 'http://192.168.19.212/BigdataPlatform/qamanage/qualitymanage.html';

                    //质量成本与效率管理
                    case 14:return 'http://192.168.19.212/BigdataPlatform/qamanage/costandefficiency.html';

                }
            }
        }
    }
}
</script>