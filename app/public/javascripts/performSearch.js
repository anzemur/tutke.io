/**
 * Listens on search button click and perform search if there is any text.
 */
$('#btnSearch').click(() => {
  var searchText = $('#inputSearchText').val();
  if(searchText && searchText != '') {
    var lectureType = $('#btnSearch').attr("lecture");
    window.location.href = '/?page=0&lectureType=' + lectureType + '&search=' + encodeURIComponent(searchText);
  }
});