$(function() {
  var settings = {
    continuous: true,
    pageStyles: true,
    transitions: {
      content: '',
      buttons: ''
    }
  };
  var pages = $("#slider_av #pages_av li").length;
  var currentPage;
  var reachedLastPage, reachedFirstPage;
  var Interval = 6000;
  
   

  if (pages > 0) {
    // Generate navigation bullets
    for (var i = 0; i < pages; i++)
      $(".navigation_av").append('<li><a href="#"><span></span></a></li>');

    // Hide navigation arrows when there is a single page
    if (pages == 1) {
      $("#slider_av #prev_av").addClass("hidden_av");
      $("#slider_av #next_av").addClass("hidden_av");
    }

    //
    if (!settings.continuous)
      $("#slider_av #prev_av").addClass("hidden_av");
    // Set page style if needed
    if (settings.pageStyles)
    $("#centerside_av").addClass("page_av1");
    $("#leftside_av").addClass("lpage_av1");
    $("#rightside_av").addClass("rpage_av1");
    // Select the first page and element in the navigation
    $("#slider_av #pages_av :first-child").not("div p").addClass("selected_av");
    $("#slider_av .navigation_av :first-child a").addClass("selected_av");
  }

  // Navigation bullets
  $(".navigation_av a").click(function(e) {
    e.preventDefault();
    // Remove the selected class from the currently selected indicator
    $(this).parent().parent().find(".selected_av").removeClass("selected_av");
    // Make the clicked indicator the selected one
    $(this).addClass("selected_av");

    updateSlideshowForSelectedPage();
  });

  //var timerId = setInterval(function() {
  //goToNext();
  //}, Interval);

  // Navigation arrows
  $("#next_av").click(function(e) {
    goToNext();
    Interval = 6000;
  });

  $("#slider_av").on("swipeleft", function() {
    goToNext();
    Interval = 6000;
  });

  $("#prev_av").click(function(e) {
    goToPrev();
    Interval = 6000;
  });

  $("#slider_av").on("swiperight", function() {
    goToPrev();
    Interval = 6000;
  });

  // Keyboard shortcuts
  $("body").keyup(function(e) {
    if (e.keyCode == 39) // Key right
      goToNext();
    else if (e.keyCode == 37) // Key left
      goToPrev();

    Interval = 6000;

  });

  function goToNext() {
    reachedLastPage = $(".navigation_av .selected_av").parent().index() + 1 >= pages;

    if (reachedLastPage && settings.continuous) {
      $(".navigation_av .selected_av").removeClass("selected_av")
      $(".navigation_av :first-child a").addClass("selected_av");
    } else if (reachedLastPage && !settings.continuous)
      return;
    else
      $(".navigation_av .selected_av").removeClass("selected_av").parent().next().find("a").addClass("selected_av");

    updateSlideshowForSelectedPage();
  }

  function goToPrev() {
    reachedFirstPage = $(".navigation_av .selected_av").parent().index() <= 0;

    if (reachedFirstPage && settings.continuous) {
      $(".navigation_av .selected_av").removeClass("selected_av")
      $(".navigation_av :last-child a").addClass("selected_av");
    } else if (reachedFirstPage && !settings.continuous)
      return;
    else
      $(".navigation_av .selected_av").removeClass("selected_av").parent().prev().find("a").addClass("selected_av");

    updateSlideshowForSelectedPage();
  }

  function updateSlideshowForSelectedPage() {
    var index = $(".navigation_av .selected_av").parent().index(),
      classIndex = parseInt(index + 1, 20),
      reachedLastPage = $(".navigation_av .selected_av").parent().index() + 1 >= pages,
      reachedFirstPage = $(".navigation_av .selected_av").parent().index() <= 0;

    if (settings.pageStyles)
    $("#centerside_av").attr("class", "page_av" + classIndex);
    $("#leftside_av").attr("class", "lpage_av" + classIndex);
    $("#rightside_av").attr("class", "rpage_av" + classIndex);

    if (!settings.continuous) {
      reachedLastPage ? $("#slider_av #next_av").addClass("hidden_av") : $("#slider_av #next_av").removeClass("hidden_av");
      reachedFirstPage ? $("#slider_av #prev_av").addClass("hidden_av") : $("#slider_av #prev_av").removeClass("hidden_av");
    }

    $("#pages_av .selected_av").removeClass("selected_av");
    $("#pages_av li:nth-child(" + classIndex + ")").addClass("selected_av");
  }
  
  
});
