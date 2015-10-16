if (typeof jQuery === "undefined") { throw new Error("The Appiphony Lightning JavaScript tooltip plugin requires jQuery") }

(function($) {
    var showTooltip = function(e) {
        var $target = $(e.target).closest('[data-sljs="tooltip"]');
        
        if (!$target.attr('data-sljs-title')) {
            $target.attr('data-sljs-title', $target.attr('title'));
            $target.attr('title', ''); 
            $target.css('position', 'relative');
        }
        var toolkitId = $target.attr('data-sljs-id') || 'sljs-' + (new Date()).valueOf();
        var nubbinHeight = 15;
        var nubbinWidth = 15;
        var tooltipContent = $target.attr('data-sljs-title');
        var tooltipPosition = $target.attr('data-placement') || 'top';
        var tooltipNubbins = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left'
        };
        var tooltipPositioningCSS = 'overflow: visible; display: inline-block;';
        
        var tooltipMarkup = '<div id="' + toolkitId + '" aria-describedby="' + toolkitId + '" class="slds-tooltip slds-nubbin--' + (tooltipNubbins[tooltipPosition] || 'top') + '" role="tooltip" style="' + tooltipPositioningCSS +'">' +
                                '<div class="slds-tooltip__content">' +
                                    '<div class="slds-tooltip__body">' +
                                    tooltipContent +
                                    '</div>' +
                                '</div>' +
                            '</div>';
        
        if ($target.next('.slds-tooltip').length === 0) {
            $target.after(tooltipMarkup);
            var $tooltipNode = $target.next('.slds-tooltip');
            
            $tooltipNode.css('width', ($tooltipNode.innerWidth() + 1) + 'px'); // Adding one, as a buffer since widths are rounded down.
            
            if (tooltipPosition === 'top' || tooltipPosition === 'bottom') {
                $tooltipNode.css(tooltipPosition, '-' + ($tooltipNode.innerHeight() + nubbinHeight) + 'px');
                $tooltipNode.css('left', ($target.innerWidth() / 2) - ($tooltipNode.innerWidth() / 2) + 'px'); 
            } else if (tooltipPosition === 'left' || tooltipPosition === 'right') {
                $tooltipNode.css('top', ($target.innerHeight() / 2) - ($tooltipNode.innerHeight() / 2) + 'px'); 
                $tooltipNode.css(tooltipPosition, '-' + ($tooltipNode.innerWidth() + nubbinWidth) + 'px');
            }
            $([$target[0], $tooltipNode[0]]).wrapAll('<span data-sljs="tooltip-container" style="position: relative; display: inline-block;"></span>');
            $tooltipNode.css('position', 'absolute');
            
            if (e.type === 'focusin') {
                $target.focus();
            }
        } 
    };
    
    var hideTooltip = function(e) {
        var $target = $(e.target).closest('[data-sljs="tooltip"]');
        var $tooltipNode = $target.next('.slds-tooltip');
        
        if ($tooltipNode.length > 0 && $target.parent().data('sljs') === 'tooltip-container') {
            $tooltipNode.remove();
            $target.unwrap();
        }
    };
    
    $.fn.tooltip = function(options) {
        var settings = $.extend({
            // These are the defaults.
            
        }, options );
        
        if (settings.selector && this.length === 1) {
            return this.on('mouseenter', settings.selector, showTooltip)
                .on('focusin', settings.selector, showTooltip)
                .on('mouseleave', settings.selector, hideTooltip)
                .on('blur', settings.selector, hideTooltip);
        } else {
            return this.each(function() {
                $(this).on('mouseenter', showTooltip)
                       .on('focusin', showTooltip)
                       .on('mouseleave', hideTooltip)
                       .on('blur', hideTooltip);
            });
        }
    };
}(jQuery));