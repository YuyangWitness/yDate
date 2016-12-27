# 日历插件<br/>
通过javascript编写的日历插件，分为两个版本：1.1版本（yDate）直接调用可以用，1.2版本（yDate2）可以通过一些接口修改其样式。

## yDate.js(1.1版本)可查看index.html<br/>
通过class="Canlender"就可以把日历放在标签内。<br/>
```javascript
var canlender = document.getElementsByClassName("Canlender");//获取标签<br/>
var getdate = new DateControl();//获取插件类<br/>
//插件初始化并把获取的标签放到指定的key里<br/>
getdate.init({
     "Canlender": canlender[0]
});<br/>
```
## yDate2.js(2.1版本)可查看index2.html<br/>
自定义table和title。<br/>
```javascript
var getdate = new DateControl();
//tBody是从页面中获取的
getdate.init({
		"tBody": tBody
});
```
###内定id和class<br/>
* "显示当前月份" id = "title" <br/>
* "tBody" 生成表格的tbody
* "周末" class = "week"
* "非当前月份" class = "otherMonth"
* "当前月份" class = "nowMonth"
* "当天" class = "now"
###内定方法<br/>
* init(json) 初始化信息
```javascript
{
	"tBody": null,//tbody元素对象
    "nowDay": new Date()//当前指定月份
}
```
* setEvent() 绑定事件
* deleteAllTr() 删除全部tbody里面的tr
* prev() 上个月
* next() 下个月
* ClickDate() 当前鼠标点击的当月日起
* getDate() 构建tobdy里面的数据
