function getdb() {
	if(window.localStorage) {
		var db = openDatabase("daily", "1.0", "it's to save data !", 1024 * 1024);
		return db;
	} else {
		alert('This browser does NOT support localStorage');
		return;
	}
}

function createTable() {
	var db = getdb();
	db.transaction(function(tx) {
		tx.executeSql(
			"create table if not exists daily (dailyDate TEXT, dailyVal TEXT)", [],
			function(tx, result) {
				console.log('创建stu表成功');
			},
			function(tx, error) {
				console.log('创建stu表失败:' + error.message);

			}
		);
	});
}

function InsertDaily(daily) {
	var db = getdb();
	db.transaction(function(tx) {
		tx.executeSql(
			"insert into daily (dailyDate, dailyVal) values(?,?)", [daily.dailyDate, daily.dailyVal],
			function(tx, result) {
				console.log('插入数据成功');
			},
			function(tx, error) {
				console.log('插入失败' + error.message);
			}
		);
	});
}

function selectDailyBydate(dailyDate) {
	var db = getdb();
	removeAllDaily();
	var DailyFromDate = document.getElementById("DailyFromDate");
	db.transaction(function(tx) {
		tx.executeSql(
			"select * from daily where dailyDate = ?", [dailyDate],
			function(tx, result) {
				var getDateFromSql = [];
				var i = 0,
					len = result.rows.length;
				if(len !== 0) {
					for(; i < len; i++) {
						var oDiv = document.createElement('li');
						var oSpan = document.createElement('span');
						oDiv.className = 'daily';
						oSpan.textContent = result.rows[i].dailyVal;
						oDiv.appendChild(oSpan);
						DailyFromDate.appendChild(oDiv);
					}
				}

			},
			function(tx, error) {
				console.log('查询失败' + error.message);
			}
		);
	});
}

function selectDaily(dailyDate, getdate) {
	var db = getdb();
	removeAllDaily();
	db.transaction(function(tx) {
		tx.executeSql(
			"select * from daily where dailyDate like ?", [dailyDate],
			function(tx, result) {
				var getDateFromSql = [];
				var i = 0,
					len = result.rows.length;
				if(len !== 0) {
					for(; i < len; i++) {
						getDateFromSql.push(result.rows[i].dailyDate);
					}
					showStartDaily(getDateFromSql, getdate);
				}

			},
			function(tx, error) {
				console.log('查询失败' + error.message);
			}
		);
	});
}

function selectChangeMonth(str, getdate, index){
	var db = getdb();
	removeAllDaily();
	db.transaction(function(tx) {
		tx.executeSql(
			"select * from daily where dailyDate like ?", [str],
			function(tx, result) {
				var getDateFromSql = [];
				var i = 0,
					len = result.rows.length;
				if(len !== 0) {
					for(; i < len; i++) {
						getDateFromSql.push(result.rows[i].dailyDate);
					}
					if(index === 1){
						showNextDaily(getDateFromSql, getdate);
					}else if(index ===0){
						showPrevDaily(getDateFromSql, getdate);
					}
					
				}

			},
			function(tx, error) {
				console.log('查询失败' + error.message);
			}
		);
	});
}


function deleteDaily(id) {
	var db = getdb();
	db.transaction(function(tx) {
		tx.executeSql(
			"delete from daily where rowid = ?", [id],
			function(tx, result) {
				console.log('删除数据成功');
			},
			function(tx, error) {
				console.log('删除失败' + error.message);
			}
		);
	});
}

function updateDaily(daily, id) {
	var db = getdb();
	db.transaction(function(tx) {
		tx.executeSql(
			"update daily set dailyDate = ?, dailyVal = ? where rowid = ?", [daily.dailyDate, daily.dailyVal, id],
			function(tx, result) {
				console.log('删除数据成功');
			},
			function(tx, error) {
				console.log('删除失败' + error.message);
			}
		);
	});
}
function splitDate(getDateFromSql){
	var i = 0,
		getDateFromSqlLen = getDateFromSql.length;
	var YearArray = new Array();
	var MonthArray = new Array();
	var DayArray = new Array();
	for(; i < getDateFromSqlLen; i++) {
		var tempArray = getDateFromSql[i].split("-");
		YearArray.push(tempArray[0]);
		MonthArray.push(tempArray[1]);
		DayArray.push(tempArray[2]);
	}
	DayArray.sort();
	var splitdate = {
		YearArray : YearArray,
		MonthArray : MonthArray,
		DayArray : DayArray
	}
	return splitdate;
}

function showStartDaily(getDateFromSql, getdate) {
	var canlender = document.getElementById("CalenderTable");
	var tBody = canlender.getElementsByTagName("tbody");
	var splitdate = splitDate(getDateFromSql);
	getdate.init({
		"tBody": tBody,
		"YearArray": splitdate.YearArray,
		"MonthArray": splitdate.MonthArray,
		"DayArray": splitdate.DayArray
	});

}
function showPrevDaily(getDateFromSql, getdate){
	var splitdate = splitDate(getDateFromSql);
	getdate.prev({
		"YearArray": splitdate.YearArray,
		"MonthArray": splitdate.MonthArray,
		"DayArray": splitdate.DayArray
	});
}
function showNextDaily(getDateFromSql, getdate){
	var splitdate = splitDate(getDateFromSql);
	getdate.next({
		"YearArray": splitdate.YearArray,
		"MonthArray": splitdate.MonthArray,
		"DayArray": splitdate.DayArray
	});
}

function removeAllDaily() {
	var DailyFromDate = document.getElementById("DailyFromDate");
	var aDaliy = DailyFromDate.getElementsByClassName("daily");
	var i = 0,
		len = aDaliy.length;
	if(len != 0) {
		for(; i < len; i++) {
			DailyFromDate.removeChild(aDaliy[0]);
		}
	}

}

function InsertIntoDaily(val) {
	var DailyFromDate = document.getElementById("DailyFromDate");
	var oDiv = document.createElement('li');
	var oSpan = document.createElement('span');
	oDiv.className = 'daily';
	oSpan.textContent = val;
	oDiv.appendChild(oSpan);
	DailyFromDate.appendChild(oDiv);
}