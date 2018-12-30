/**
 * create by dofeel
 */
import axios from 'axios';
/**
 * 单词翻译
 * @param {String} word require
 * @param {Function} callback 回调，返回两个参数，error和data
 */
export const translate = (word, callback) => {
	axios
		.get(`https://cn.bing.com/dict/SerpHoverTrans?q=${word}`)
		.then((data) => {
			callback(null, data.data);
		})
		.catch(callback);
};

export const QQMusicAPI = (a, callback) => {
	axios;
};

export const Isayb = (data, callback) => {
	axios
		.post(`http://da.isayb.com/ishome/daily.php`, {})
		.then((data) => {
			callback(null, data);
		})
		.catch(callback);
};

export default { translate, QQMusicAPI, Isayb };
