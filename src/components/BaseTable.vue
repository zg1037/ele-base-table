<template>
 <div>
  <el-row type="flex">
   <el-col style="color: red">{{pageTitle}}</el-col>
   <el-pagination
     :pager-count="5"
     @current-change="handleCurrentChange"
     @size-change="handleSizeChange"
     :current-page="pageInfo.currentPage"
     :page-sizes="[5, 10, 15, 20]"
     :page-size="10"
     layout="total, sizes, prev, pager, next, jumper"
     :total="tableData.length"
   >
   </el-pagination>

   <el-button v-for="item in btnList" v-show="btnList" :key="item.title"
              :type="item.iconType"
              size="mini"
              @click="handleInfo(item.type, {})">
    {{item.title}}
   </el-button>
  </el-row>

  <el-table
    :data="tableData"
    stripe
    size="mini"
    class="table"
    height="100%"
    width="100%"
    v-loading="loading"
    style=" margin-top: 5px"
    :row-key="rowID"
    default-expand-all
    :tree-props="{ children: 'children' }"
  >
   <el-table-column align="center" label="序号" width="80">
    <template slot-scope="scope">
     {{ (pageInfo.currentPage - 1) * pageInfo.pageSize + scope.$index + 1 }}
    </template>
   </el-table-column>
   <el-table-column
     v-for="(item, i) in tableColumn"
     :key="item.prop"
     :prop="item.prop"
     :label="item.label"
     :min-width="item.width"
     :align="item.align"
     header-align="center"
     :show-overflow-tooltip="true"
   >
    <template slot="header" slot-scope="scope">
     <el-row>{{ scope.column.label }}</el-row>
     <el-input
       v-if="item.input"
       clearable
       v-model.trim="searchData[i]"
       placeholder="请输入关键词"
       @input="searchTable"
       size="mini"
     />

     <el-select
       clearable
       v-else-if="item.select"
       v-model="searchData[i]"
       size="mini"
       placeholder="请选择"
       @change="searchTable"
     >
      <el-option
        v-for="item in item.options"
        :key="item.value"
        :label="item.label"
        @change="searchTable"
        :value="item.value"
      ></el-option>
     </el-select>
    </template>
    <template slot-scope="scope">
            <span v-if="scope.row[i] && !item.switch && !item.tag">
              {{ scope.row[i] }}
            </span>
     <el-switch
       v-if="item.switch"
       v-model="scope.row[i]"
       @change="switchChange(scope.row)"/>
     <el-tag size="medium" v-if="item.tag"
             :type="scope.row[i]">
      {{ scope.row[i]}}
     </el-tag>
    </template>
   </el-table-column>
   <el-table-column
     label="操作"
     :min-width="Object.keys(operate).length * 50"
     fixed="right"
     align="center"
   >
    <template slot-scope="scope">
     <el-tooltip
       class="item"
       effect="dark"
       :content="item.title"
       placement="left"
       v-for="item in operate"
       :key="item.type"
     >
      <el-button
        :type="item.iconType"
        :icon="item.icon"
        size="mini"
        circle
        @click="handleInfo(item.type, scope.row)"
      ></el-button>
     </el-tooltip>
    </template>
   </el-table-column>
  </el-table>
 </div>
</template>

<script>
    import PageInfo from '@/model/PageInfo';

    /**
     * created by @looper
     * @param {table} 必传
     * @param {tableList} 必传
     * @param {cloneData} 必传
     * @param {loadingTable} 必传
     * @param {id} 用来判断是否是树形结构
     * @param {title} 不必说
     */
    export default {
        name: 'BasePage',
        props: {
            title: {
                // required
                default: '',
                type: String,
            },
            id: {
                default: '',
                type: String,
            },
            table: {
                default: () => {
                },
                type: Object,
            },
            tableList: {
                default: () => [],
                type: Array,
            },
            cloneData: {
                default: () => [],
                type: Array,
            },
            loadingTable: {
                default: false,
                type: Boolean,
            },
        },
        mounted() {

        },
        watch: {
            title(value) {
                this.pageTitle = value;
            },
            id(value) {
                this.rowID = value;
            },
            loadingTable(value) {
                this.loading = value;
            },
            tableList: {
                handler(val) {
                    this.tableData = val;
                },
                deep: true,
            },
            cloneData: {
                handler(val) {
                    this.searchTableData = val;
                },
                deep: true,
            },
        },
        data() {
            return {
                value: 1,
                rowID: this.id,
                btnList: this.table.btnList,
                operate: this.table.options, // 操作
                tableColumn: this.table.table, // 每一行
                tableData: this.tableList, // 绑定的data
                searchTableData: this.cloneData, // 深拷贝搜索用
                searchData: {}, // 搜索绑定值用
                loading: this.loadingTable, // loading
                options: [
                    {
                        value: '选项1',
                        label: '黄金糕',
                    },
                    {
                        value: '选项5',
                        label: '北京烤鸭',
                    },
                ],
                pageTitle: this.title, // 标题
                pageInfo: new PageInfo().page,
            };
        },
        methods: {
            // 根据rowID来判断是不是树形的搜索
            searchTable() {
                const filterTable = []; // 用来保存查到的数组
                const res = JSON.parse(JSON.stringify(this.searchTableData));
                const m = []; // 被搜索的数组
                Object.keys(this.searchData)
                    .forEach((item) => {
                        m.push(item);
                    });
                let table;
                if (this.rowID) {
                    table = this.formatTable(res, []); // 这一步已经改变了res的属性值了,res不能作为最后的保存值
                } else {
                    table = this.searchTableData;
                }
                table.forEach((item) => {
                    for (let i = 0; i < m.length; i += 1) {
                        if (item[m[i]] !== undefined || item[m[i]] !== null) {
                            if (item[m[i]].toString()
                                .indexOf(this.searchData[m[i]]) === -1) {
                                return;
                            }
                        }
                    }
                    filterTable.push(item);
                });
                if (table.length === filterTable.length) {
                    this.tableData = this.searchTableData;
                } else {
                    this.tableData = filterTable;
                }
                this.pageInfo.currentPage = 1;
            },
            // 递归遍历出所有项
            formatTable(tree, arr) {
                for (let i = 0; i < tree.length; i += 1) {
                    arr.push(tree[i]);
                    if (tree[i].children) {
                        this.formatTable(tree[i].children, arr);
                        // eslint-disable-next-line no-param-reassign
                        delete tree[i].children;
                    }
                }
                return arr;
            },
            switchChange(row) {
                this.$emit('switchChange', row);
            },
            handleInfo(type, row) {
                this.$emit('btnClick', type, row);
            },
            handleTable(table) {
                const s = (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize;
                if (table.length === s && table.length !== 0) {
                    this.pageInfo.currentPage -= 1;
                }
                return table.slice(
                    (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize,
                    this.pageInfo.currentPage * this.pageInfo.pageSize,
                );
            },
            handleCurrentChange(value) {
                this.pageInfo.currentPage = value;
            },
            handleSizeChange(value) {
                this.pageInfo.pageSize = value;
                this.pageInfo.currentPage = 1;
            },
        },
    };
</script>

<style scoped>

</style>
