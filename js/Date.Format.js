(function() {
	Format = function(fmt) {
		fmt = fmt || "{yyyy}年{mm}月{dd}日 {hh}时{ff}分{ss}秒";
		var date = this;
		fmt = fmt.replace(RegExp(
				(function() {
					var RegExp_text = "";
					for(var i in d) {
						RegExp_text += "{" + i + "}" + "|";
					}
					RegExp_text = RegExp_text.slice(0, -1);
					//console.log(RegExp_text);
					return RegExp_text;
				})(), "g"),
			function(text, index, all) {
				//console.log(text.slice(1, -1));
				if(index > 0 & all.substr(index - 1, 1) == "\\") {
					//console.log(arguments[0], text);
					return text;
				};
				//console.log(arguments[0], d[text.slice(1, -1)](date));
				return d[text.slice(1, -1)](date);
			});
		fmt = fmt.replace(/\\{/g, "{");
		//console.log(fmt);
		//		for(var i in d) {
		//			console.log(i, d[i](date));
		//		};
		return fmt;
	};

	var d = {
		//年
		yy: function(date) { //两位数字年
			return this.yyyy(date).substr(2);
		},
		yyyy: function(date) { //四位数字年
			return date.getFullYear().toString();
		},
		YY: function(date) { //两位汉字年
			return fn.toChinese(this.yy(date));
		},
		YYYY: function(date) { //四位汉字年
			return fn.toChinese(this.yyyy(date));
		},
		YN: function(date) { //农历年
			return fn.getlunar(date).gzYear;
		},
		YZ: function(date) { //生肖年
			return fn.getlunar(date).animal;
		},

		//月
		m: function(date) { //一位数字月
			return(date.getMonth() + 1).toString();
		},
		mm: function(date) { //两位数字月
			var m = this.m(date);
			if(m.length < 2) {
				m = "0" + m;
			};
			return m;
		},
		M: function(date) { //一位汉字月
			return fn.toChineseNumber(this.m(date));
		},
		MM: function(date) { //两位汉字月
			return fn.toChineseNumber(this.mm(date));
		},
		ME: function(date) { //长英文月
			var ME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			return ME[date.getMonth()];
		},
		ME3: function(date) { //短英文月
			var ME3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
			return ME3[date.getMonth()];
		},
		MN: function(date) { //农历月
			return fn.getlunar(date).lMonth;
		},

		//日
		d: function(date) { //一位数字日
			return date.getDate().toString();
		},
		dd: function(date) { //两位数字日
			var d = this.d(date);
			if(d.length < 2) {
				d = "0" + d;
			};
			return d;
		},
		D: function(date) { //一位汉字日
			return fn.toChineseNumber(this.d(date));
		},
		DD: function(date) { //两位汉字日
			return fn.toChineseNumber(this.dd(date));
		},
		DN: function(date) { //农历日
			return fn.getlunar(date).lDate;
		},

		//时
		h: function(date) { //12小时制一位数字时
			var h = date.getHours()
			if(h > 12) {
				h -= 12;
			};
			return h.toString();
		},
		hh: function(date) { //12小时制两位数字时
			var h = this.h(date);
			if(h.length < 2) {
				h = "0" + h;
			};
			return h;
		},
		H: function(date) { //24小时制一位数字时
			return date.getHours().toString();
		},
		HH: function(date) { //24小时制两位数字时
			var H = this.h(date);
			if(H.length < 2) {
				H = "0" + H;
			};
			return H;
		},

		//分
		f: function(date) { //一位数字分
			return date.getMinutes().toString();
		},
		ff: function(date) { //两位数字分
			var f = this.f(date);
			if(f.length < 2) {
				f = "0" + f;
			};
			return f;
		},
		//F: 0,
		//FF: 0,

		//秒
		s: function(date) { //一位数字秒
			return date.getSeconds().toString();
		},
		ss: function(date) { //两位数字秒
			var s = this.s(date)
			if(s.length < 2) {
				s = "0" + s;
			};
			return s;
		},
		//S: 0,
		//SS: 0,

		//星期
		w: function(date) { //数字星期
			var w = date.getDay();
			if(w == 0) {
				w = 7;
			};
			return w.toString();
		},
		W: function(date) { //汉字星期
			var W = "日一二三四五六";
			return W[date.getDay()];
		},
		WE: function(date) { //才长英文星期
			var WE = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"];
			return WE[date.getDay()];
		},
		WE3: function(date) { //短英文星期
			var WE3 = ["Tues", "Wed", "Thur", "Fri", "Sat", "Sun", "Mon"];
			return WE3[date.getDay()];
		},

		//上下午
		tt: function(date) {
			var tt = date.getHours();
			if(tt < 12) {
				return "am";
			} else {
				return "pm";
			};
		},
		TT: function(date) {
			var tt = date.getHours();
			if(tt < 1) {
				return "午夜";
			} else if(tt < 6) {
				return "凌晨";
			} else if(tt < 12) {
				return "上午";
			} else if(tt < 13) {
				return "中午";
			} else if(tt < 19) {
				return "下午";
			} else if(tt < 24) {
				return "晚上";
			};
		},
		//		"\\n": function() {
		//			return "\n";
		//		}
	};

	var fn = {
		toChineseNumber: function(text) {

			var text2 = ""
			if(parseInt(text) < 10) {
				text2 = this.toChinese(text);
			} else {
				text2 = "零十二三" [text[0]] + this.toChinese(text[1]);
			}
			return text2;

		},

		toChinese: function(text) {
			var Chinese_data = "零一二三四五六七八九";
			var text2 = "";
			for(var i = 0; i < text.length; i++) {
				text2 += Chinese_data[text[i]];
			}
			return text2;
		},
		getlunar: (function() {
			var j = [43856, 19416, 19168, 42352, 21717, 53856, 55632, 25940, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53845, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560];
			var o = ["9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd0b06bdb0722c965ce1cfcc920f", "b027097bd097c36b0b6fc9274c91aa", "9778397bd19801ec9210c965cc920e", "97b6b97bd19801ec95f8c965cc920f", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd197c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bd09801d98082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec95f8c965cc920e", "97bcf97c3598082c95f8e1cfcc920f", "97bd097bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c3598082c95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf97c359801ec95f8c965cc920f", "97bd097bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd19801ec9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b97bd19801ec95f8c965cc920f", "97bd07f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bd07f1487f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c965cc920e", "97bcf7f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b97bd19801ec9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b97bd197c36c9210c9274c920e", "97bcf7f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "9778397bd097c36c9210c9274c920e", "97b6b7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c36b0b6fc9210c8dc2", "9778397bd097c36b0b70c9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9274c91aa", "97b6b7f0e47f531b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c91aa", "97b6b7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "9778397bd097c36b0b6fc9210c8dc2", "977837f0e37f149b0723b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f5307f595b0b0bc920fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc9210c8dc2", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd097c35b0b6fc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0b0bb0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14998082b0723b06bd", "7f07e7f0e37f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e397bd07f595b0b0bc920fb0722", "977837f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f595b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e37f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f1487f531b0b0bb0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e47f149b0723b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14998082b0723b06bd", "7f07e7f0e37f14998083b0787b0721", "7f0e27f0e47f531b0723b0b6fb0722", "7f0e37f0e366aa89801eb072297c35", "7ec967f0e37f14898082b0723b02d5", "7f07e7f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66aa89801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b0721", "7f07e7f0e47f531b0723b0b6fb0722", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b0723b02d5", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e36665b66a449801e9808297c35", "665f67f0e37f14898082b072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e26665b66a449801e9808297c35", "665f67f0e37f1489801eb072297c35", "7ec967f0e37f14998082b0787b06bd", "7f07e7f0e47f531b0723b0b6fb0721", "7f0e27f1487f531b0b0bb0b6fb0722"];
			var l = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
			var h = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
			var d = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
			var p = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
			var k = ["初", "十", "廿", "三十"];
			var g = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
			var n = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];
			var m = {
				yearDataCache: {},
				getDate: function(u) {
					var x = Math.ceil((u - new Date(1899, 1, 10)) / 86400000) - 0;
					var w = 1899;
					var s;
					var r;
					var q;
					var t;
					var v;
					for(; w < 2100 && x > 0; w++) {
						s = this.getYearDays(w);
						x -= s
					}
					x < 0 && (x += s, w--);
					q = w;
					r = this.getLeapMonth(q) || false;
					for(w = 1; w <= 12; w++) {
						s = this.getMonthDays(q, w);
						if(r === true) {
							r = false;
							w--;
							s = this.getLeapDays(q);
							if(x < s) {
								t = true
							}
						}
						if(r === w) {
							r = true
						}
						if(x < s) {
							v = s === 30;
							break
						}
						x -= s
					}
					return {
						lunarYear: q,
						lunarMonth: w,
						lunarDay: x + 1,
						isLeap: t,
						isBigMonth: v
					}
				},
				getYearDays: function(q) {
					var r;
					var t = this.yearDataCache;
					if(t[q]) {
						return t[q]
					}
					var s = 348;
					var u = j[q - 1899];
					for(r = 32768; r > 8; r >>= 1) {
						s += r & u ? 1 : 0
					}
					s += this.getLeapDays(q);
					t[q] = s;
					return s
				},
				getLeapDays: function(q) {
					return this.getLeapMonth(q) ? (j[q - 1899 + 1] & 15 === 15 ? 30 : 29) : 0
				},
				getLeapMonth: function(r) {
					var q = j[r - 1899] & 15;
					return q == 15 ? 0 : q
				},
				getMonthDays: function(r, q) {
					return(j[r - 1899] & (65536 >> q)) ? 30 : 29
				}
			};
			var b = function(u, r) {
				var v = o[u - 1900];
				var t = [];
				var s = 0;
				var q;
				for(; s < 30; s += 5) {
					q = (+("0x" + v.substr(s, 5))).toString();
					t.push(q.substr(0, 1));
					t.push(q.substr(1, 2));
					t.push(q.substr(3, 1));
					t.push(q.substr(4, 2))
				}
				return new Date(u, parseInt(r / 2, 10), t[r])
			};
			var c = {
				calculate: function(q) {
					return h[q % 10] + d[q % 12]
				},
				getGzYear: function(r, s, q) {
					return this.calculate(s - 1900 + 36 - (q === s ? 0 : 1))
				},
				getGzMonth: function(q, r, s) {
					var t = b(r, q.getMonth() * 2);
					return this.calculate((r - 1900) * 12 + s + 12 - (q < t ? 1 : 0))
				},
				getGzDay: function(q) {
					return this.calculate(Math.ceil(q / 86400000 + 25567 + 10))
				}
			};
			var i = {
				t0101: "t,春节 ",
				t0115: "t,元宵节",
				t0202: "t,龙头节",
				t0505: "t,端午节",
				t0707: "t,七夕节",
				t0715: "t,中元节",
				t0815: "t,中秋节",
				t0909: "t,重阳节",
				t1001: "t,寒衣节",
				t1015: "t,下元节",
				t1208: "t,腊八节",
				t1223: "t,小年",
				"0202": "i,湿地日,1996",
				"0308": "i,妇女节,1975",
				"0315": "i,消费者权益日,1983",
				"0401": "i,愚人节,1564",
				"0422": "i,地球日,1990",
				"0501": "i,劳动节,1889",
				"0512": "i,护士节,1912",
				"0518": "i,博物馆日,1977",
				"0605": "i,环境日,1972",
				"0623": "i,奥林匹克日,1948",
				"1020": "i,骨质疏松日,1998",
				"1117": "i,学生日,1942",
				"1201": "i,艾滋病日,1988",
				"0101": "h,元旦",
				"0312": "h,植树节,1979",
				"0504": "h,五四青年节,1939",
				"0601": "h,儿童节,1950",
				"0701": "h,建党节,1941",
				"0801": "h,建军节,1933",
				"0903": "h,抗战胜利日,1945",
				"0910": "h,教师节,1985",
				"1001": "h,国庆节,1949",
				"1224": "c,平安夜",
				"1225": "c,圣诞节",
				"0214": "a,情人节",
				w: {
					"0520": "i,母亲节,1913",
					"0630": "a,父亲节",
					"1144": "a,感恩节"
				}
			};
			var e = function(q) {
				return q < 10 ? "0" + q : q
			};
			var a = function(r, C) {
				var y = r.getFullYear();
				var w = r.getMonth() + 1;
				var B = r.getDate();
				var q = r.getDay();
				var s = Math.ceil(B / 7);
				var z = e(w) + s + q;
				var v = "t" + e(C.lunarMonth) + e(C.lunarDay);
				var t = e(w) + e(B);
				var x = [];
				var D;
				if(C.lunarMonth === 12 && C.lunarDay === (C.isBigMonth ? 30 : 29)) {
					x.push("t,除夕")
				}
				x = x.concat([i.w[z], i[t], i[v]]);
				var u = 0;
				for(; u < x.length; u++) {
					if(x[u]) {
						D = x[u].split(",");
						if(D[2] && y < D[2]) {
							x[u] = null;
							continue
						}
						x[u] = {
							type: D[0],
							desc: D[1],
							value: D[1]
						}
					}
				}
				x.sort(function(F, E) {
					if(F && E) {
						return F.type.charCodeAt(0) - E.type.charCodeAt(0)
					}
					return !F ? 1 : -1
				});
				return $.map(x, function(E) {
					return E
				})
			};
			var f = function(r) {
				//r = new Date(new Date(r).setDate(r.getDate() - 1))
				//console.log(r);

				var w = r.getFullYear();
				var u = r.getMonth() + 1;
				var y = r.getDate();
				var v = (u - 1) * 2;
				var s = b(w, v);
				var q;
				var t = "";
				if(y != s.getDate()) {
					q = b(w, v + 1);
					if(y == q.getDate()) {
						t = l[v + 1]
					}
				} else {
					t = l[v]
				}
				var x = m.getDate(r);
				return {
					animal: p[(x.lunarYear - 4) % 12],
					gzDate: c.getGzDay(r),
					gzMonth: c.getGzMonth(r, w, u),
					gzYear: c.getGzYear(r, w, x.lunarYear),
					lunarYear: x.lunarYear,
					lunarMonth: x.lunarMonth,
					lunarDate: x.lunarDay,
					lMonth: (x.isLeap ? "闰" : "") + n[x.lunarMonth - 1],
					lDate: x.lunarDay % 10 == 0 ? ["初十", "二十", "三十"][x.lunarDay / 10 - 1] : k[parseInt(x.lunarDay / 10, 10)] + g[parseInt(x.lunarDay % 10, 10)],
					term: t,
					festival: function() {
						return a(r, x)
					},
					isBigMonth: x.isBigMonth,
					oDate: r,
					cnDay: "日一二三四五六七".charAt(r.getDay())
				}
			};

			return f

		})(),

	};
	Date.prototype.Format = Format;
})()