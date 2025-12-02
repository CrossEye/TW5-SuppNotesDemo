TODO:
  * Add a cancel-edit button as well as save
  * Sorting of notes (drag and drop?)
  * ~~Initialize empty content tiddler if it's missing.~~ (works automatically!)
  * Add focus to newly added note textarea
  * Fix ridiculous `[add[1]subtract[1]]` hack in setting the temp index on a
    newly minted group
  * Separate the procedures into their own tiddler(s)
  * Rename temp tiddlers when renaming content key (keep open/edit statuses when
    tiddler is renamed)
  * Possibly: hide the notes section entirely unless the tiddler is
    hovered/pressed?
  * Make the currentTiddler a passed parameter everywhere rather than a global
  * Allow note opt-out mechanism for specific tiddlers.  For consistency, this
    should be external, not a field.
  * Remove (or hide) the sidebar.
  * Fixing the missing case in the `jsondelete` code - when node is neither an
    array nor a plain object
  * Make our `format:json` calls consistent.  We use both `[2]` and `[4]`
