'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseHandler = function ResponseHandler(emitter, debug) {
  _classCallCheck(this, ResponseHandler);

  return function (response) {
    if (debug) {
      console.log(response);
    } // eslint-disable-line no-console

    var isJson = response.headers['content-type'] == 'text/json';
    var isTiff = response.headers['content-type'] == 'image/tiff';
    var isPdf = response.headers['content-type'] == 'application/pdf';
    var isImage = isTiff || isPdf;
    var result = isImage ? [] : '';

    var isLocation = response.headers['location'] !== undefined;

    response.on('data', function (chunk) {
      if (isImage) {
        result.push(chunk);
      } else {
        result += chunk;
      }
    });

    response.on('end', function () {
      if (debug) {
        console.log(result);
      } // eslint-disable-line no-console

      if (isLocation) {
        result = new _location2.default(response.headers['location']);
      } else if (isJson && result.length > 0) {
        result = JSON.parse(result);
      } else if (isJson && result.length == 0) {
        result = null;
      } else if (isImage) {
        var data = Buffer.concat(result);
        result = new _image2.default(data, response.headers['content-type']);
      }

      if (response.statusCode === 401) {
        emitter.emit('reject', new Error('Unauthorized request. ' + JSON.stringify(result)));
      } else if (response.statusCode >= 300) {
        emitter.emit('reject', result);
      } else {
        emitter.emit('resolve', result);
      }
    });

    response.on('close', function (error) {
      emitter.emit('reject', error);
    });
  };
};

