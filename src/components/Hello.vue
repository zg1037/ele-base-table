<template>
    <div>
        <base-page :title="title"
                   :table="table"
                   :cloneData="cloneData"
                   :tableList="tableData"
                   :loadingTable="loadingTable"
                   @btnClick="btnClick"
                   @switchChange="switchChange"
                   style="height: 100%"/>
    </div>
</template>

<script>
    import Device from "@/model/Device";

    const BasePage = () => import('@/components/BaseTable');
    const DV = new Device();
    export default {
        name: "Hello",
        components: {
            BasePage
        },
        data() {
            return {
                title: '测试baseTable',
                table: DV,
                tableData: [],
                cloneData: [],
                loadingTable: false,
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            btnClick(type) {
                console.log(type);
            },
            switchChange(type) {
                console.log(type);
            },
            init() {
                this.tableData = [
                    {deviceID: '1', deviceName: '测试1', deviceTypeName: 'hello', whiteList: false},
                    {deviceID: '1', deviceName: '测试2', deviceTypeName: 'hello', whiteList: false},
                    {deviceID: '1', deviceName: '测试3', deviceTypeName: 'hello', whiteList: false},
                    {deviceID: '1', deviceName: '测试4', deviceTypeName: 'hello', whiteList: false},
                    {deviceID: '1', deviceName: '测试5', deviceTypeName: 'hello', whiteList: false},
                ]
                this.cloneData = JSON.parse(JSON.stringify(this.tableData))
            }
        }
    }
</script>

<style scoped>

</style>
