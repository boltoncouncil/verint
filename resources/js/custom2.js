$( document ).ready(function() {
	
function formName(){
    
    //KS: I want triggers to work same way as api.js, so need this to get name
    if (KDF.kdf().name){
	    return '#dform_'+KDF.kdf().name;
    }else{
        //KS: just incase, this will work in most cases (it's what was used before)
	    if (debugStyle) console.debug('kdf name undefined - using #dform_container')
        return '#dform_container';
    }
}

function txtaLength(){
    //KS: updates the chars left box for txta-length styled elements
    //    used as the function in the textarea input 
    var maxLength = $(this).attr('maxlength');
    if (maxLength !== undefined && maxLength !== 0){
        var currentLength = $(this).val().length;
        //KS: won't show up if there isnt a limit
        var message = $(this).parent().find("> .txta-length-message");
        if (currentLength >= maxLength){
            message.html("You have reached the maximum number of characters")
        }else{
            message.html((maxLength-currentLength)+" characters left")
        }
    }
}

function noResultsFound(){
    //KS: when there is no results, add a non-selectable option to say such
    var text = 'No results found';
    if ($(this).children().length < 1){
         $(this).html('<option hidden>'+text+'</option>')
    }
}

function selectResult(){
    //KS: when there are results, add a non-selectable option to say such
    var text = 'Please select a result...';
    //KS: BUG-FIX so that it works with 'No results returned' adding an option
    if ($(this).children(':not([hidden])').length > 0){
        $(this).find('> option:first').attr('hidden', '').text('Please select a result...')
    }
}
	 
function replaceHeader(className,tag) {
	$('.' + className).each(function() {
        var id = $(this).attr('id');
	    console.log(id);
	    if (id) {
            var header = document.getElementById(id);
            var newHeader = document.createElement(tag);
            var attrs = header.attributes;
            for (var i=0;i<attrs.length;i++){
                newHeader.setAttribute(attrs[i].name,attrs[i].value);
            }
            newHeader.innerHTML = header.innerHTML;
            header.parentNode.replaceChild(newHeader, header);
	    }
    });
}

function commonRegex(){
    // note back slashes have been escaped by adding extra back slash as jquery strips them out
    regexSearch("[0-9A-Za-z ]{2,}");
	regexSearch('[0-9A-Za-z ]{1,}',
		    '.dform_widget_searchfield [data-customalias="forename"]');
	regexSearch('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
	 	    '.dform_widget_searchfield [data-customalias="postcode"], [name="txt_postcode"] input');
	regexSearch('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
		    '.dform_widget_type_email input[type="email"]'); 
	regexSearch('^(\\(?\\+?[0-9]*\\)?)?[0-9_\\- \\(\\)]*$',
		    '.dform_widget_type_tel input[type="tel"]');
}

function regexSearch(regex, selector){
	if (selector === undefined){
		selector = ".dform_widget_searchfield input:text, .apply-regex, #dform_widget_txt_postcode";
	}
	//Else use custom selector
    //KS E.G.: regexSearch("[0-9A-Za-z ]{3,}")
	var elements = $(selector);
	elements.attr('pattern',regex);

}

// add a non selectable option on search results to indicate if results found or not
	 $(formName()).on('_KDF_search', function(event, kdf, response, type, name) {
	     console.log('first')
		//KS: call noResultsFound with 'this' set to the search element that triggered the event
		noResultsFound.call($('[name="'+name+'_id"]'));
		//KS: call noResultsFound with 'this' set to the search element that triggered the event
		selectResult.call($('[name="'+name+'_id"]'));
		
	 });

function applyStyles(){

// mark up headings semantically using the appropriate <h#>
	 replaceHeader('header1','h1');
	 replaceHeader('header2','h2');
	 replaceHeader('header3','h3');
	 replaceHeader('header4','h4');
	 replaceHeader('header5','h5');
	 replaceHeader('header6','h6');
	 
	 // apply common regex for postcode, tel, email widgets
	 commonRegex();
	 
	
	 // if citizen is authenticated hide message about signing into account
	 if(KDF.kdf().authenticated){
	     KDF.hideWidget('ahtm_login_info');

	 }

	 // add style and element for text area character count feature as default
	 $("[data-type='textarea'] > div:last-child").addClass('txta-length'); 
	 
	 $("[data-type='textarea']").find('> div:last-child')
	                            .not(":has(.txta-length-message)")
	                            .append('<div class="txta-length-message"></div>');
	 
	 // trigger text area character count
	 $(formName()).on('input', '.js-character-count textarea',txtaLength);
	 
	 // trigger button click when enter button hit on search widgets
	 $(formName()).on('keypress','.dform_widget_type_search [type="text"]',function(event) {
	       	if (event.keyCode == 13) {
				$(this).parent().parent().parent().find('[type="button"]').trigger('click');
			}
	 });
	 
	 // style reset icon on search widgets as a button
	 $('.dform_widget_type_search').find('select').css('margin-right','0.45rem');
	 $('.dform_widget_type_search').find('.dform_widget_search_closeresults')
	                               .addClass('btn btn-secondary')
	                               .text('Search again');
	 
	
	

	 // hide success message on complete
	 $(formName()).on('_KDF_complete', function(event, kdf) {
	     // hide the success message so that the ref number isn't displayed twice
	     $('#dform_successMessage').addClass('display-none');
	     
	 });
}

});	
