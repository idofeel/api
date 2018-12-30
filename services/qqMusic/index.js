import fs from "fs";
import qs from "querystring";
// import request from "request";
import axios from "axios";

export default {
  searchMusic(w, appRes) {
    //qq音乐播放地址: http://dl.stream.qqmusic.qq.com/C4000038Plkh3wMA7l.m4a?guid=6036457288&vkey=CDC306E72DF58616084D0F7F182EFC5FF5B016B2EECD8594D6F2C039BD1C4ACF7A8BF4CBD671C4F4278EE0DC805935079C42DD242597C304&uin=0&fromtag=66
    // let palyURL = `http://dl.stream.qqmusic.qq.com/${songmid}.m4a?guid=6036457288&vkey=${vkey}&uin=0&fromtag=66`;

    let url = `http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0& n=5&aggr=1&cr=1&loginUin=0&format=json& inCharset=GB2312&outCharset=utf-8&notice=0& platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0& remoteplace=sizer.newclient.next_song&w=周杰伦`;

    axios
      .get(url)
      .then(data => {
        let callData = data.data
          .replace(/^(callback\()/, "")
          .replace(/\)$/, "");
        appRes.json(JSON.parse(callData));
      })
      .catch(error => {
        console.log(error);
      });
  }
};
