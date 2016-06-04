chrome.storage.local.get(['charmedIds', 'burnedIds', 'openedIds'], function(result) {

  if (result.openedIds instanceof Array == false)
      result.openedIds = new Array;
  if (result.burnedIds instanceof Array == false)
      result.burnedIds = new Array;
  if (result.charmedIds instanceof Array == false)
      result.charmedIds = new Array;

    $("body").before(JSON.stringify(result, null, 2));
});
