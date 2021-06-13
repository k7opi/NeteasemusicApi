var AES = require('./aes')
var request = require('request');
var urlencode = require('urlencode');

var searchData={
    "s": "薛之谦",
    "type": 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    "limit": 20,
    "offset": 0,
    "csrf_token":"",
    "device_id": "null"
  };

var urlData={
    csrf_token: "",
    encodeType: "mp3",
    ids: "[1463165983]",
    level: "standard"
}  

var lrcData={
    id: "1811921555",
    lv: -1,
    tv: -1,
    csrf_token: ""
}

var mvData={
    id: "5965802",  //mv的id
    r: "1080",
    csrf_token: ""
}

var encSecKey = "5dec9ded1d7223302cc7db8d7e0428b04139743ab7e3d451ae47837f34e66f9a86f63e45ef20d147c33d88530a6c3c9d9d88e38586b42ee30ce43fbf3283a2b10e3118b76e11d6561d80e33ae38deb96832b1a358665c0579b1576b21f995829d45fc43612eede2ac243c6ebb6c2d16127742f3ac913d3ac7d6026b44cee424e"
var baseheaders = {
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48",
    "referer": "https://music.163.com/search/",
    "origin": "https://music.163.com",
}


var searchurl="https://music.163.com/weapi/cloudsearch/get/web?csrf_token=";
var url = "https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token="
var lrcurl = "https://music.163.com/weapi/song/lyric?csrf_token="
var mvurl = "https://music.163.com/weapi/song/enhance/play/mv/url?csrf_token="


searchrequest(searchurl,searchData);
//urlrequest(url,urlData)
//lrcrequest(lrcurl,lrcData)
//mvrequest(mvurl,mvData)

function searchrequest(url,data){
    var encText = generateparams(data)
    request({
        url: url,
        method: "POST",
        json: true,
        headers: baseheaders,
        body: "params="+encText +"&encSecKey="+encSecKey
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var code = body.result.songs
            var songinfo = [];
            for (let i = 0; i < code.length; i++) {
				songinfo.push({
					'musicrid': code[i].id,
					'name': code[i].name,
					'artist': code[i].ar[0].name,
					'pic': code[i].al.picUrl,
					'album': code[i].al.name,
					'source': 'netease',
					'mvid': code[i].mv==0?"":code[i].mv+""
				});
			}
            console.log(songinfo)
        }
    });
};

function urlrequest(url,data){
    var encText = generateparams(data)
    request({
        url: url,
        method: "POST",
        json: true,
        headers: baseheaders,
        body: "params="+encText +"&encSecKey="+encSecKey
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.data[0].url)
        }
    });
};

function lrcrequest(url,data){
    var encText = generateparams(data)
    request({
        url: url,
        method: "POST",
        json: true,
        headers: baseheaders,
        body: "params="+encText +"&encSecKey="+encSecKey
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.lrc.lyric)
        }
    });
};

function mvrequest(url,data){
    var encText = generateparams(data)
    request({
        url: url,
        method: "POST",
        json: true,
        headers: baseheaders,
        body: "params="+encText +"&encSecKey="+encSecKey
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.data.url)
        }
    });
};

function generateparams(data){
    var param3 = "0CoJUm6Qyw8W8jud"
    var iv = "0102030405060708"
    var rand_num = "aq9d7cvBOJ1tzj1o"
    data = JSON.stringify(data)
    var encText = "";
    encText = AES.encryption(data,param3,iv)
    encText = urlencode(AES.encryption(encText,rand_num,iv))
    return encText
}
