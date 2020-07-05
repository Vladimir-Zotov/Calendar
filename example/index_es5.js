'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allCal = [];

var Calendar = function () {
    function Calendar(tag, year, options) {
        _classCallCheck(this, Calendar);

        this.tag = tag;
        this.year = year;
        this.maxActiveDate = options.maxActiveDate;
        this.minActiveDate = options.minActiveDate;
        this.startMonth = null;
        this.endMonth = null;
        this.startQuarter = null;
        this.endQuarter = null;
    }

    _createClass(Calendar, [{
        key: 'plusYear',
        value: function plusYear() {
            this.year += 1;
        }
    }, {
        key: 'minusYear',
        value: function minusYear() {
            this.year -= 1;
        }
    }, {
        key: 'init',
        value: function init() {
            allCal.push(this);
            var body = document.querySelector('body');
            var bodyCal = '<div id="' + this.tag + '" class="calendar-vz modal">\n                <div class="header">\n                    <div class="header_year">\n                        <span class="prev">\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M136.97 380.485l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.485 116c-4.686 4.686-4.686 12.284 0 16.971l116.485 116c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>\n                        </span>\n                        <span class="txt"></span>\n                        <span class="next">\n                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M311.03 131.515l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887l-83.928 83.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l116.485-116c4.686-4.686 4.686-12.284 0-16.971L328 131.515c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>\n                        </span>\n                    </div>\n                </div>\n                <div class="body">\n                    <div class="body_month">\n                        <div class="quarter" area-quarter="1">1 \u043A\u0432\u0430\u0440\u0442\u0430\u043B<span></span></div>\n                        <div class="month" area-month="1">\u042F\u043D\u0432</div>\n                        <div class="month" area-month="2">\u0424\u0435\u0432</div>\n                        <div class="month" area-month="3">\u041C\u0430\u0440</div>\n                        <div class="quarter" area-quarter="2">2 \u043A\u0432\u0430\u0440\u0442\u0430\u043B<span></span></div>\n                        <div class="month" area-month="4">\u0410\u043F\u0440</div>\n                        <div class="month" area-month="5">\u041C\u0430\u0439</div>\n                        <div class="month" area-month="6">\u0418\u044E\u043D</div>\n                        <div class="quarter" area-quarter="3">3 \u043A\u0432\u0430\u0440\u0442\u0430\u043B<span></span></div>\n                        <div class="month" area-month="7">\u0418\u044E\u043B</div>\n                        <div class="month" area-month="8">\u0410\u0432\u0433</div>\n                        <div class="month" area-month="9">\u0421\u0435\u043D</div>\n                        <div class="quarter" area-quarter="4">4 \u043A\u0432\u0430\u0440\u0442\u0430\u043B<span></span></div>\n                        <div class="month" area-month="10">\u041E\u043A\u0442</div>\n                        <div class="month" area-month="11">\u041D\u043E\u044F</div>\n                        <div class="month" area-month="12">\u0414\u0435\u043A</div>\n                    </div>\n                </div>\n                <div class="footer">\n                    <div class="ok">\u041E\u041A</div>\n                </div>\n            </div>';
            body.insertAdjacentHTML('beforeend', bodyCal);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.startMonth = null;
            this.endMonth = null;
            this.startQuarter = null;
            this.endQuarter = null;
        }
    }, {
        key: 'setActiveMonth',
        value: function setActiveMonth() {
            var end = this.endMonth === null ? this.startMonth : this.endMonth;
            var start = this.startMonth;
            this.resetMonth();
            this.resetQuarter();
            for (var i = start; i <= end; i++) {
                var elem = document.querySelector('#' + this.tag + ' .month[area-month=\'' + i + '\']');
                elem.setAttribute('active', '');
            }
        }
    }, {
        key: 'setActiveQuarter',
        value: function setActiveQuarter() {
            var end = this.endQuarter === null ? this.startQuarter : this.endQuarter;
            var start = this.startQuarter;
            var startM = start * 3 - 2;
            var endM = end * 3;
            this.resetMonth();
            this.resetQuarter();
            for (var i = start; i <= end; i++) {
                var elem = document.querySelector('#' + this.tag + ' .quarter[area-quarter=\'' + i + '\']');
                elem.setAttribute('active', '');
            }
            for (var _i = startM; _i <= endM; _i++) {
                var _elem = document.querySelector('#' + this.tag + ' .month[area-month=\'' + _i + '\']');
                if (_i < Number(this.minActiveDate.split(', ')[1]) + 1) {
                    this.startMonth = _i + 1;
                }
                // if (i > Number(this.maxActiveDate.split(', ')[1]) + 1) {
                //     this.startMonth = i + 1;
                // }
                if (!_elem.classList.contains('non-active')) {
                    _elem.setAttribute('active', '');
                }
            }
        }
    }, {
        key: 'markHoverMonth',
        value: function markHoverMonth(firstActive, endMark) {
            if (endMark < firstActive) {
                var temp = firstActive;
                firstActive = endMark;
                endMark = temp;
            }
            //resetMonth(this.tag, true);
            this.resetMonth(true);
            for (var i = firstActive; i <= endMark; i++) {
                var elem = document.querySelector('#' + this.tag + ' .month[area-month=\'' + i + '\']');
                elem.classList.add('marked');
            }
        }
    }, {
        key: 'markHoverQuarter',
        value: function markHoverQuarter(firstActive, endMark) {
            if (endMark < firstActive) {
                var temp = firstActive;
                firstActive = endMark;
                endMark = temp;
            }
            var firstActiveM = firstActive * 3 - 2;
            var endMarkM = endMark * 3;
            this.resetMonth(true);
            for (var i = firstActiveM; i <= endMarkM; i++) {
                var elem = document.querySelector('#' + this.tag + ' .month[area-month=\'' + i + '\']');
                elem.classList.add('marked');
            }
        }
    }, {
        key: 'resetMonth',
        value: function resetMonth() {
            var activeIgnore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var allM = activeIgnore ? document.querySelectorAll('#' + this.tag + ' .month:not([active])') : document.querySelectorAll('#' + this.tag + ' .month');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = allM[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var month = _step.value;

                    month.removeAttribute('active');
                    month.classList.remove('marked');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'resetQuarter',
        value: function resetQuarter() {
            var allQ = document.querySelectorAll('#' + this.tag + ' .quarter');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = allQ[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var quarter = _step2.value;

                    quarter.removeAttribute('active');
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'checkMinMax',
        value: function checkMinMax(prevY, nextY) {
            var maxMonth = Number(this.maxActiveDate.split(', ')[1]) + 1;
            var minMonth = Number(this.minActiveDate.split(', ')[1]) + 1;
            for (var m = 1; m <= 12; m++) {
                var quarterNum = m % 3 === 0 ? m / 3 : (m - m % 3) / 3 + 1;
                if (this.year === Number(this.maxActiveDate.split(', ')[0]) && m > maxMonth || this.year === Number(this.minActiveDate.split(', ')[0]) && m < minMonth) {
                    document.querySelector('#' + this.tag + ' .month[area-month=\'' + m + '\']').classList.add('non-active');
                    document.querySelector('#' + this.tag + ' .quarter[area-quarter=\'' + quarterNum + '\']').classList.add('non-active');
                } else {
                    document.querySelector('#' + this.tag + ' .month[area-month=\'' + m + '\']').classList.remove('non-active');
                    document.querySelector('#' + this.tag + ' .quarter[area-quarter=\'' + quarterNum + '\']').classList.remove('non-active');
                }
            }
            prevY.style.display = this.year === Number(this.minActiveDate.split(', ')[0]) ? 'none' : 'inline';
            nextY.style.display = this.year === Number(this.maxActiveDate.split(', ')[0]) ? 'none' : 'inline';
        }
    }]);

    return Calendar;
}();

document.addEventListener("DOMContentLoaded", function (e) {
    allCal.forEach(function (cal, i, allCal) {
        var calDiv = document.querySelector('#' + cal.tag);
        var txtDiv = document.querySelector('.' + cal.tag);
        var firstTxt = txtDiv.textContent;
        txtDiv.onclick = function () {
            calDiv.classList.add('open');
            calDiv.insertAdjacentHTML('afterend', '<div class="lock-modal"></div>');
            var lockBlock = document.querySelector('.lock-modal');
            lockBlock.onclick = function () {
                calDiv.classList.remove('open');
                lockBlock.remove();
                cal.resetMonth();
                cal.resetQuarter();
                cal.reset();
                txtDiv.textContent = firstTxt;
            };
            var okDiv = calDiv.querySelector('.ok');
            okDiv.onclick = function () {
                if (!cal.endMonth) {
                    cal.endMonth = cal.startQuarter ? cal.startQuarter * 3 : cal.startMonth;
                }
                var startDate = new Date(cal.year, cal.startMonth - 1, 1);
                var endDate = new Date(cal.year, cal.endMonth - 1, 30);
                var startMonth = startDate.getMonth() + 1;
                var endMonth = endDate.getMonth() + 1;
                txtDiv.textContent = '1 ' + calParts[startMonth].name2 + ' - ' + calParts[endMonth].lastDay + ' ' + calParts[endMonth].name2 + ' ' + endDate.getFullYear() + ' \u0433.';
                calDiv.classList.remove('open');
                lockBlock.remove();
                cal.resetMonth(true);
                cal.startQuarter = null;
                cal.endQuarter = null;
            };
        };
        var yearTxt = document.querySelector('#' + cal.tag + ' .header_year span.txt');
        yearTxt.textContent = cal.year;
        var prevY = document.querySelector('#' + cal.tag + ' .prev svg');
        var nextY = document.querySelector('#' + cal.tag + ' .next svg');
        var bodyMonth = document.querySelector('#' + cal.tag + ' .body_month');
        cal.checkMinMax(prevY, nextY);
        prevY.onclick = function () {
            cal.minusYear();
            yearTxt.textContent = cal.year;
            cal.checkMinMax(prevY, nextY);
            cal.resetMonth();
            cal.resetQuarter();
            cal.reset();
        };
        nextY.onclick = function () {
            cal.plusYear();
            yearTxt.textContent = cal.year;
            cal.checkMinMax(prevY, nextY);
            cal.resetMonth();
            cal.resetQuarter();
            cal.reset();
        };
        // months checking
        var mothDiv = document.querySelectorAll('#' + cal.tag + ' .month');
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            var _loop = function _loop() {
                var elem = _step3.value;

                elem.onclick = function () {
                    if (cal.startMonth && cal.endMonth) {
                        if (!elem.classList.contains('non-active')) {
                            cal.startMonth = parseInt(elem.getAttribute('area-month'));
                            cal.endMonth = null;
                            cal.setActiveMonth();
                        }
                    } else if (cal.startMonth && !cal.endMonth) {
                        if (!elem.classList.contains('non-active')) {
                            cal.endMonth = parseInt(elem.getAttribute('area-month'));
                            var start = cal.startMonth;
                            if (cal.endMonth < start) {
                                var temp = start;
                                cal.startMonth = cal.endMonth;
                                cal.endMonth = temp;
                            }
                            cal.setActiveMonth();
                        }
                    } else if (!cal.startMonth) {
                        if (!elem.classList.contains('non-active')) {
                            cal.startMonth = parseInt(elem.getAttribute('area-month'));
                            cal.setActiveMonth();
                        }
                    }
                };
                elem.onmousemove = function () {
                    if (cal.startMonth && !cal.endMonth) {
                        var firstActive = parseInt(document.querySelector('#' + cal.tag + ' .month[area-month=\'' + cal.startMonth + '\']').getAttribute('area-month'));
                        var endMark = parseInt(elem.getAttribute('area-month'));
                        cal.markHoverMonth(firstActive, endMark);
                    }
                };
            };

            for (var _iterator3 = mothDiv[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                _loop();
            }
            //_months checking
            // quarter checking
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        var quarterDiv = document.querySelectorAll('#' + cal.tag + ' .quarter');
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            var _loop2 = function _loop2() {
                var elem = _step4.value;

                elem.onclick = function () {
                    if (cal.startQuarter && cal.endQuarter) {
                        if (!elem.classList.contains('non-active')) {
                            cal.startQuarter = parseInt(elem.getAttribute('area-quarter'));
                            cal.endQuarter = null;
                            cal.startMonth = cal.startQuarter * 3 - 2;
                            cal.endMonth = null;
                            cal.setActiveQuarter();
                        }
                    } else if (cal.startQuarter && !cal.endQuarter) {
                        if (!elem.classList.contains('non-active')) {
                            cal.endQuarter = parseInt(elem.getAttribute('area-quarter'));
                            var start = cal.startQuarter;
                            if (cal.endQuarter < start) {
                                var temp = start;
                                cal.startQuarter = cal.endQuarter;
                                cal.endQuarter = temp;
                            }
                            cal.startMonth = cal.startQuarter * 3 - 2;
                            cal.endMonth = cal.endQuarter * 3;
                            cal.setActiveQuarter();
                        }
                    } else if (!cal.startQuarter) {
                        if (!elem.classList.contains('non-active')) {
                            cal.startQuarter = parseInt(elem.getAttribute('area-quarter'));
                            cal.startMonth = cal.startQuarter * 3 - 2;
                            cal.endMonth = null;
                            cal.setActiveQuarter();
                        }
                    }
                };
                elem.onmousemove = function () {
                    if (cal.startQuarter && !cal.endQuarter) {
                        var firstActiveQ = parseInt(document.querySelector('#' + cal.tag + ' .quarter[area-quarter=\'' + cal.startQuarter + '\']').getAttribute('area-quarter'));
                        var endMarkQ = parseInt(elem.getAttribute('area-quarter'));
                        cal.markHoverQuarter(firstActiveQ, endMarkQ);
                    }
                };
            };

            for (var _iterator4 = quarterDiv[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                _loop2();
            }
            //_quarter checking
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    });
});

var calParts = {
    '1': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Январь',
        'name2': 'Января'
    },
    '2': {
        'firstDay': '01',
        'lastDay': '28',
        'name': 'Февраль',
        'name2': 'Февраля'
    },
    '3': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Март',
        'name2': 'Марта'
    },
    '4': {
        'firstDay': '01',
        'lastDay': '30',
        'name': 'Апрель',
        'name2': 'Апреля'
    },
    '5': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Май',
        'name2': 'Мая'
    },
    '6': {
        'firstDay': '01',
        'lastDay': '30',
        'name': 'Июнь',
        'name2': 'Июня'
    },
    '7': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Июль',
        'name2': 'Июля'
    },
    '8': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Август',
        'name2': 'Августа'
    },
    '9': {
        'firstDay': '01',
        'lastDay': '30',
        'name': 'Сентябрь',
        'name2': 'Сентября'
    },
    '10': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Октябрь',
        'name2': 'Октября'
    },
    '11': {
        'firstDay': '01',
        'lastDay': '30',
        'name': 'Ноябрь',
        'name2': 'Ноября'
    },
    '12': {
        'firstDay': '01',
        'lastDay': '31',
        'name': 'Декабрь',
        'name2': 'Декабря'
    }
};
