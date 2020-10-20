// 20102020
$(function() {
  var settings = {
    continuous: true,
    pageStyles: true,
    transitions: {
      content: '',
      buttons: ''
    }
  };
  var pages = $("#slider_ds #pages_ds li").length;
  var currentPage;
  var reachedLastPage, reachedFirstPage;
  var Interval = 6000;
  
   

  if (pages > 0) {
    // Generate navigation bullets
    for (var i = 0; i < pages; i++)
      $(".navigation_ds").append('<li><a href="#"><span></span></a></li>');

    // Hide navigation arrows when there is a single page
    if (pages == 1) {
      $("#slider_ds #prev_ds").addClass("hidden_ds");
      $("#slider_ds #next_ds").addClass("hidden_ds");
    }

    //
    if (!settings.continuous)
      $("#slider_ds #prev_ds").addClass("hidden_ds");
    // Set page style if needed
    if (settings.pageStyles)
    $("#centerside_ds").addClass("page_ds1");
    $("#leftside_ds").addClass("lpage_ds1");
    $("#rightside_ds").addClass("rpage_ds1");
    // Select the first page and element in the navigation
    $("#slider_ds #pages_ds :first-child").not("div p").addClass("selected_ds");
    $("#slider_ds .navigation_ds :first-child a").addClass("selected_ds");
  }

  // Navigation bullets
  $(".navigation_ds a").click(function(e) {
    e.preventDefault();
    // Remove the selected class from the currently selected indicator
    $(this).parent().parent().find(".selected_ds").removeClass("selected_ds");
    // Make the clicked indicator the selected one
    $(this).addClass("selected_ds");

    updateSlideshowForSelectedPage();
  });

  //var timerId = setInterval(function() {
  //goToNext();
  //}, Interval);

  // Navigation arrows
  $("#next_ds").click(function(e) {
    goToNext();
    Interval = 6000;
  });

  $("#slider_ds").on("swipeleft", function() {
    goToNext();
    Interval = 6000;
  });

  $("#prev_ds").click(function(e) {
    goToPrev();
    Interval = 6000;
  });

  $("#slider_ds").on("swiperight", function() {
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
    reachedLastPage = $(".navigation_ds .selected_ds").parent().index() + 1 >= pages;

    if (reachedLastPage && settings.continuous) {
      $(".navigation_ds .selected_ds").removeClass("selected_ds")
      $(".navigation_ds :first-child a").addClass("selected_ds");
    } else if (reachedLastPage && !settings.continuous)
      return;
    else
      $(".navigation_ds .selected_ds").removeClass("selected_ds").parent().next().find("a").addClass("selected_ds");

    updateSlideshowForSelectedPage();
  }

  function goToPrev() {
    reachedFirstPage = $(".navigation_ds .selected_ds").parent().index() <= 0;

    if (reachedFirstPage && settings.continuous) {
      $(".navigation_ds .selected_ds").removeClass("selected_ds")
      $(".navigation_ds :last-child a").addClass("selected_ds");
    } else if (reachedFirstPage && !settings.continuous)
      return;
    else
      $(".navigation_ds .selected_ds").removeClass("selected_ds").parent().prev().find("a").addClass("selected_ds");

    updateSlideshowForSelectedPage();
  }

  function updateSlideshowForSelectedPage() {
    var index = $(".navigation_ds .selected_ds").parent().index(),
      classIndex = parseInt(index + 1, 20),
      reachedLastPage = $(".navigation_ds .selected_ds").parent().index() + 1 >= pages,
      reachedFirstPage = $(".navigation_ds .selected_ds").parent().index() <= 0;

    if (settings.pageStyles)
    $("#centerside_ds").attr("class", "page_ds" + classIndex);
    $("#leftside_ds").attr("class", "lpage_ds" + classIndex);
    $("#rightside_ds").attr("class", "rpage_ds" + classIndex);

    if (!settings.continuous) {
      reachedLastPage ? $("#slider_ds #next_ds").addClass("hidden_ds") : $("#slider_ds #next_ds").removeClass("hidden_ds");
      reachedFirstPage ? $("#slider_ds #prev_ds").addClass("hidden_ds") : $("#slider_ds #prev_ds").removeClass("hidden_ds");
    }

    $("#pages_ds .selected_ds").removeClass("selected_ds");
    $("#pages_ds li:nth-child(" + classIndex + ")").addClass("selected_ds");
  }
  
  
});
