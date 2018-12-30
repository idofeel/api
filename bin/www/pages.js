/**
 * 提供路由跳转执行的方法
 */
import fs from 'fs';
import qqMusic from '../../services/qqMusic';
import Api, { translate as translateWord } from '../../services/httpAPI';
// console.log(global.process.env.PWD);

export default {
	// 主页
	index(req, res, next) {
		fs.readFile(`${RootPath}/views/index.html`, (err, data) => {
			if (err) throw err;
			res.send(data.toString());
		});
	},

	// 播放器
	player(req, res, next) {
		qqMusic.searchMusic('周杰伦', res);
	},

	// 翻译
	translate(req, res, next) {
		// 请求类型 all
		// 获取单词
		let word = req.method == 'GET' ? req.query.word : req.body.word;
		// 请求接口
		translateWord(word, (err, msg) => {
			// 返回数据 返回翻译的单词结果
			res.send(err || !msg ? '没找到记录' : msg);
		});
	},
	// response {success:Bool,data:{img,cn,en,today,lastday,nextday}}
	daily(req, res, next) {
		Api.Isayb({}, (err, isaybRes) => {
			//
			let data = {
				success: isaybRes.data.success,
				data: {
					cn: isaybRes.data.data.chn,
					en: isaybRes.data.data.enu,
					img: isaybRes.data.data.img,
					today: isaybRes.data.data.today,
					lastday: isaybRes.data.data.lastday,
					nextday: isaybRes.data.data.nextday
				}
			};
			console.log(data);
			res.set('Content-Type', 'text/html; charset=UTF-8');
			res.end(JSON.stringify(data));
		});
	}
};
