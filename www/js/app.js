var appKey    = "YOUR_APP_KEY";
var clientKey = "YOUR_CLIENT_KEY";

///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
  NCMB.initialize(appKey, clientKey);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー
var isCheckIn = null; //現在チェックイン中ステータス

function onRegisterBtn()
{
    //起動時にmobile backend APIキーを設定
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();

    var user = new NCMB.User();
    user.set("userName", username);
    user.set("password", password);

    // 任意フィールドに値を追加
    user.signUp(null, {
        success: function(user) {
            alert("新規登録に成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#MapPage');
        },
        error: function(user, error) {
            alert("新規登録に失敗！次のエラー発生： " + error.message);
        }
    });
}

function onLoginBtn()
{
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    NCMB.User.logIn(username, password, {
        success: function(user) {
            alert("ログイン成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#MapPage');
        },
        error: function(user, error) {
            alert("ログイン失敗！次のエラー発生: " + error.message);
        }
    });
}

function onLogoutBtn()
{
    NCMB.User.logOut();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}

//----------------------------------SHOW MAP-------------------------------------//

//現在地を取得成功したら
var onSuccess = function(position){
    //STEP2 コード追加(map)
};

//位置情報取得に失敗した場合のコールバック
var onError = function(error){
    alert("現在位置を取得できませんでした");
};

//地図でマーク表示
function markToMap(name, position, map, icon){
    var marker = new google.maps.Marker({
        position: position,
        title:name,
        icon: icon
    });
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function() {
        var infowindow = new google.maps.InfoWindow({
            content:marker.title
        });
        infowindow.open(map,marker);
    });
}

//現在地を取得する
function showMap(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, null);
};

//ストア詳細を表示する
function createStoreDetail(store, location){
    var detail = "";
    var storeName = store.get("name");
    detail += "<h2>"+ storeName +"</h2>";
    var storeCapacity = store.get("capacity");
    var storeLocation = store.get("geolocation");
    var storeLatLng = new google.maps.LatLng(storeLocation.latitude,storeLocation.longitude);
    var locationLatLng = new google.maps.LatLng(location.lat,location.lng);
    var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween (locationLatLng, storeLatLng));
    detail += "<p>距離: "+ distance + "(m)</p>";
    detail += "<p>席数: " + storeCapacity + "</p>" ;
    if((distance <30) && (!isCheckIn)) {
       detail += '<button onclick="checkIn(\'' + store.id + '\');">チェックイン!</button>';
    } else if (isCheckIn) {
       detail += '<button onclick="checkOut(\'' + isCheckIn + '\');">チェックアウト!</button>';
    }
    return detail;
};

//----------------------------------CHECK IN-------------------------------------//
//チェックイン
function checkIn(storeId) {
    //STEP3 コード追加(checkIn)
}

//チェックアウト
function checkOut(checkinId) {
    //STEP3 コード追加(checkOut)
}
