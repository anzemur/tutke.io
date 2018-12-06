/**
 * Helps simulate log in.
 */
$(window).on('load', () => {
  if($('#infoDiv')) {
    if($('#infoDiv').attr('uId')) {
      window.location.href = '/';
    }
  }
});