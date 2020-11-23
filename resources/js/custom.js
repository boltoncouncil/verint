function toggleDebugStyle() {
	debugStyle = !debugStyle;
}
var debugStyle = false;
/*  //KS: put in _KDF_ready - uses all the reccomended styles - can add optional
applyStyle(['recommended']);
//KS: see 'Non-recommended defaults' within 'defaultNewStyle(elements)' for optional defaults */
function commonRegex() {
	// note back slashes have been escaped by adding extra back slash as jquery strips them out
	regexSearch("[0-9A-Za-z ]{2,}");
	regexSearch('[0-9A-Za-z ]{1,}',
		'.dform_widget_searchfield [data-customalias="forename"]');
	regexSearch('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
		'.dform_widget_searchfield [data-customalias="postcode"], [name="txt_postcode"] input, [name="postcode"] input');
	regexSearch('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
		'.dform_widget_type_email input[type="email"]');
	regexSearch('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$',
		'.dform_widget_type_tel input[type="tel"]');
}

function defineDefaultStyle() {
	//KS: can define listeners here, but can't later on, need to call
	//KS: adds the recommended default styling - and acts a single location to change them
	//KS: for the love of StackExchange don't put 'all' or 'recommended' in here
	var recommended = [
		// "mchk",
		"chk",
		// "rad",
		// "txt",
		// "dt",
		// "eml",
		// "num",
		// "pas",
		// "tel",
		// "time",
		// "txta",
		// "sel",
		"file",
		// "btn",
		// "search",
		// "highlightRequired", 
		// "field-label-right-align",
		"search-no-results",
		"txta-length",
		"txta-length-listener",
		// "detailToggle",
		//"noResultsFound",
		//"selectResult",
		"reset-search",
		"txt-enter-trigger-btn",
		//,'search-empty-search'
	];
	if (debugStyle)
		console.debug(
			"@defineDefaultStyle() the defined recommended styles that will be used [" +
			recommended.toString() +
			"]"
		);
	defaultNewStyle(recommended);
	//KS: trigger: '_style_defultsProvided, [arrayOfRecomendedStyles]'
	$(formName()).trigger("_style_defultsProvided", [recommended]);
}

function defaultNewStyle(elements) {

	replaceHeader('header1', 'h1');
	replaceHeader('header2', 'h2');
	replaceHeader('header3', 'h3');
	replaceHeader('header4', 'h4');
	replaceHeader('header5', 'h5');
	replaceHeader('header6', 'h6');

	//KS: adds styling to elemnts in an inefficent mannor but without the need to access custom.css
	//KS: adds the classes that are used for styling as well as for indication where functionility should be added in applyNewStyle
	if (elements === null) {
		return "Not valid - valid elements are ['mchk', 'chk', 'rad', 'txt', 'dt', 'eml', 'num', 'pas', 'tel', 'time', 'txta', 'sel', 'file', 'btn', 'txta-length','search','highlightRequired', 'file-progress',  'txt-no-min-height',  'sel-fill']";
	}
	if (elements == "all" || elements == "recommended") {
		//KS: adds the recommended default styling
		defineDefaultStyle();
		return;
	} else {
		/*TODO
		    Add file-limt-#
		    */
		elements.forEach(function (element) {
			var validStyle = true;
			switch (element) {
				case "all":
				case "recommended":
					validStyle = false;
					defineDefaultStyle();
					break;
				case "mchk":
					$("[data-type='multicheckbox']").addClass("mchk-gov");
					break;
				case "chk":
					$("[data-type='checkbox']").addClass("chk-gov");
					break;
				case "rad":
					$("[data-type='radio']").addClass("rad-gov");
					break;
				case "txt":
					$("[data-type='text']").addClass("txt-gov");
					break;
				case "dt":
					$("[data-type='date']").addClass("dt-gov");
					break;
				case "eml":
					$("[data-type='email']").addClass("eml-gov");
					break;
				case "num":
					$("[data-type='number']").addClass("num-gov");
					break;
				case "pas":
					$("[data-type='password']").addClass("pas-gov");
					break;
				case "tel":
					$("[data-type='tel']").addClass("tel-gov");
					break;
				case "time":
					$("[data-type='time']").addClass("time-gov");
					break;
				case "txta":
					$("[data-type='textarea']").addClass("txta-gov");
					break;
				case "sel":
					$("[data-type='select']").addClass("sel-gov");
					break;
				case "file":
					$("[data-type='file']").addClass("file-gov");
					break;
				case "btn":
					$("[data-type='button']").addClass("btn-gov");
					break;
				case "search":
					$(".dform_widget_type_search").addClass("search-gov");
					break;

				case "txta-length": //KS: allows optout of the maxchar feature as default
					$("[data-type='textarea'] > div:last-child").addClass("txta-length");
					break;
				case "highlightRequired": //KS: Ruths code to add required star
					highlightRequired();
					break;
				case "field-label-right-align": //KS: huge selector used to
					$(getFieldsLabels("left"))
						.parent()
						.parent()
						.addClass("text-align-right");
					break;

					//KS: Non-recommended defaults below
				case "sel-fill": //KS: mostly just an example of how to add optional default styles
					$("[data-type='select']").addClass("sel-
