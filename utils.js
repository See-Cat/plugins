/** 造个轮子：深度对象克隆,只复制自身属性.
 * 不需要深度克隆情况下 建议使用原生 Object.assign 克隆对象
 * @param {Object|Array} source 被克隆的对象
 * @param {Object|Array} target 目标对象。此参数就是将source复制到target
 * @return {Object|Array} 没有target参数就返回一个新的同source类型的对象。
 */
function deepClone (source, target) {
    if (Object.prototype.toString.call(source) !== '[object Object]' && !Array.isArray(source)) {
        return source
    }
    target = target || (Object.prototype.toString.call(source) === '[object Object]' ? {} : [])
    forEach(source, function (v, k) {
        if (source.hasOwnProperty(k)) {
            target[k] = deepClone(v)
        }
    })

    return target
}

/** 遍历，可遍历对象或数组
 * @param {Object} source 源对象
 * @param {Function} callback 回调函数，函数被调用时依次传入（值，键，源对象）
 */
function forEach (source, callback) {
    if (Array.isArray(source)) {
        for (let i = 0; i < source.length; i++) {
            callback(source[i], i, source)
        }
    } else if (source.toString() === '[object Object]') {
        for (let k in source) {
            callback(source[k], k, source)
        }
    }
}

/** 时间格式化
 * @param {Date} time 时间毫秒数
 * @param {String} form 时间格式模板，不传返回默认时间格式。模板格式例子：`{YY}-{MM}-{DD} {h}:{m}:{s}`
 * @return {String}
 */
function timeFormat (time, form) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let second = date.getSeconds()

    let newTime = form || `${year}-${month}-${day} ${hour}:${min}:${second}`
    if (form) {
        let reg = /(\{YY\})?(\{MM\})?(\{DD\})?(\{h\})?(\{m\})?(\{s\})?/g
        newTime = newTime.replace(reg, (val) => {
            return val === '{YY}' ? year :
                    val === '{MM}' ? month :
                    val === '{DD}' ? day :
                    val === '{h}' ? hour :
                    val === '{m}' ? min :
                    val === '{s}' ? second : val
        })
    }
    return newTime
}

/** 获取根路径 ，粗略版
 * @return {String}
 */
function getRootUrl () {
    let url = ''
    if (window.location.href.indexOf('/iportal/') !== -1) {
        url = `${window.location.protocol}//${window.location.host}/iportal/`
    } else {
        url = `${window.location.protocol}//${window.location.host}/`
    }

    return url
}

/** 删除数组中的值，修改原数组
 * @param {Array} target 目标数组
 * @param {null|[null]} values 需要删除的值，可单个也可多个组成的数组。
 */
function popValue (target, values) {
    let valArr = Array.isArray(values) ? values : [values]
    for (let i = 0; i < valArr.length; i++) {
        let index
        if (typeof Array.prototype.findIndex === 'function') {
            index = target.findIndex((v) => {
                return v === valArr[i]
            })
        } else {
            index = target.indexOf(valArr[i])
        }
        index !== -1 && target.splice(index, 1)
    }
}

/** 获取时间戳
 * @return {String}
 */
function timeStamp () {
    return `t=${(new Date()).getTime()}`
}

/** 将目标替换成星星
 * @param {String|Number} target 需要替换的目标
 * @param {Object} config 配置对象。showNum：需要正常显示的个数，position：both|start|end 正常显示的位置
 * @return {String}
 */
function replaceToStar (target = '', config = { showNum: 7, position: 'both' }) {
    target = String(target)
    let showNum = config.position === 'both' ? Math.ceil(config.showNum / 2) : config.showNum
    let startNum = target.slice(0, showNum)
    let endNum = target.slice(target.length - (config.position === 'both' ? Math.floor(config.showNum / 2) : showNum), target.length)
    let placeholder = '*'.repeat(target.length - config.showNum < 0 ? 0 : target.length - config.showNum)
    let newNum = config.position === 'start' ? `${startNum}${placeholder}` :
            config.position === 'end' ? `${placeholder}${endNum}` : `${startNum}${placeholder}${endNum}`
    return newNum
}

/**
 * 格式化价格
 * @param {String|Nnumber} price
 * @return {String}
 */
function priceFormat (price) {
    let num = isNaN(Number(price)) ? 0 : Number(price)
    return String(num).includes('.') ? String(num) : String(num) + '.00'
}

/** 生成随机数
 * @return {String}
 */
function generateHash () {
    return `${new Date().getTime()}-${(((1 + Math.random()) * 0x10000) | 0).toString(16)}`
}

/**
 * 补充一行的个数
 * @param {Array} items item列表
 * @param {String} className 容器CSS名
 */
function completionRow (context, items, className) {
    let container = Array.from(context.$el.children).find(child => child.className.includes(className)) // 容器
    let rowWidth = container.clientWidth // 容器宽度（相当于一行的宽度）
    let itemElem = container.children[0] // 单个item
    let itemWidth = itemElem.clientWidth // item宽度
    let itemStyles = window.getComputedStyle(context.$el.children[0].children[0])
    let itemMarginTotal = parseFloat(itemStyles.marginLeft) + parseFloat(itemStyles.marginRight)
    let rowItemNum = Math.floor(rowWidth / (itemWidth + itemMarginTotal)) // 一行显示item的个数
    let addNum = rowItemNum - (items.length % rowItemNum === 0 ? items.length : items.length % rowItemNum) // 需要补充item的个数
    if (addNum > 0) {
        for (let i = 0; i < addNum; i++) {
            items.push({
                text: '',
                page: ''
            })
        }
    }
}

/**
 * 查找数组中指定的值
 * @param {Array} arr
 * @param {Function} callback
 * @return {Array} [value, index]
 */
function arrayFind (arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        let boolean = callback(arr[i], i, arr)
        if (boolean) {
            return [arr[i], i]
        }
    }
}

/**
 * 验证手机号格式
 * @param {String|Number} phone 手机号
 */
function verifyPhone (phone) {
    let num = Number(phone)
    if (isNaN(num)) {
        return false
    }
    let reg = /^(\+86|0086)?\s*1[34578]\d{9}$/
    return reg.test(num)
}

export default {
    deepClone,
    forEach,
    timeFormat,
    getRootUrl,
    popValue,
    timeStamp,
    replaceToStar,
    priceFormat,
    generateHash,
    completionRow,
    arrayFind,
    verifyPhone
}
