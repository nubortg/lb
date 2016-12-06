$(function() {
  var settings = {
    continuous: true,
    pageStyles: true,
    transitions: {
      content: '',
      buttons: ''
    }
  };
  var pages = $("#slider #pages li").length;
  var currentPage;
  var reachedLastPage, reachedFirstPage;
  var Interval = 6000;
  
   

  if (pages > 0) {
    // Generate navigation bullets
    for (var i = 0; i < pages; i++)
      $(".navigation").append('<li><a href="#"><span></span></a></li>');

    // Hide navigation arrows when there is a single page
    if (pages == 1) {
      $("#slider #prev").addClass("hidden");
      $("#slider #next").addClass("hidden");
    }

    //
    if (!settings.continuous)
      $("#slider #prev").addClass("hidden");
    // Set page style if needed
    if (settings.pageStyles)
    $("#centerside").addClass("page1");
    $("#leftside").addClass("lpage1");
    $("#rightside").addClass("rpage1");
    // Select the first page and element in the navigation
    $("#slider #pages :first-child").not("div p").addClass("selected");
    $("#slider .navigation :first-child a").addClass("selected");
  }

  // Navigation bullets
  $(".navigation a").click(function(e) {
    e.preventDefault();
    // Remove the selected class from the currently selected indicator
    $(this).parent().parent().find(".selected").removeClass("selected");
    // Make the clicked indicator the selected one
    $(this).addClass("selected");

    updateSlideshowForSelectedPage();
  });

  //var timerId = setInterval(function() {
  //goToNext();
  //}, Interval);

  // Navigation arrows
  $("#next").click(function(e) {
    goToNext();
    Interval = 6000;
  });

  $("#slider").on("swipeleft", function() {
    goToNext();
    Interval = 6000;
  });

  $("#prev").click(function(e) {
    goToPrev();
    Interval = 6000;
  });

  $("#slider").on("swiperight", function() {
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
    reachedLastPage = $(".navigation .selected").parent().index() + 1 >= pages;

    if (reachedLastPage && settings.continuous) {
      $(".navigation .selected").removeClass("selected")
      $(".navigation :first-child a").addClass("selected");
    } else if (reachedLastPage && !settings.continuous)
      return;
    else
      $(".navigation .selected").removeClass("selected").parent().next().find("a").addClass("selected");

    updateSlideshowForSelectedPage();
  }

  function goToPrev() {
    reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

    if (reachedFirstPage && settings.continuous) {
      $(".navigation .selected").removeClass("selected")
      $(".navigation :last-child a").addClass("selected");
    } else if (reachedFirstPage && !settings.continuous)
      return;
    else
      $(".navigation .selected").removeClass("selected").parent().prev().find("a").addClass("selected");

    updateSlideshowForSelectedPage();
  }

  function updateSlideshowForSelectedPage() {
    var index = $(".navigation .selected").parent().index(),
      classIndex = parseInt(index + 1, 20),
      reachedLastPage = $(".navigation .selected").parent().index() + 1 >= pages,
      reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

    if (settings.pageStyles)
    $("#centerside").attr("class", "page" + classIndex);
    $("#leftside").attr("class", "lpage" + classIndex);
    $("#rightside").attr("class", "rpage" + classIndex);

    if (!settings.continuous) {
      reachedLastPage ? $("#slider #next").addClass("hidden") : $("#slider #next").removeClass("hidden");
      reachedFirstPage ? $("#slider #prev").addClass("hidden") : $("#slider #prev").removeClass("hidden");
    }

    $("#pages .selected").removeClass("selected");
    $("#pages li:nth-child(" + classIndex + ")").addClass("selected");
  }
  
  
});
