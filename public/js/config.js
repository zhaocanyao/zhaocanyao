/**
 * Created by lzw on 14-8-21.
 */
/*var appId = '7w25ol9vos571m9r9vz6cobpmi85smwyywenol0bhez3fbyb';
var appKey = '2sz6a5fhupgvro5xqk0tbd4b6hogye5d25pgommibrq679e1';*/

var appId = 'whf1ql41jgf2nnt0ezx06oo28tetg99nv2gypxcfvjpa4337';
var appKey = 'nl880ytozwdkd7m5ng3xnud169c77v0qa6y5vbissl4iz514';

/*var appId = 'h12efyy4ky4atg6cbbs6bbrbtmkt2b2xntpwelhou37d5593';
 var appKey = 'prbicneh6au518ruwy9dpor5iqa6qtwcdn4lho84k303eeks';*/

var loginInfo = {
    uk: {
        name: "adminuk",
        pwd: "yxhjuk",
        chinese: "英国"
    },
    au: {
        name: "adminau",
        pwd: "yxhjau",
        chinese: "澳洲"
    },
    nz: {
        name: "adminnz",
        pwd: "yxhjnz",
        chinese: "新西兰"
    },
    ca: {
        name: "adminca",
        pwd: "yxhjca",
        chinese: "加拿大"
    },
    us: {
        name: "adminus",
        pwd: "yxhjus",
        chinese: "美国"
    }
}

var userl = localStorage.getItem("user");
var pathName = window.location.pathname;
if(userl && pathName != "/index.html" && pathName != "/")
{
    if ( !(userl == "adminuk" || userl == "adminau" || userl == "adminnz" || userl == "adminca" || userl == "adminus")) {
        location.href = "index.html";
    }
}

AV.initialize(appId, appKey);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


var cty = getQueryString('country') ? getQueryString('country') : "uk";
if (cty && $("header").length > 0) {
    Logo = AV.Object.extend('Logo');
    var queryLogo = new AV.Query(Logo);
    queryLogo.equalTo("country", cty);
    queryLogo.first({
        success: function (obj) {
            if (obj) {
                var p = obj.get("logopic");
                $("header").css("background-image", "url(" + p + ")");
            }
        },
        error: function (error) {
            //alert("Error: " + error.code + " " + error.message);
        }
    });
}

function getCountry(uc) {
    var cy = "";
    switch (uc) {
        case "uk":
            cy = "英国";
            break;
        case "au":
            cy = "澳洲";
            break;
        case "nz":
            cy = "新西兰";
            break;
        case "ca":
            cy = "加拿大";
            break;
        case "us":
            cy = "美国";
            break;
    }
    return cy;
}

/*获取基本参数*/
function getBaseParam(key) {
    var val = "";

    var getVal = function () {
        var p = obj.get(key);
        if (p) {
            val = p;
        }
        return val;
    }
    var houseS = AV.Object.extend('HouseSearch');
    var queryLogo = new AV.Query(houseS);
    queryLogo.first({
        success: function (obj) {
            if (obj) {
                localStorage.setItem("HouseSearch", obj);
                getVal();
            }
        },
        error: function (error) {
            //alert("Error: " + error.code + " " + error.message);
            return val;
        }
    });
}

function getStateData(callback) {
    var houseS = AV.Object.extend('State');
    var queryLogo = new AV.Query(houseS);
    queryLogo.find({
        success: function (results) {
            localStorage.setItem("State", results);
            callback(results);
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
            callback(null);
        }
    });
}

function getStateName(key, data) {
    var str = "";
    $(data).each(function (idx) {
        if (data[idx].id == key) {
            str = data[idx].get("statename");
        }
    });
    return str;
}

function getCityData(callback) {
    var houseS = AV.Object.extend('City');
    var queryLogo = new AV.Query(houseS);
    queryLogo.find({
        success: function (results) {
            localStorage.setItem("City", results);
            callback(results);
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
            callback(null);
        }
    });
}

function getCityName(key, data) {
    var str = "";
    $(data).each(function (idx) {
        if (data[idx].id == key) {
            str = data[idx].get("cityname");
        }
    });
    return str;
}