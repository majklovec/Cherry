var modal = function(args) {
	if (typeof(args) === 'undefined') {
		args = {};
	}
	if (typeof(args.modalTitle) === 'undefined') {
		args.modalTitle = 'The page at ' + document.location.hostname + ' says:';
	}
	if (typeof(args.iframe) !== 'undefined') {
		args.modalBody = $('<iframe>', {'width': '100%', 'height': '300', 'frameborder': '0', 'allowtransparency': true, 'src': args.iframe});
	}
	if (typeof(args.modalBody) === 'undefined') {
		args.modalBody = 'undefined';
	}
	if (typeof(args.modalBody) === 'boolean' && args.modalBody === false) {
		args.modalBody = 'false';
	}
	if (typeof(args.cancelText) === 'undefined') {
		args.cancelText = false;
	}
	if (typeof(args.cancelClass) === 'undefined') {
		args.cancelClass = 'btn btn-default';
	}
	if (typeof(args.cancelCallback) === 'undefined') {
		args.cancelCallback = function(confirmed) {};
	}
	if (typeof(args.confirmText) === 'undefined') {
		args.confirmText = false;
	}
	if (typeof(args.confirmClass) === 'undefined') {
		args.confirmClass = 'btn btn-success';
	}
	if (typeof(args.confirmCallback) === 'undefined') {
		args.confirmCallback = function(confirmed) {};
	}

	var confirmed = false;
	var $modal = $('<div>', {'class': 'modal fade', 'id': 'myModal', 'tabindex': '-1', 'role': 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true'});

	var $modalDialog = $('<div>', {'class': 'modal-dialog'});
	$modal.append($modalDialog);

	var $modalContent = $('<div>', {'class': 'modal-content'});
	$modalDialog.append($modalContent);

	var $modalHeader = $('<div>', {'class': 'modal-header'});
	$modalContent.append($modalHeader);

	var $closeButton = $('<button>', {'type': 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true', 'html': '&times'});
	$modalHeader.append($closeButton);

	var $modalTitle = $('<h4>', {'class': 'modal-title', 'id': 'myModalLabel', 'html': args.modalTitle});
	$modalHeader.append($modalTitle);

	var $modalBody = $('<div>', {'class': 'modal-body', 'html': args.modalBody});
	$modalContent.append($modalBody);

	if (args.cancelText !== false || args.confirmText !== false) {
		var $modalFooter = $('<div>', {'class': 'modal-footer'});
		$modalContent.append($modalFooter);
	}

	if (args.cancelText !== false) {
		var $cancelButton = $('<button>', {'type': 'button', 'class': args.cancelClass, 'data-dismiss': 'modal', 'html': args.cancelText});
		$modalFooter.append($cancelButton);
	}

	if (args.confirmText !== false) {
		var $confirmButton = $('<button>', {'type': 'button', 'class': args.confirmClass, 'html': args.confirmText});
		$modalFooter.append($confirmButton);
		$confirmButton.on('click', function(event) {
			event.preventDefault();
			confirmed = true;
			$modal.modal('hide');
		});
	}

	$modal.modal();

	$modal.on('hidden.bs.modal', function(event) {
		var $that = $(this);
		$that.removeData('modal');
		$that.remove();
		if (confirmed) {
			args.confirmCallback(confirmed);
		} else {
			args.cancelCallback(confirmed);
		}
	});

	return $modal;
};

var alertModal = function(message) {
	var args = message;
	if (typeof(args) === 'undefined') {
		args = {};
	} else if (typeof(args) !== 'object') {
		args = {
			modalBody: args
		};
	}
	if (typeof(args.confirmText) === 'undefined') {
		args.confirmText = 'OK';
	}
	modal(args);
};

var confirmModal = function(message, callback) {
	var args = message
	if (typeof(args) === 'undefined') {
		args = {};
	} else if (typeof(args) !== 'object') {
		args = {
			modalBody: args
		};
	}
	if (typeof(callback) !== 'undefined') {
		args.confirmCallback = callback;
		args.cancelCallback = callback;
	}
	if (typeof(args.cancelText) === 'undefined') {
		args.cancelText = 'Cancel';
	}
	if (typeof(args.confirmText) === 'undefined') {
		args.confirmText = 'OK';
	}
	modal(args);
};

$(function() {

	// These take care of the default cake alerts when setting up a new project
	$('.cake-error').addClass('alert alert-danger');
	$('.notice').parent().addClass('alert alert-warning');
	$('.error').parent().removeClass('alert-warning').addClass('alert alert-danger');
	$('.notice.success').parent().removeClass('alert-warning').addClass('alert alert-success');

});
