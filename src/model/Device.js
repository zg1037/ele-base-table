/**
 * created by @looper
 */
export default class Device {
    constructor() {
        this.table = {
            deviceID: {
                label: '设备ID',
                width: '100',
                prop: 'deviceID',
            },
            deviceName: {
                label: '仪表名称',
                input: true,
                width: '180',
                prop: 'deviceName',
            },
            deviceTypeName: {
                label: '设备类型',
                input: true,
                width: '180',
                prop: 'deviceTypeName',
            },
            whiteList: {
                label: '白名单',
                select: true,
                width: '200px',
                options: [{
                    label: '否',
                    value: 'false',
                }, {
                    label: '是',
                    value: 'true',
                },
                ],
                switch: true,
                prop: 'WhiteList',
            },
        };
        this.btnList = [
            { title: '新增', type: 'add1', iconType: 'warning' },
        ];
        this.options = {
            edit: {
                title: '修改',
                type: 'edit',
                iconType: 'primary',
                icon: 'el-icon-edit',
            },
            position: {
                title: '点位',
                type: 'position',
                iconType: 'primary',
                icon: 'el-icon-map-location',
            },
            delete: {
                title: '删除',
                type: 'delete',
                iconType: 'danger',
                icon: 'el-icon-delete',
            },
        };
    }

}
