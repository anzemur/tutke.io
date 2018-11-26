/**
 * Helps simulate local storage usage on user log in.
 */
$(window).on('load', () => {
  if($('#infoDiv')) {
    if($('#infoDiv').attr('uId')) {
      window.location.href = '/';
    }
  }
});