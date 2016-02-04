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
	
		/*** Modal samples ******************************************************************/
		$('#show-modal-alert-default').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('default', "This is a sample message!");
		});
		$('#show-modal-alert-info').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('info', "This is a sample info message!");
		});
		$('#show-modal-alert-success').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('success', "This is a sample success message!");
		});
		$('#show-modal-alert-warning').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('warning', "This is a sample warning message!");
		});
		$('#show-modal-alert-error').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('error', "This is a sample error message!");
		});
		$('#show-modal-alert-info-icon').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('info', "This is a sample info message!", true);
		});
		$('#show-modal-alert-success-icon').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('success', "This is a sample success message!", true);
		});
		$('#show-modal-alert-warning-icon').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('warning', "This is a sample warning message!", true);
		});
		$('#show-modal-alert-error-icon').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('error', "This is a sample error message!", true);
		});
		$('#show-modal-alert-default-with-header').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('default', "This is a sample message!", true, true, 'Header Title');
		});
		$('#show-modal-alert-default-with-header-and-footer').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('default', "This is a sample message!", true, true, 'Header Title', [{
					text:				'Ok',
					classes:		'btn-submit',
					closeModal:	false,
					click:			false
				}, 
				{
					text:				'Close',
					classes:		'btn-cancel',
					closeModal:	true,
					click:			false
				},
				{
					text:				'My Button',
					classes:		'btn-default',
					closeModal:	false,
					click:			function() { alert('My Button clicked!'); }
				}
			]);
		});
		$('#show-modal-alert-default-with-callback').on('click', function(e) {
			e.preventDefault();
			dt.core.modal.showAlert('default', "This is a sample message!", false, false, '', false, function() {
				alert('This is alert from callback function!');
			});
		});
		
		$('#show-loading-spinner').on('click', function(e) {
			e.preventDefault();
			dt.core.loadingSpinner.show();
			$('#loading-spinner-container').on('click', function() {
					dt.core.loadingSpinner.hide();
				});
		});
		
		/*** Form validation ****************************************************************/
		$.fn.InitFormValidation = function(formId) {
			$(formId + ' .validate-form').on('click', function(){
					$(formId).validate(params);
					$(formId).submit();
			});
			// Validation params
			var params = {
				submitHandler: function() {
					alert("Submitted successfully!");
				},
				rules: {
					sampleInputText: {
						required: 	true,
						minlength: 	3
					},
					samplePasswordText: {
						required: 	true,
						minlength: 	8
					},
					sampleTextarea: {
						required: 	true,
						minlength: 	10
					},
					sampleSelectSelectAll: {
						required: 	true
					},
					sampleSelect: {
						required: 	true
					},
					sampleFileUpload: {
						required: 	true
					},
					sampleRadioGroup: {
						required: 	true
					},
					sampleCkb: {
						required: 	true
					}
				},
				messages: {
					sampleInputText: {
						required: 	"Please enter Text",
						minlength: 	"Text Input must consist of at least 3 characters"
					},
					samplePasswordText: {
						required: 	"Please enter Password",
						minlength: 	"Password must consist of at least 8 characters"
					},
					sampleTextarea: {
						required: 	"Please enter Textarea",
						minlength: 	"Textarea must consist of at least 10 characters"
					},
					sampleSelectSelectAll: {
						required: 	"Please make a selection"
					},
					sampleSelect: {
						required: 	"Please make a selection"
					},
					sampleFileUpload: {
						required: 	"Please attach a file"
					},
					sampleRadioGroup: {
						required: 	"Please select a radio button"
					},
					sampleCkb: {
						required: 	"Please select at least one checkbox"
					}
				},
				showErrors: function(errorMap, errorList) {
					if ($(formId).hasClass('jquery-validate-tooltip')) {
						// Clean up any tooltips for valid elements
						$.each(this.validElements(), function (index, element) {
								var $element = $(element);
								$element.data("title", "").removeClass("error").tooltip("destroy");
						});
						// Create new tooltips for invalid elements
						$.each(errorList, function (index, error) {
								var $element = $(error.element);
								$element.tooltip("destroy").data("title", error.message).addClass("error").tooltip({animation: false, trigger: 'manual'}).tooltip("show");
						});
					} else {
						this.defaultShowErrors();
					}
				}, 
				errorPlacement: function(error, element) {
					if ($(formId).hasClass('jquery-validate-tooltip') === false) {
						if (element.is(':radio')) {
							error.appendTo(element.parents('.radio-group'));
						} else if (element.is(':checkbox')) {
							error.appendTo(element.parents('.checkbox-group'));
						} else {
							error.insertAfter(element);
						}
					}
				}
			};
		};
		
		/*** Regular form validation ********************************************************/
		$.fn.InitFormValidation('#sample-form');
		$.fn.InitFormValidation('#sample-modal-form');
		
		/*** Bootstrap Switch ***************************************************************/
		$('.bootstrap-switch').bootstrapSwitch();
	
	});
})(jQuery);