exports.default = ResponseHandler;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbIlJlc3BvbnNlSGFuZGxlciIsImVtaXR0ZXIiLCJkZWJ1ZyIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImlzSnNvbiIsImhlYWRlcnMiLCJpc1RpZmYiLCJpc1BkZiIsImlzSW1hZ2UiLCJyZXN1bHQiLCJpc0xvY2F0aW9uIiwidW5kZWZpbmVkIiwib24iLCJjaHVuayIsInB1c2giLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJkYXRhIiwiQnVmZmVyIiwiY29uY2F0Iiwic3RhdHVzQ29kZSIsImVtaXQiLCJFcnJvciIsInN0cmluZ2lmeSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxlLEdBQ0oseUJBQVlDLE9BQVosRUFBcUJDLEtBQXJCLEVBQTRCO0FBQUE7O0FBQzFCLFNBQU8sVUFBQ0MsUUFBRCxFQUFjO0FBQ25CLFFBQUlELEtBQUosRUFBVztBQUFFRSxjQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFBd0IsS0FEbEIsQ0FDbUI7O0FBRXRDLFFBQUlHLFNBQWNILFNBQVNJLE9BQVQsQ0FBaUIsY0FBakIsS0FBb0MsV0FBdEQ7QUFDQSxRQUFJQyxTQUFjTCxTQUFTSSxPQUFULENBQWlCLGNBQWpCLEtBQW9DLFlBQXREO0FBQ0EsUUFBSUUsUUFBY04sU0FBU0ksT0FBVCxDQUFpQixjQUFqQixLQUFvQyxpQkFBdEQ7QUFDQSxRQUFJRyxVQUFjRixVQUFVQyxLQUE1QjtBQUNBLFFBQUlFLFNBQWNELFVBQVUsRUFBVixHQUFlLEVBQWpDOztBQUVBLFFBQUlFLGFBQWNULFNBQVNJLE9BQVQsQ0FBaUIsVUFBakIsTUFBaUNNLFNBQW5EOztBQUVBVixhQUFTVyxFQUFULENBQVksTUFBWixFQUFvQixVQUFTQyxLQUFULEVBQWdCO0FBQ2xDLFVBQUlMLE9BQUosRUFBYTtBQUNYQyxlQUFPSyxJQUFQLENBQVlELEtBQVo7QUFDRCxPQUZELE1BRU87QUFDTEosa0JBQVVJLEtBQVY7QUFDRDtBQUNGLEtBTkQ7O0FBUUFaLGFBQVNXLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFlBQVc7QUFDNUIsVUFBSVosS0FBSixFQUFXO0FBQUVFLGdCQUFRQyxHQUFSLENBQVlNLE1BQVo7QUFBc0IsT0FEUCxDQUNROztBQUVwQyxVQUFJQyxVQUFKLEVBQWdCO0FBQUVELGlCQUFTLHVCQUFhUixTQUFTSSxPQUFULENBQWlCLFVBQWpCLENBQWIsQ0FBVDtBQUFzRCxPQUF4RSxNQUNLLElBQUlELFVBQVVLLE9BQU9NLE1BQVAsR0FBZ0IsQ0FBOUIsRUFBaUM7QUFBRU4saUJBQVNPLEtBQUtDLEtBQUwsQ0FBV1IsTUFBWCxDQUFUO0FBQThCLE9BQWpFLE1BQ0EsSUFBSUwsVUFBVUssT0FBT00sTUFBUCxJQUFpQixDQUEvQixFQUFrQztBQUFFTixpQkFBUyxJQUFUO0FBQWdCLE9BQXBELE1BQ0EsSUFBSUQsT0FBSixFQUFhO0FBQ2hCLFlBQU1VLE9BQU9DLE9BQU9DLE1BQVAsQ0FBY1gsTUFBZCxDQUFiO0FBQ0FBLGlCQUFTLG9CQUFVUyxJQUFWLEVBQWdCakIsU0FBU0ksT0FBVCxDQUFpQixjQUFqQixDQUFoQixDQUFUO0FBQ0Q7O0FBRUQsVUFBSUosU0FBU29CLFVBQVQsS0FBd0IsR0FBNUIsRUFBaUM7QUFDL0J0QixnQkFBUXVCLElBQVIsQ0FBYSxRQUFiLEVBQXVCLElBQUlDLEtBQUosQ0FBVSwyQkFBMkJQLEtBQUtRLFNBQUwsQ0FBZWYsTUFBZixDQUFyQyxDQUF2QjtBQUNELE9BRkQsTUFFTyxJQUFJUixTQUFTb0IsVUFBVCxJQUF1QixHQUEzQixFQUFnQztBQUNyQ3RCLGdCQUFRdUIsSUFBUixDQUFhLFFBQWIsRUFBdUJiLE1BQXZCO0FBQ0QsT0FGTSxNQUVBO0FBQ0xWLGdCQUFRdUIsSUFBUixDQUFhLFNBQWIsRUFBd0JiLE1BQXhCO0FBQ0Q7QUFDRixLQWxCRDs7QUFvQkFSLGFBQVNXLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFVBQVNhLEtBQVQsRUFBZ0I7QUFDbkMxQixjQUFRdUIsSUFBUixDQUFhLFFBQWIsRUFBdUJHLEtBQXZCO0FBQ0QsS0FGRDtBQUdELEdBMUNEO0FBMkNELEM7O2tCQUdZM0IsZSIsImZpbGUiOiJyZXNwb25zZS1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlICAgIGZyb20gJy4vaW1hZ2UnO1xuaW1wb3J0IExvY2F0aW9uIGZyb20gJy4vbG9jYXRpb24nO1xuXG5jbGFzcyBSZXNwb25zZUhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihlbWl0dGVyLCBkZWJ1Zykge1xuICAgIHJldHVybiAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChkZWJ1ZykgeyBjb25zb2xlLmxvZyhyZXNwb25zZSk7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICAgIGxldCBpc0pzb24gICAgICA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID09ICd0ZXh0L2pzb24nO1xuICAgICAgbGV0IGlzVGlmZiAgICAgID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT0gJ2ltYWdlL3RpZmYnO1xuICAgICAgbGV0IGlzUGRmICAgICAgID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC10eXBlJ10gPT0gJ2FwcGxpY2F0aW9uL3BkZic7XG4gICAgICBsZXQgaXNJbWFnZSAgICAgPSBpc1RpZmYgfHwgaXNQZGY7XG4gICAgICBsZXQgcmVzdWx0ICAgICAgPSBpc0ltYWdlID8gW10gOiAnJztcblxuICAgICAgbGV0IGlzTG9jYXRpb24gID0gcmVzcG9uc2UuaGVhZGVyc1snbG9jYXRpb24nXSAhPT0gdW5kZWZpbmVkO1xuXG4gICAgICByZXNwb25zZS5vbignZGF0YScsIGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgICAgIGlmIChpc0ltYWdlKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goY2h1bmspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCArPSBjaHVuaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRlYnVnKSB7IGNvbnNvbGUubG9nKHJlc3VsdCk7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICAgICAgaWYgKGlzTG9jYXRpb24pIHsgcmVzdWx0ID0gbmV3IExvY2F0aW9uKHJlc3BvbnNlLmhlYWRlcnNbJ2xvY2F0aW9uJ10pOyB9XG4gICAgICAgIGVsc2UgaWYgKGlzSnNvbiAmJiByZXN1bHQubGVuZ3RoID4gMCkgeyByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7IH1cbiAgICAgICAgZWxzZSBpZiAoaXNKc29uICYmIHJlc3VsdC5sZW5ndGggPT0gMCkgeyByZXN1bHQgPSBudWxsOyB9XG4gICAgICAgIGVsc2UgaWYgKGlzSW1hZ2UpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gQnVmZmVyLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgIHJlc3VsdCA9IG5ldyBJbWFnZShkYXRhLCByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCdyZWplY3QnLCBuZXcgRXJyb3IoJ1VuYXV0aG9yaXplZCByZXF1ZXN0LiAnICsgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPj0gMzAwKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCdyZWplY3QnLCByZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCgncmVzb2x2ZScsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXNwb25zZS5vbignY2xvc2UnLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBlbWl0dGVyLmVtaXQoJ3JlamVjdCcsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzcG9uc2VIYW5kbGVyO1xuIl19