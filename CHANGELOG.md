# Appiphony Lightning JS Beta

### Release 0.2.0 — February 10, 2016

#### jQuery
* **Lookups**: Added a callback to the `emptySearchTermQuery` option's default function
* **Lookups**: Edited pill container classes and markup to comply with 0.12.0 SLDS release
* **Lookups**: The `customObjectIcon` option is now `useImgTag`; `customObjectIcon` is no longer supported
* **Lookups**: Added a `showSearch` option
* **Lookups**: Fixed an issue where the Add Object button's icon was rendering too large
* **Modals**: Fixed `tabindex` issues when modals are open
* **Picklists**: Now close when the Esc key is pressed <a href="https://github.com/appiphony/appiphony-lightning-js/issues/20">(GitHub Issue #20)</a>
* **Picklists**: Fixed an error when the `getValue` method is used <a href="https://github.com/appiphony/appiphony-lightning-js/issues/31">(GitHub Issue #31)</a>
* **Tooltips**: Markup is now absolutely positioned with new position calculations; elements which trigger tooltips will no longer be wrapped in a relative-positioned span on hover

#### Ember
* **Datepickers**: `selectedDateText` can now be bound
* **Datepickers**: Changed single datepicker year picklist to a select element
* **Datepickers**: Fixed scoping issues with some UI events
* **Datepickers**: Added a `label` attribute binding
* **Datepickers**: Added an `isRequired` attribute binding
* **Datepickers**: Multi Select datepickers now highlight the correct selected dates (previously highlighted previous month sometimes as well) <a href="https://github.com/appiphony/appiphony-lightning-js/issues/28">(Github Issue #28)</a>
* **Lookups**: Added support to disable the lookup and bind a placeholder value <a href="https://github.com/appiphony/appiphony-lightning-js/issues/23">(GitHub Issue #23)</a>
* **Lookups**: Edited pill container classes and markup to comply with 0.12.0 SLDS release <a href="https://github.com/appiphony/appiphony-lightning-js/issues/26">(GitHub Issue #26)</a>
* **Lookups**: The `isObjectIconCustom` parameter is now `useImgTag`; `isObjectIconCustom` is no longer supported
* **Lookups**: Lookups now properly populate when selecting a result on Safari/Firefox/IE 10/IE 11 <a href="https://github.com/appiphony/appiphony-lightning-js/issues/9">(GitHub Issue #9)</a>
* **Lookups**: Multi select lookups are now properly binding to the `selectedResults` attribute; now allows multi select lookups to pass in just an array of text
* **Lookups**: Added a `showSearch` attribute binding
* **Lookups**: Added a `minimumSearchLength` attribute binding
* **Lookups**: Added a `clearOnSelect` attribute binding
* **Lookups**: Added an `allowNewItems` attribute binding
* **Lookups**: Added a `tokenSeparators` attribute binding
* **Modals**: Fixed `tabindex` issues when modals are open
* **Notifications**: Added a `visible` attribute binding
* **Notifications**: Added a `fadeDuration` attribute binding
* **Notifications**: Added a `duration` attribute binding
* **Notifications**: Added a `theme` attribute binding
* **Picklists**: Now only sets selection if `picklistOption` exists (fixes a bug when an undefined value is passed in)
* **Picklists**: Now close when the Esc key is pressed <a href="https://github.com/appiphony/appiphony-lightning-js/issues/20">(GitHub Issue #20)</a>

---

### Release 0.1.3 — December 2, 2015

#### General
* Bower install name has been edited to `appiphony-lightning-js`

#### jQuery
* **Lookups**: Default search when a list of items is passed in is now case insensitive <a href="https://github.com/appiphony/appiphony-lightning-js/issues/10">(GitHub Issue #10)</a>

#### Ember
* **Lookups**: Default search when a list of items is passed in is now case insensitive <a href="https://github.com/appiphony/appiphony-lightning-js/issues/10">(GitHub Issue #10)</a>

---

### Release 0.1.2 — November 30, 2015

#### jQuery
* **Lookups**: Lookups now properly populate when selecting a result on Safari/Firefox/IE 10/IE 11 <a href="https://github.com/appiphony/appiphony-lightning-js/issues/9">(GitHub Issue #9)</a>
* **Lookups**: Updated single selected result markup to comply with 0.12.0 SLDS release
* **Lookups**: Added an `onChange` option to run when a user selects a result
* **Lookups**: Added an `initialSelection` option to set the selected result on load
* **Lookups**: Added a `setSelection` method to programmatically set the selected result
* **Lookups**: Added support for custom object icons and hiding icons from results markup <a href="https://github.com/appiphony/appiphony-lightning-js/issues/8">(GitHub Issue #8)</a>
* **Modals**: Updated backdrop markup to comply with 0.12.0 SLDS release
* **Tabs**: Updated template classes to comply with 0.12.0 SLDS release
* **Tabs**: Updated docs to comply with 0.12.0 SLDS release

#### Ember
* **Lookups**: Added support for a custom icon URL and class
* **Lookups**: Updated single selected result markup to comply with 0.12.0 SLDS release
* **Lookups**: Added support to bind to a route's controller and fixed calling the search methods
* **Lookups**: Added support for custom object icons and hiding icons from results markup <a href="https://github.com/appiphony/appiphony-lightning-js/issues/8">(GitHub Issue #8)</a>
* **Modals**: Updated backdrop markup to comply with 0.12.0 SLDS release
* **Modals**: Added a `show` method to the jQuery call
* **Tabs**: Updated template classes to comply with 0.12.0 SLDS release
* **Notifications**: Added support to customize classes that get applied to the `.slds-notify` div

---

### Release 0.1.1 — November 12, 2015

#### jQuery
* **Datepickers**: Multiple datepickers on a page now properly close each other <a href="https://github.com/appiphony/appiphony-lightning-js/issues/5">(GitHub Issue #5)</a>
* **Datepickers**: Added the ability to pass in an `onChange` callback function <a href="https://github.com/appiphony/appiphony-lightning-js/issues/4">(GitHub Issue #4)</a>
* **Icon Group**: New plugin
* **Modals**: Modals now consistently open when initialized on the body <a href="https://github.com/appiphony/appiphony-lightning-js/issues/1">(GitHub Issue #1)</a>
* **Modals**: Set aria-hidden attribute to `true` by default
* **Modals**: Programmatically dismissing/showing multiple modals now properly shows/hides the modal backdrop <a href="https://github.com/appiphony/appiphony-lightning-js/issues/2">(GitHub Issue #2)</a>
* **Modals**: Added `onShown` and `onDismissed` callbacks
* **Multi Selects**: Changed `multiPicklist` function to `multiSelect`
* **Picklists**: Keyup no longer causes the UI to scroll
* **Picklists**: No longer focusing on the first element when no value is selected
* **Tabs**: Added support for left and right key navigation
* **Tabs**: Updated `aria-selected` and `tabindex` attributes to match SLDS requirements
* **Tooltips**: Fixed tooltip line height when triggered from inside a button

#### Ember
* **Checkboxes**: Added a checkbox component
* **Datepickers**: Added a multi-range datepicker component
* **Datepickers**: Custom month/day labels now properly work with datepickers
* **Datepickers**: Clicking on the body properly closes a datepicker
* **Modals**: Data attribute modal triggers now properly open/close modals
* **Modals**: Added ability to customize modal body classes
* **Modals**: Modals now properly work across different view states
* **Modals**: Modals now properly close when triggered via a jQuery method
* **Modals**: Updated the close button to use inverse class  
* **Multi Selects**: Changed multi-picklist to multi-select (plugin/component name)
* **Notifications**: Added support to designate UI elements to dismiss a notification
* **Tabs**: Added support to specify the type of tabs class applied to the component
* **Tabs**: Added support to bind the active tab to a property
* **Tabs**: Added support for left and right key navigation
* **Tabs**: Updated `aria-selected` and `tabindex` attributes to match SLDS requirements

---

### Release 0.1 — October 30, 2015
* Initial release
* Open sourced: <a href="https://github.com/appiphony/appiphony-lightning-js" target="_blank">https://github.com/appiphony/appiphony-lightning-js</a>