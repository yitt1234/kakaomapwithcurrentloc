let cd = 0;
let a = 37.444;
let b = 126.888;
let prevMarker = null; // 변수를 추가하여 이전 마커를 저장

function updatelocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(position.coords.accuracy);
                console.log(latitude, longitude);
                a = latitude;
                b = longitude;
                mapCenter = new kakao.maps.LatLng(a, b);
            },
            function (error) {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not available in this browser.");
    }
}

setInterval(updatelocation, 800);

/* map */
setTimeout(mop, 1500);

function mop() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(a, b), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);

    // 이전 마커를 삭제하는 함수
    function removePrevMarker() {
        if (prevMarker !== null) {
            prevMarker.setMap(null);
        }
    }

    function sibal() {
        cd += 1;
        removePrevMarker(); // 이전 마커를 삭제

        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(a, b)
        });
        var markerImage = new kakao.maps.MarkerImage(
            'location.png',
            new kakao.maps.Size(20, 20),
            new kakao.maps.Point(7, 7)
        );
        marker.setImage(markerImage);

        console.log(cd);

        marker.setMap(map); // 지도에 올린다.

        // 현재 마커를 이전 마커 변수에 저장
        prevMarker = marker;
    }

    setInterval(sibal, 1000);
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
}
