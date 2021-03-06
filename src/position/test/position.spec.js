describe('position elements', function () {

  var TargetElMock = function(width, height) {
    this.width = width;
    this.height = height;

    this.prop = function(propName) {
      return propName === 'offsetWidth' ? width : height;
    };
  };

  var $position, $window;

  beforeEach(module('ui.bootstrap.position'));
  beforeEach(inject(function (_$position_, _$window_) {
    $position = _$position_;
    $window = _$window_;
  }));
  beforeEach(function () {
    this.addMatchers({
      toBePositionedAt: function(top, left) {
        this.message = function() {
          return 'Expected "('  + this.actual.top + ', ' + this.actual.left +  ')" to be positioned at (' + top + ', ' + left + ')';
        };

        return this.actual.top == top && this.actual.left == left;
      }
    });
  });


  describe('append-to-body: false', function () {

    beforeEach(function () {
      //mock position info normally queried from the DOM
      $position.position = function() {
        return {
          width: 20,
          height: 20,
          top: 100,
          left: 100
        };
      };
    });

    it('should position element on top-center by default', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'other')).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top')).toBePositionedAt(90, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-center')).toBePositionedAt(90, 105);
    });

    it('should position on top-left', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-left')).toBePositionedAt(90, 100);
    });

    it('should position on top-right', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'top-right')).toBePositionedAt(90, 120);
    });

    it('should position elements on bottom-center when "bottom" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom')).toBePositionedAt(120, 105);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-center')).toBePositionedAt(120, 105);
    });

    it('should position elements on bottom-left', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-left')).toBePositionedAt(120, 100);
    });

    it('should position elements on bottom-right', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom-right')).toBePositionedAt(120, 120);
    });

    it('should position elements on left-center when "left" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left')).toBePositionedAt(105, 90);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-center')).toBePositionedAt(105, 90);
    });

    it('should position elements on left-top when "left-top" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-top')).toBePositionedAt(100, 90);
    });

    it('should position elements on left-bottom when "left-bottom" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'left-bottom')).toBePositionedAt(120, 90);
    });

    it('should position elements on right-center when "right" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right')).toBePositionedAt(105, 120);
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-center')).toBePositionedAt(105, 120);
    });

    it('should position elements on right-top when "right-top" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-top')).toBePositionedAt(100, 120);
    });

    it('should position elements on right-top when "right-top" specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-bottom')).toBePositionedAt(120, 120);
    });

    it('should offset calculated position right-top when left/top numbers are specified', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-bottom 1x1')).toBePositionedAt(121, 121);
    });

    it('should allow negative offset', function () {
      expect($position.positionElements({}, new TargetElMock(10, 10), 'right-bottom -1x-1')).toBePositionedAt(119, 119);
    });

    describe('Outside normal bounds', function () {
      beforeEach(function () {
        // Reposition so that it will always be out of bounds
        $position.position = function() {
          return {
            width: 20,
            height: 20,
            top: 40,
            left: 40
          };
        };

        // mock $window info
        $window.innerHeight = $window.innerWidth = 100;
      });

      it('should fallback to positionFallback if bottom is out of bounds', function () {
        expect($position.positionElements({}, new TargetElMock(100, 100), 'bottom', false, 'top')).toBePositionedAt(-60, 0);
      });
      it('should fallback to positionFallback if top is out of bounds', function () {
        expect($position.positionElements({}, new TargetElMock(100, 100), 'top', false, 'bottom')).toBePositionedAt(60, 0);
      });
      it('should fallback to positionFallback if left is out of bounds', function () {
        expect($position.positionElements({}, new TargetElMock(100, 100), 'left', false, 'right')).toBePositionedAt(0, 60);
      });
      it('should fallback to positionFallback if right is out of bounds', function () {
        expect($position.positionElements({}, new TargetElMock(100, 100), 'right', false, 'left')).toBePositionedAt(0, -60);
      });

      describe('with combination coordinates', function () {
        it('should fallback to positionFallback if bottom-left is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(100, 10), 'bottom-left', false, 'top-right')).toBePositionedAt(30, 0);
        });
        it('should fallback to positionFallback if top-right is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(10, 100), 'top-right', false, 'bottom-left')).toBePositionedAt(60, 40);
        });
      });

      describe('should fallback with offset applied', function () {
        it('should fallback to positionFallback if top is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(100, 10), 'bottom-left', false, 'top-right 1x1')).toBePositionedAt(31, 0);
        });
      });

      describe('should fallback after taking offset into account', function() {
        // If the element was positioned 'left', it will be at (45,30).
        // If the element was positioned 'right', it will be at (45,60).
        // If the element was positioned 'top', it will be at (30,45).
        // If the element was positioned 'bottom', it will be at (60,45).
        it('should fallback to positionFallback if left with outset is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(10, 10), 'left -31x20', false, 'right')).toBePositionedAt(45, 60);
        });
        it('should fallback to positionFallback if right with outset is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(10, 10), 'right 91x20', false, 'left')).toBePositionedAt(45, 30);
        });
        it('should fallback to positionFallback if top with outset is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(10, 10), 'top 20x-31', false, 'bottom')).toBePositionedAt(60, 45);
        });
        it('should fallback to positionFallback if bottom with outset is out of bounds', function () {
          expect($position.positionElements({}, new TargetElMock(10, 10), 'bottom 20x91', false, 'top')).toBePositionedAt(30, 45);
        });
      });
    });
  });

});
