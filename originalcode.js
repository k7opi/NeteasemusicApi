const emj = {
    "色": "00e0b",
    "流感": "509f6",
    "这边": "259df",
    "弱": "8642d",
    "嘴唇": "bc356",
    "亲": "62901",
    "开心": "477df",
    "呲牙": "22677",
    "憨笑": "ec152",
    "猫": "b5ff6",
    "皱眉": "8ace6",
    "幽灵": "15bb7",
    "蛋糕": "b7251",
    "发怒": "52b3a",
    "大哭": "b17a8",
    "兔子": "76aea",
    "星星": "8a5aa",
    "钟情": "76d2e",
    "牵手": "41762",
    "公鸡": "9ec4e",
    "爱意": "e341f",
    "禁止": "56135",
    "狗": "fccf6",
    "亲亲": "95280",
    "叉": "104e0",
    "礼物": "312ec",
    "晕": "bda92",
    "呆": "557c9",
    "生病": "38701",
    "钻石": "14af6",
    "拜": "c9d05",
    "怒": "c4f7f",
    "示爱": "0c368",
    "汗": "5b7a4",
    "小鸡": "6bee2",
    "痛苦": "55932",
    "撇嘴": "575cc",
    "惶恐": "e10b4",
    "口罩": "24d81",
    "吐舌": "3cfe4",
    "心碎": "875d3",
    "生气": "e8204",
    "可爱": "7b97d",
    "鬼脸": "def52",
    "跳舞": "741d5",
    "男孩": "46b8e",
    "奸笑": "289dc",
    "猪": "6935b",
    "圈": "3ece0",
    "便便": "462db",
    "外星": "0a22b",
    "圣诞": "8e7",
    "流泪": "01000",
    "强": "1",
    "爱心": "0CoJU",
    "女孩": "m6Qyw",
    "惊恐": "8W8ju",
    "大笑": "d"
}
const md = ["色", "流感", "这边", "弱", "嘴唇", "亲", "开心", "呲牙", "憨笑", "猫", "皱眉", "幽灵", "蛋糕", "发怒", "大哭", "兔子", "星星", "钟情", "牵手", "公鸡", "爱意", "禁止", "狗", "亲亲", "叉", "礼物", "晕", "呆", "生病", "钻石", "拜", "怒", "示爱", "汗", "小鸡", "痛苦", "撇嘴", "惶恐", "口罩", "吐舌", "心碎", "生气", "可爱", "鬼脸", "跳舞", "男孩", "奸笑", "猪", "圈", "便便", "外星", "圣诞"]

var bZo6i = d(JSON.stringify(data), generatekey(["流泪", "强"]), generatekey(md), generatekey(["爱心", "女孩", "惊恐", "大笑"]));

//获得params和encSecKey
function d(d, e, f, g) {
    var h = {},
        i = randomtext(16);  //生成长度为16的字符串
    return h.encText = b(d, g), h.encText = b(h.encText, i), h.encSecKey = c(i, e, f), h
    //获得params：原始json数据进行两次AES加密，第一次加密的密钥是["爱心", "女孩", "惊恐", "大笑"]对应的密码，第二次加密的密钥为随机生成的字符串i，密钥长度为32bit
    //获得encSecKey：c(随机生成的字符串i, ["流泪", "强"]对应的密码, md对应的密码)，encSecKey即为将第二次AES加密密钥进行RSA加密。
}

//通过emoji生成密钥
function generatekey(text) {
    var m7f = [];
    var i = "";
    for (i=0;i<text.length;i++){
        m7f.push(emj[text[i]])
    }  
    return m7f.join("")
};

//此函数是用来生成随机字符
function randomtext(a) {
    var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        c = "";
    for (d = 0; a > d; d += 1) e = Math.random() * b.length, e = Math.floor(e), c += b.charAt(e);
    return c
}

//此函数是用来AES加密
function b(a, b) {
    var c = CryptoJS.enc.Utf8.parse(b),
        d = CryptoJS.enc.Utf8.parse("0102030405060708"),
        e = CryptoJS.enc.Utf8.parse(a),
        f = CryptoJS.AES.encrypt(e, c, {
            iv: d,
            mode: CryptoJS.mode.CBC
            //e是原始数据，c是密钥，iv是密钥偏移量
        });
    return f.toString()
}

function c(a, b, c) {
    var d, e;
    return setMaxDigits(131), d = new RSAKeyPair(b, "", c), e = encryptedString(d, a)
    //setMaxDigits(131), 在JS文件中给出公式为：n * 2 / 16。其中n为密钥长度。
    //如果n为1024，则值应为 1024 * 2 / 16 = 128。
    //经过测试，传128后台解密会报错；正确的值应该大于128。  
    //个人喜好的公式是：n * 2 / 16 + 3
    //即  密钥长度若为1024，其值为 131
    //    密钥长度若为2048，其值为 259
    //RSAKeyPair(exponent, '', modulus);//modulus是解密钥匙  exponent指数
    //encryptedString(key, text);//text 你要加密的文本
}