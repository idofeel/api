/**
 * create by dofeel
 */
import axios from "axios";

export let Word = {
  /**
   * 单词翻译
   * @param {String} word require
   * @param {Function} callback 回调，返回两个参数，error和data
   */
  translate(word, callback) {
    axios
      .get(`https://cn.bing.com/dict/SerpHoverTrans?q=${word}`)
      .then(data => {
        callback(null, data.data);
      })
      .catch(error => {
        console.log("error", error);
        callback(error);
      });
  }
};

export class ddd {}
