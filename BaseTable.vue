<template>
    <div>
        <table class="base-table" width="100%">
            <thead>
                <tr :class="headerClass">
                    <th
                        v-for="(label,i) in labels"
                        :key="label"
                        :width="widths[i]"
                        :class="tdClass"
                    >
                        {{label}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    :class="bodyClass"
                    v-for="item in data"
                    :key="item.id"
                >
                    <td
                        v-for="prop in properties"
                        :key="prop"
                        :class="tdClass"
                    >
                        <slot v-if="insertProps.includes(prop)" :td="{target:item, prop}"></slot>
                        <div v-else class="base-table__td-item" :title="item[prop]">{{item[prop]}}</div>
                    </td>
                </tr>
                <tr v-if="data.length===0">
                    <td :colspan="labels.length">
                        <slot name="empty"></slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/**
 * props:
 *  headers 表头数组。[{label,prop}] label:表头文本，prop:表头列对应显示数据的属性名
 *  data 表格数据
 *  widths 各个列宽 [10, '10%', 20]
 *  insert 需要插入插槽的行对应的prop,可传单个prop或多个prop组成的数组。插入多个插槽需要自行通过判断来选择显示的内容
 *      例如：通过 <slot-scope="tabel">;table.td.prop==='action';{{table.td.target.label}}
 *  headerClass 表头tr样式
 *  bodyClass  表格tr样式
 *  tdClass td样式
 * @change(value)：支持绑定change事件
 */

export default {
    name: 'BaseTable',
    props: {
        headers: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        widths: {
            type: Array,
            default: () => []
        },
        insert: {
            type: [Array, String],
            default: () => []
        },
        headerClass: String,
        bodyClass: String,
        tdClass: String
    },
    computed: {
        labels () {
            return this.headers.map(obj => obj.label)
        },
        properties () {
            return this.headers.map(obj => obj.prop)
        },
        insertProps () {
            return Array.isArray(this.insert) ? this.insert : [this.insert]
        }
    }
}
</script>

<style scoped>
    .base-table {
        table-layout: fixed;
        border-collapse: collapse;
    }

    .base-table__td-item {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
