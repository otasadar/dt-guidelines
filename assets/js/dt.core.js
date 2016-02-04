var dt = dt || {
	
	core : (function($) {
		
		/***************************************************************************************
		*** Document ready events **************************************************************
		***************************************************************************************/
		$(document).ready(function() {
			
			/*** Inits jQuery datepicker ********************************************************/
			$('.is-datepicker').datepicker({
				changeMonth: 				true,
				changeYear: 				true,
				showOtherMonths: 		true,
				selectOtherMonths: 	true,
				showButtonPanel: 		true,
				dateFormat:					'dd/mm/yy'
			});
			
			/*** Custom Switch functionality ****************************************************/
			$('.switch .btn').on('click', function() {
				$('.switch .btn').removeClass('active');
				$(this).addClass('active');
			});
			
			/*** Multiselect: custom 'select all' feature ***************************************/
			$('select option[value="select-all"]').on('click', function() {
				var select = $(this).closest('select');
				$('option', select).prop('selected', true);
				$(this).prop('selected', false);
				select.scrollTop(0);
			});
			
			/*** Elements that toggle display property of self/other elements *******************/
			$('.toggle-trigger').on('click', function() {
				var toggleTargetsAttr = 'toggle-targets';
				var toggleTargetClasses = $(this).attr(toggleTargetsAttr);
				
				if (typeof toggleTargetClasses == 'undefined') {
					consol.error(toggleTargetsAttr + ' attribute doesn\'t exist');
					return;
				}
				
				var tmp = toggleTargetClasses.split('|');
				
				if (tmp.length == 1) { // toggle the same element
					var toggleClasses = '.' + tmp[0].replace(',', ',.');
					$(toggleClasses).each(function() {
						if ($(this).hasClass('hidden')) {
							$(this).removeClass('hidden');
						} else {
							$(this).addClass('hidden');
						}
					});
				} else if (tmp.length == 2) { // toggle other element
					var hideClasses = '.' + tmp[0].replace(',', ',.');
					var showClasses = '.' + tmp[1].replace(',', ',.');
					$(hideClasses).each(function() {
						if ($(this).hasClass('hidden') == false) {
							$(this).addClass('hidden');
						}
					});
					$(showClasses).each(function() {
						$(this).removeClass('hidden');
					});
				} else {
					consol.error(toggleTargetsAttr + ' attribute has wrong value');
				}
			});
			
			/*** Show modal alert ****************************************************************
				type				string	required 												- default, success, info, warning, error
				message			string	required 												- alert message
				showIcon		bool		optional	default_value = false	- adds an success/info/etc. sign in front of the message
				showHeader	bool		optional	default_value = false - determines if header need to be displayed
				title				string	optional	default_value = ''		- modal title displayed in header
				buttons			mixed		optional	default_value = false	- list of button objects: 
					[{
						text:				'Ok',
						classes:		'btn-default',
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
					}]
				callback			mixed	optional	default_value = false 	- false or function to be executed after modal is shown
			*/
			$.fn.ShowModalAlert = function(type, message, showIcon = false, showHeader = false, title = '', buttons = false, callback = false) {
			
				// Remove existing modal
				$('.modal, .modal-backdrop').remove();
			
				var typeClass = 'modal-msg-type-default';
				var bootstrapClass = 'alert';
				var bootstrapGlyph = '';
				if (type == 'success') {
					typeClass = 'modal-msg-type-success';
					bootstrapClass = 'alert alert-success';
					bootstrapGlyph = '<span class="glyphicon glyphicon-ok"></span>';
				} else if (type == 'info') {
					typeClass = 'modal-msg-type-info';
					bootstrapClass = 'alert alert-info';
					bootstrapGlyph = '<span class="glyphicon glyphicon-info-sign"></span>';
				} else if (type == 'warning') {
					typeClass = 'modal-msg-type-warning';
					bootstrapClass = 'alert alert-warning';
					bootstrapGlyph = '<span class="glyphicon glyphicon-flag"></span>';
				} else if (type == 'error') {
					typeClass = 'modal-msg-type-error';
					bootstrapClass = 'alert alert-danger';
					bootstrapGlyph = '<span class="glyphicon glyphicon-remove"></span>';
				}
				
				// Footer buttons
				var footerBtns = '';
				if (buttons !== false && buttons instanceof Array) {
					for (a=0;a<buttons.length;a++) {
						var btnId = Math.floor(Math.random() * 99999999);
						footerBtns += '<button type="button" class="btn ' + buttons[a].classes + '"' + (buttons[a].closeModal === true ? ' data-dismiss="modal"' : '') + ' id="' + btnId + '">' + buttons[a].text + '</button>';
						$(document).on('click', '#' + btnId, buttons[a].click);
					}
				}

				// Prepare modal HTML
				var headerHtml =
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						'<h4 class="modal-title">' + title + '</h4>' +
					'</div>';
				var bodyHtml = '<div class="modal-body">' + (showIcon === true ? bootstrapGlyph : '') + ' ' + message + '</div>';
				var footerHtml = '<div class="modal-footer">' + footerBtns + '</div>';
				var modalHtml =
					'<div class="modal ' + typeClass + ' fade" tabindex="-1" role="dialog">' +
						'<div class="modal-dialog">' + 
							'<div class="modal-content">' + 
								(showHeader == true ? headerHtml : '') +
								bodyHtml + 
								(buttons !== false ? footerHtml : '') +
							'</div>' +
						'</div>' +
					'</div>';
					
				// Add modal to the DOM and show it
				$('body').append(modalHtml);
				$('.modal').modal();
				
				// Callback
				if (typeof callback == "function") {
					callback();
				}
			};
			
			/*** Moves <select> option from one <select> to another or moves option up/down ******
				within the same select.
			*/
			var needNumerationOptions = [];
			$('.move-select-options').on('click', function() {

				var moveDirection = 'horizontal';
				var inElement = ''; 							// class of element to move option up/down in
				var toElement = '';								// class of element to move option from
				var fromElement = '';							// class of element to move option to
				var needNumerationElement = ''; 	// class of element which options need to be numerated (empty if no numeration required)
				
				var classes = $(this).attr('class').split(' ');
				for(var a=0;a<classes.length;a++) {
					// Move from select to select
					if (classes[a].indexOf('move-from') != -1) {
						fromElement = '#' + classes[a].replace('move-from-', '');
					}
					if (classes[a].indexOf('move-to') != -1) {
						toElement = '#' + classes[a].replace('move-to-', '');
					}
					// Move within select
					if (classes[a].indexOf('move-up') != -1) {
						inElement = '#' + classes[a].replace('move-up-', '');
						moveDirection = 'up';
					} else if (classes[a].indexOf('move-down') != -1) {
						inElement = '#' + classes[a].replace('move-down-', '');
						moveDirection = 'down';
					}
					// Need numeration
					if (classes[a].indexOf('need-numeration') != -1) {
						needNumerationElement = '#' + classes[a].replace('need-numeration-', '');
					}
				}
				
				// Check if classes identified correctly
				var error = false;
				if (moveDirection == 'horizontal' && (fromElement == '' || toElement == '')) {
					error = true;
				} else if (moveDirection == 'up' && inElement == '') {
					error = true;
				} else if (moveDirection == 'down' && inElement == '') {
					error = true;
				}
				if (error == true) {
					alert('Error: unable to move item(s)!');
					return;
				}
				
				// Check if valid option(s) selcted
				if ($('option:selected', $(moveDirection == 'horizontal' ? fromElement : inElement)).length == 0) {
					alert('Please select at least one option first');
					return;
				} else if ($('option:selected', $(moveDirection == 'horizontal' ? fromElement : inElement)).filter('[value=""],[value="select-all"]').length > 0) {
					alert('Invalid options selected!');
					return;
				}
				
				// Move from one select to another
				if (moveDirection == 'horizontal') {
					$('option:selected', $(fromElement)).each(function() {
						var index = $(this).index();
						$(toElement).append(
							$('<option>', { 
								value: $(this).val(),
								text : $(this).text() 
							})
						);
						$(this).remove();
						
						//alert(needNumerationOptions.map(function(elem){return elem.text;}).join(","));
						if (needNumerationElement == fromElement) {
							needNumerationOptions.splice(index, 1);
						} else if (needNumerationElement == toElement) {
							needNumerationOptions.push({
								value: 	$(this).val(),
								text: 	$(this).text()
							});
						}
						//alert(needNumerationOptions.map(function(elem){return elem.text;}).join(","));
					});
				} 
				
				// Move up within the same select
				if (moveDirection == 'up') {
					$('option:selected', $(inElement)).each(function() {
						var index = $(this).index();
						if (index > 0) {
							var elToMove = needNumerationOptions[index];
							needNumerationOptions.splice(index, 1);
							needNumerationOptions.splice(index - 1, 0, { value:elToMove.value, text:elToMove.text});
							$(this).prev().before($(this));
						}
					});
				}
				
				// Move down within the same select
				if (moveDirection == 'down') {
					$($('option:selected', $(inElement)).get().reverse()).each(function() {
						var index = $(this).index();
						if (index < $('option', $(inElement)).length - 1) {
							var elToMove = needNumerationOptions[index];
							needNumerationOptions.splice(index, 1);
							needNumerationOptions.splice(index + 1, 0, { value:elToMove.value, text:elToMove.text});
							$(this).next().after($(this));
						}
					});
				}
				
				// Numerate options
				if (needNumerationElement != '') {
					$.fn.NumerateSelectOptions(needNumerationElement);
				}
			});
			
			/*** Adds numbers 1,2,3... to <select> options **************************************/
			$.fn.NumerateSelectOptions = function(elementToNumerate) {
				var separator = '. ';
				$(elementToNumerate + ' option').remove();
				for(var a=0;a < needNumerationOptions.length; a++) {
					$(elementToNumerate).append(
						$('<option>', { 
							value: needNumerationOptions[a].value,
							text : (a+1) + separator + needNumerationOptions[a].text 
						})
					);
				}
			};
			
			/*** Shows/hides 'more info' row in the table ***************************************/
			$('.dt-table-tr-clickable .dt-table-td:not(.row-actions)').on('click', function() {
				var moreinfo = $(this).closest('.dt-table-tr-clickable').next('.dt-table-tr-fullinfo');
				if (moreinfo.hasClass('hidden')) {
					// Collapse all other fullinfo rows
					$('.dt-table-tr-fullinfo:not(hidden)').addClass('hidden');
					// Show fullinfo
					moreinfo.removeClass('hidden');
				} else {
					moreinfo.addClass('hidden');
				}
			});
			
			/*** Loading spinner ****************************************************************/
			dt.core.loadingSpinner = {
				id:		'loading-spinner-container',
				show:	function() {
					var html = '<div id="' + this.id + '"></div>';
					$('body').append(html);
				},
				hide:	function() {
					$('#' + this.id).remove();
				}
			};
		});
		
		/***************************************************************************************
		*** Private Functions ******************************************************************
		***************************************************************************************/
		// Generates password
		function generatePassword(length) {
			var res = "";
			var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			for (var a=0,n=charset.length;a<length;++a) {
				res += charset.charAt(Math.floor(Math.random() * n));
			}
			return res;
		}
		
		/***************************************************************************************
		*** Public Functions/Properties ********************************************************
		***************************************************************************************/
		return {
				generatePassword: function(length) {
					return generatePassword(length);
				},
				modal: {
					showAlert: function(type, message, showIcon = false, showHeader = false, title = '', buttons = false, callback = false) {
						return $.fn.ShowModalAlert(type, message, showIcon, showHeader, title, buttons, callback);
					}
				},
				loadingSpinner: {} // will be set on $(document).ready
		}
	})(jQuery)
}