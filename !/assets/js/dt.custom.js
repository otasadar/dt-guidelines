(function($) {
	
	$(document).ready(function() {
		
		/*** Init jQuery masked input *******************************************************/
		$('.masked-input-date').mask("99/99/9999");
		$('.masked-input-phone-uae-short').mask('99-9999999');
		$('.masked-input-phone-uae-long').mask('(999) 99-9999999');
		$('.masked-input-mobile-uae-short').mask('999-9999999');
		$('.masked-input-pob').mask('POB: 99999 aaa');
		
		/*** Init jQuery enhanced select ****************************************************/
		$('.enhanced-select').chosen({
			disable_search_threshold: 	6,
			allow_single_deselect: 			1,
			no_results_text: 						'Nothing matching search criteria:'
		});
		
		var maxSelectedOptions = 3;
		$('.enhanced-multiselect').chosen({
			disable_search_threshold: 	6,
			max_selected_options: 			maxSelectedOptions,
			no_results_text: 						'Nothing matching search criteria:'
		}).bind('chosen:maxselected', function () {
			alert('You cannot select more than ' + maxSelectedOptions + ' items!');
		});
		
		/*** Init jQuery autocomplete *******************************************************/
		var availableTags = [
      "Australia",
			"Austria",
			"Brazil",
			"Canada",
			"Chile",
			"China",
			"Denmark",
			"Egypt",
			"France",
			"Germany",
			"Greece",
			"India",
			"Iran",
			"Iraq",
			"Japan",
			"Jordan",
			"Kenya",
			"Libya",
			"Malaysia",
			"Morocco",
			"Netherlands",
			"New Zealand",
      "Oman",
      "Pakistan",
      "Poland",
      "Portugal ",
      "Qatar",
      "Saudi Arabia",
      "South Africa",
      "Spain",
      "Sudan",
      "Sweden",
      "Switzerland",
      "Syria",
      "Thailand",
      "Tunisia",
      "Turkey",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Yemen",
      "Zimbabwe"
    ];
    $('.is-autocomplete').autocomplete({
      source: availableTags
    });
	});
	
})(jQuery);