<template>
    <div class="pagination">
        <span
            :class="['pagination__item',{'pagination__item_disabled':currentPage===1}]"
            @click="()=>{
                if(currentPage===1){
                    return
                }
                changePage(currentPage-1)
            }"
        >
            <i class="el-icon-arrow-left"></i>
        </span>
        <ul class="pagination__list">
            <li
                :class="['pagination__item',{'pagination__item_active':currentPage===1}]"
                @click="changePage(1)"
            >1</li>
            <li
                v-show="totalPage>pageCount&&numList[0]>2"
                class="pagination__item"
                @click="changePage(currentPage-pageCount+2)"
            >...</li>
            <li
                v-for="(item, i) in numList"
                :key="i"
                :class="['pagination__item',{'pagination__item_active':currentPage===item}]"
                @click="changePage(item)"
            >
                {{item}}
            </li>
            <li
                v-show="totalPage>pageCount&&numList[numList.length-1]<totalPage - 1"
                @click="changePage(currentPage+pageCount-2)"
                class="pagination__item"
            > ...</li>
            <li
                v-show="totalPage>1"
                :class="['pagination__item',{'pagination__item_active':currentPage===totalPage}]"
                @click="changePage(totalPage)"
            >
                {{totalPage}}
            </li>
        </ul>
        <span
            :class="['pagination__item',{'pagination__item_disabled':currentPage>=totalPage}]"
            @click="()=>{
                if(currentPage>=totalPage){
                    return
                }
                changePage(currentPage+1)
            }"
        >
            <i class="el-icon-arrow-right"></i>
        </span>
    </div>
</template>

<script>
/** 分页组件
 * props:
 *  totalPage 总页数
 *  currentPage 当前页
 *  pageCount 分页最大的页码按钮个数
 * @click(newPage)：提供点击事件
 */

export default {
    name: 'BasePagination',
    props: {
        totalPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        pageCount: {
            type: Number,
            default: 6
        }
    },
    computed: {
        numList () {
            let list = []
            for (let i = 0, num = this.currentPage - 2 < 2 ? 2 : this.currentPage - 2; i < this.pageCount - 2; i++, num++) {
                if (num >= this.totalPage) {
                    break
                }
                list.push(num)
            }
            return list
        }
    },
    methods: {
        changePage (newNum) {
            if (this.currentPage === newNum) {
                return
            }
            this.$emit('click', newNum)
        }
    }
}
</script>


<style scoped>
    .pagination {
        font-size: 0.15rem;
    }

    .pagination__list {
        display: inline-block;
        list-style: none;
    }

    .pagination__item {
        display: inline-block;
        margin-right: 0.667em;
        padding: 0.333em 0.667em;
        color: #606266;
        background: #F0F2F5;
        border-radius: 0.133em;
        cursor: pointer;
        user-select: none;
    }

    .pagination__item_active {
        color: #ffffff;
        background: #4032B0;
    }

    .pagination__item_disabled {
        cursor: default;
    }
</style>
