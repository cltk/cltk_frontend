'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders infinite scroll component
 */

var InfiniteScroll = function (_React$Component) {
  _inherits(InfiniteScroll, _React$Component);

  /**
   * constructor
   */

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    /**
     * Binding this to the methods
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteScroll).call(this, props));

    _this.handleScrollEnd = _this.handleScrollEnd.bind(_this);
    return _this;
  }

  /**
   * Adding the event listener when container is in DOM
   */


  _createClass(InfiniteScroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.container = this.props.container ? document.getElementsByClassName(this.props.container)[0] : window;
      this.container.addEventListener('scroll', this.handleScrollEnd);
    }

    /**
     * computing the top position
     */

  }, {
    key: 'topPosition',
    value: function topPosition(el) {
      return el ? el.offsetTop + this.topPosition(el.offsetParent) : 0;
    }

    /**
     * Checks if scrolled to bottom of container
     */

  }, {
    key: 'handleScrollEnd',
    value: function handleScrollEnd(e) {
      var el = e.target;
      if (this.container === window) {
        var target = el.scrollingElement;
        var targetScroll = target.scrollHeight - (target.clientHeight + target.scrollTop);
        if (targetScroll < this.props.endPadding) {
          this.props.loadMore(true); // Tell parent to do subscription
        }
      } else {
        var scrollTop = window.pageYOffset ? window.pageYOffset : el.scrollTop || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var _targetScroll = this.topPosition(el) + el.offsetHeight + scrollTop - window.innerHeight;
        if (_targetScroll > Number(this.props.endPadding)) {
          this.props.loadMore(true); // Tell parent to do subscription
        }
      }
    }

    /**
     * render the children
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        null,
        this.props.children
      );
    }
  }]);

  return InfiniteScroll;
}(_react2.default.Component);

InfiniteScroll.propTypes = {
  endPadding: _react2.default.PropTypes.number,
  children: _react2.default.PropTypes.node,
  container: _react2.default.PropTypes.string,
  loadMore: _react2.default.PropTypes.func
};

InfiniteScroll.defaultProps = {
  endPadding: 100,
  children: _react2.default.createElement(
    'div',
    null,
    ' '
  ),
  loadMore: function loadMore() {}
};

/**
 * export the component
 */
exports.default = InfiniteScroll;
