(function ($) {
  var requestConfig = {
    method: "GET",
    url: "http://api.tvmaze.com/shows",
  };
  $("#show").hide();
  $("#error").hide();
  $("#homeLink").hide();
  $("#showList").hide();

  $.ajax(requestConfig).then(function (responseMessage) {
    var tvData = $(responseMessage);
    for (let i = 0; i < tvData.length; i++) {
      const li = `<li><a href="${tvData[i]._links.self.href}"> ${tvData[i]["name"]}</a></li>`;
      $("#showList").append(li);
      $("#showList").show();
    }
  });

  $(document).on("click", "#showList li a", function (event) {
    event.preventDefault();
    var href = this.href;
    $("#showList").hide();

    var requestConfig = {
      method: "GET",
      url: href,
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage.show) {
        var showData = $(responseMessage.show);
      } else {
        var showData = $(responseMessage);
      }
      $("#show").empty();

      if (showData[0].name != null) {
        const h1 = `<h1>${showData[0].name}</h1>`;
        $("#show").append(h1);
      } else {
        const h1 = `<h1>N/A</h1>`;
        $("#show").append(h1);
      }

      if (showData[0].image != null) {
        const img = `<img src=${showData[0].image.medium}>`;
        $("#show").append(img);
      } else {
        const img = `<img src="../../public/images/no_image.jpeg">`;
        $("#show").append(img);
      }
      var dl = "<dl>";
      if (showData[0].language != null) {
        dl = dl + `Language : ${showData[0].language}`;
      } else {
        dl = dl + `Language : N/A`;
      }
      dl = dl + "<br>";
      if (showData[0].genres == null) {
        dl = dl + `Genres : N/A`;
      } else {
        dl = dl + `<ul>`;
        for (let i = 0; i < showData[0].genres.length; i++) {
          let li = `<li> ${showData[0].genres[i]} </li>`;
          dl = dl + li;
        }
        dl = dl + `</ul>`;
      }
      dl = dl + "<br>";

      if (showData[0].rating != null) {
        dl = dl + `Rating : ${showData[0].rating.average}`;
      } else {
        dl = dl + `Rating : N/A`;
      }
      dl = dl + "<br>";

      if (showData[0]["network"] != null) {
        dl = dl + `Network : ${showData[0].network.name}`;
      } else {
        dl = dl + `Network : N/A`;
      }
      dl = dl + "<br><br>";

      if (showData[0].summary != null) {
        dl = dl + `Summary : ${showData[0].summary}`;
      } else {
        dl = dl + `Summary : N/A`;
      }

      dl = dl + "</dl>";
      $("#show").append(dl);
      $("#show").show();
      $("#showList").hide();
      $("#homeLink").show();
      $("#error").hide();
    });
  });

  $("#searchForm").submit((event) => {
    event.preventDefault();
    if ($("#search_term").val().trim()) {
      $("#error").hide();
      $("#show").hide();
      $("#homeLink").hide();
      $("#showList").empty();
      const search = $("#search_term").val().trim();

      var requestConfig = {
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + search,
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        var tvData = $(responseMessage);
        for (let i = 0; i < tvData.length; i++) {
          const li = `<li><a href="${tvData[i].show._links.self.href}"> ${tvData[i].show.name} </a></li>`;
          $("#showList").append(li);
          $("#showList").show();
        }
      });

      const li = `<li> ${$("#search_term").val()} </li>`;
      $("#searchForm").trigger("reset");
      $("#search_term").focus();
    } else {
      $("#error").show();
      $("#show").hide();
      $("#homeLink").hide();
      $("#showList").show();
      $("#error").html("You must enter an input value");
      $("#search_term").focus();
      $("#search_term").value = "";
    }
  });
})(window.jQuery);
