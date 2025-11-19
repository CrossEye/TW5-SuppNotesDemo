/*\
title: $:/supp-info/notes/modules/startup/rename
type: application/javascript
module-type: startup

Add hook for renames to update 'Renamed' text field
\*/

"use strict";

// Export name and synchronous status
exports.name = "rename";
exports.platforms = ["browser"];
exports.after = ["startup"];
exports.synchronous = true;

const replaceKey = (oldKey, newKey) => (obj) =>
  Object.fromEntries(Object.entries(obj).map(
    ([k, v]) => [k == oldKey ? newKey : k, v]
  ))

exports.startup= function() {

  $tw.hooks.addHook("th-saving-tiddler", function (newTiddler, oldTiddler) {
    if (
      newTiddler?.fields?.title === oldTiddler?.fields?.['draft.title'] 
      && newTiddler?.fields?.created === oldTiddler?.fields?.created
      && newTiddler?.fields?.title !== oldTiddler?.fields?.['draft.of']
    ) {
      // We're in a rename scenario
      $tw.wiki.setText(
        '$:/supp-info/notes/content', 
        'text', 
        null, 
        JSON.stringify(
          replaceKey(oldTiddler.fields["draft.of"] || oldTiddler.fields.title, newTiddler.fields.title)(
            JSON.parse($tw.wiki.getTiddler('$:/supp-info/notes/content').fields.text)
          ), 
          null, 
          4
        )
      )
    } 
    return newTiddler;
  });
};