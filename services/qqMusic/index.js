import fs from "fs";
import qs from "querystring";
// import request from "request";
import axios from "axios";

export default {
  searchMusic(w, appRes) {
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
