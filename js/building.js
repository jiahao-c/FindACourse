'use strict';

/* show buildings */

$(document).ready(() => {
    let buildings = [];
    $.getJSON("data/merge.json", function (data, status) {
        $.each(data, (bld, val) => {
            let shortName = bld;
            let name = val.full;
            let address = val.addr;
            let img = val.img;
            let numLectures = Object.keys(val.rooms).length
            buildings.push(`<div class="card col-xl-4 col-sm-6 mt-3" style="width: 18rem;" searchtag="${name.toLowerCase()} ${bld}">
            <img data-src="http://maps.mcgill.ca/images/popup/${img}.png" class="card-img-top lazyload" alt="...">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${address}</p>
              <a href="calendar.html?building=${shortName}" class="btn btn-primary">${numLectures} Lectures Available</a>
            </div>
          </div>`);
        });
        $(buildings.join("")).appendTo("#buildingList");
        lazyload();
    });
});

/* search */
$('#search').on('input', () => {
    let input = $("#search").val().toLowerCase();
    if (!input) {
        console.log("empty")
        $(".card").show();
    } //if input is empty, show all results
    else {
        console.log("not empty");
        $(".card").hide();
        $(".card").filter(`div[searchtag*='${input}']`).show();
    }
});
