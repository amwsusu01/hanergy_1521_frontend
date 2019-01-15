<!--人员报表 -->
<template>
    <div :style="{ 'height': documentClientHeight+ 'px'}">
        <iframe id="mainIframe" name="mainIframe" ref="mainIframe" :src="urlTxt" frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {}
    },
    method() {

    },
    mounted() {
        //debugger
        //this.$refs['mainIframe'].src=this.urlTxt;
    },
    computed: {
        documentClientHeight: {
            get() { return this.$store.state.common.documentClientHeight },
            set(val) { this.$store.commit('updateDocumentClientHeight', val) }
        },
        type: {
            get() {
                return this.$route.query.type;
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
                }
            }
        }
    }
}
</script>