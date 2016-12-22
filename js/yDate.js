function DateControl() {
	this.setting = {
		"Canlender": null,
		"tBody": null,
		"nowDay": new Date(),
		"getDayFlage": 0,
		"day": 1,
		"prevBtn": null,
		"nextBtn": null,
	}

	DateControl.prototype.init = function(opt) {
		for(var i in opt) {
			this.setting[i] = opt[i];
		}

		//alert("aaa");						
		this.setting.Canlender.innerHTML = '<input id="prev" value="上个月" type="button" /><input id="next" value="下个月" type="button" />' +
			'<p id="title">title: </p><table id="CalenderTable"><thead>' +
			'<tr><td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td>' +
			'<td>周五</td><td>周六</td></tr> </thead><tbody></tbody></table>';

		var canlender = document.getElementById("CalenderTable");
		this.setting.tBody = canlender.getElementsByTagName("tbody");
		//alert(canlender);
		this.prevBtn = document.getElementById("prev");
		this.nextBtn = document.getElementById("next");
		var _this = this;
		this.setEvent("click", this.prevBtn, function() {
			_this.prev();
		});
		this.setEvent("click", this.nextBtn, function() {
			_this.next();
		})
		this.getDate();
	}

	DateControl.prototype.setEvent = function(Event, Obj, fn) {
		if(!document.attachEvent) {
			Obj.addEventListener(Event, fn, false);
		} else {
			Obj.attachEvent("on" + Event, fn);
		}
	}

	DateControl.prototype.deleteAllTr = function() {
		var tBodyFormTr = this.setting.tBody[0].getElementsByTagName("tr");
		for(var i = tBodyFormTr.length - 1; i >= 0; i--) {
			this.setting.tBody[0].removeChild(tBodyFormTr[i]);
		}
	}

	DateControl.prototype.prev = function() {
		this.deleteAllTr();
		this.setting.getDayFlage = 0;
		this.setting.day = 1;
		this.setting.nowDay = new Date(this.setting.nowDay.getFullYear(), this.setting.nowDay.getMonth() - 1, this.setting.nowDay.getDate());
		this.getDate();
	}
	DateControl.prototype.next = function() {
		this.deleteAllTr();
		this.setting.getDayFlage = 0;
		this.setting.day = 1;
		this.setting.nowDay = new Date(this.setting.nowDay.getFullYear(), this.setting.nowDay.getMonth() + 1, this.setting.nowDay.getDate());
		this.getDate();
	}

	DateControl.prototype.getDate = function() {

		document.getElementById("title").textContent = this.setting.nowDay.getFullYear() + "年" + (this.setting.nowDay.getMonth() + 1) + "月";

		var month = this.setting.nowDay.getMonth();
		var year = this.setting.nowDay.getFullYear();
		var week = this.setting.nowDay.getDay();
		var monthAllDay = new Date(year, month + 1, 0);
		var monthStart = new Date(year, month, 1);
		//六列信息自动增长
		for(var j = 0; j < 5; j++) { //日历每个界面总共有6行
			//一行信息自动增长
			var innerHtml = "";
			var tr = document.createElement("tr");
			var flage = "";
			//console.log(getDay)
			for(var i = 0; i < 7; i++) { //日历每个界面总共有七列
				if(this.setting.getDayFlage < monthStart.getDay()) {
					innerHtml = '<td>' + new Date(year, month, this.setting.getDayFlage - monthStart.getDay() + 1).getDate() + '</td>';
					flage = flage + innerHtml;
					this.setting.getDayFlage++;
				} else {
					innerHtml = '<td>' + this.setting.day + '</td>';

					flage = flage + innerHtml;

					if(++this.setting.day > monthAllDay.getDate()) {
						//console.log(this.setting.StartDay);
						this.setting.day = 1;
						month++;
						monthAllDay = new Date(year, month + 1, 0);
						//console.log(this.setting.StartDay);

					}
				}

			}

			tr.innerHTML = flage;
			this.setting.tBody[0].appendChild(tr);
		}

	}

}