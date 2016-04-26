angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody, positionFallbackStr) {

        function doPositioning (hostEl, targetEl, positionStr, appendToBody, positionFallbackStr) {
          var splitPositionStr = positionStr.split(' '),
            positionStrParts = splitPositionStr[0].split('-'),
            offsetStrParts = (splitPositionStr[1] || '').split('x'),
            pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center',
            off0 = parseInt((offsetStrParts[0] || 0), 10), off1 = parseInt((offsetStrParts[1] || 0), 10);

          var hostElPos,
            targetElWidth,
            targetElHeight,
            targetElPos;

          hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

          targetElWidth = targetEl.prop('offsetWidth');
          targetElHeight = targetEl.prop('offsetHeight');

          var shiftWidth = {
            center: function () {
              return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
              return hostElPos.left;
            },
            right: function () {
              return hostElPos.left + hostElPos.width;
            }
          };

          var shiftHeight = {
            center: function () {
              return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
              return hostElPos.top;
            },
            bottom: function () {
              return hostElPos.top + hostElPos.height;
            }
          };

          switch (pos0) {
            case 'right':
              targetElPos = {
                top: shiftHeight[pos1]() + off1,
                left: shiftWidth[pos0]() + off0
              };
              break;
            case 'left':
              targetElPos = {
                top: shiftHeight[pos1]() + off1,
                left: hostElPos.left - targetElWidth + off0
              };
              break;
            case 'bottom':
              targetElPos = {
                top: shiftHeight[pos0]() + off1,
                // Ensure that the element never bleeds off the right edge
                left: Math.min(shiftWidth[pos1]() + off0,$window.innerWidth - targetElWidth)
              };
              break;
            default:
              targetElPos = {
                top: hostElPos.top - targetElHeight + off1,
                left: Math.min(shiftWidth[pos1]() + off0,$window.innerWidth - targetElWidth)
              };
              break;
          }

          if (positionFallbackStr && (
            // TOP
            (
              // Popover it outside the top of the containing element
              (targetElPos.top - targetElHeight < 0) &&
              // If we are positioning at the top
              (positionStr.match(/top/) || !positionStr /* 'top' is default */)
            ) || (
              // BOTTOM
              (targetElPos.top + targetElHeight > $window.innerHeight) &&
              positionStr.match(/bottom/)
            ) || (
              // LEFT
              (targetElPos.left - targetElWidth < 0) &&
              positionStr.match(/left/)
            ) || (
              // RIGHT
              ((targetElPos.left + targetElWidth) > $window.innerWidth) &&
              positionStr.match(/right/)
            )
          )) {
            return doPositioning.call(this, hostEl, targetEl, positionFallbackStr, appendToBody);
          }
          // Pass this on so we can set the class later.
          targetElPos.placement = positionStr;
          return targetElPos;
        }

        return doPositioning.apply(this, arguments);
      }
    };
  }]);
