'use strict';

let allCal = [];
class Calendar {
    constructor(tag, year, options) {
        this.tag = tag;
        this.year = year;
        this.maxActiveDate = options.maxActiveDate;
        this.minActiveDate = options.minActiveDate;
        this.startMonth = null;
        this.endMonth = null;
        this.startQuarter = null;
        this.endQuarter = null;
    }
    plusYear() {
        this.year += 1;
    }
    minusYear() {
        this.year -= 1;
    }
    init() {
        allCal.push(this);
        let body = document.querySelector('body');
        let bodyCal =
            `<div id="${this.tag}" class="calendar-vz modal">
                <div class="header">
                    <div class="header_year">
                        <span class="prev">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M136.97 380.485l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.485 116c-4.686 4.686-4.686 12.284 0 16.971l116.485 116c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>
                        </span>
                        <span class="txt"></span>
                        <span class="next">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M311.03 131.515l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887l-83.928 83.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l116.485-116c4.686-4.686 4.686-12.284 0-16.971L328 131.515c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>
                        </span>
                    </div>
                </div>
                <div class="body">
                    <div class="body_month">
                        <div class="quarter" area-quarter="1">1 квартал<span></span></div>
                        <div class="month" area-month="1">Янв</div>
                        <div class="month" area-month="2">Фев</div>
                        <div class="month" area-month="3">Мар</div>
                        <div class="quarter" area-quarter="2">2 квартал<span></span></div>
                        <div class="month" area-month="4">Апр</div>
                        <div class="month" area-month="5">Май</div>
                        <div class="month" area-month="6">Июн</div>
                        <div class="quarter" area-quarter="3">3 квартал<span></span></div>
                        <div class="month" area-month="7">Июл</div>
                        <div class="month" area-month="8">Авг</div>
                        <div class="month" area-month="9">Сен</div>
                        <div class="quarter" area-quarter="4">4 квартал<span></span></div>
                        <div class="month" area-month="10">Окт</div>
                        <div class="month" area-month="11">Ноя</div>
                        <div class="month" area-month="12">Дек</div>
                    </div>
                </div>
                <div class="footer">
                    <div class="ok">ОК</div>
                </div>
            </div>`;
        body.insertAdjacentHTML('beforeend', bodyCal);
    }
    reset() {
        this.startMonth = null;
        this.endMonth = null;
        this.startQuarter = null;
        this.endQuarter = null;
    }
    setActiveMonth() {
        let end = (this.endMonth === null)?this.startMonth:this.endMonth;
        let start = this.startMonth;
        this.resetMonth();
        this.resetQuarter();
        for (let i = start; i <= end; i++) {
            let elem = document.querySelector(`#${this.tag} .month[area-month='${i}']`);
            elem.setAttribute('active', '');
        }
    }
    setActiveQuarter() {
        let end = (this.endQuarter === null)?this.startQuarter:this.endQuarter;
        let start = this.startQuarter;
        let startM = start * 3 - 2;
        let endM = end * 3;
        this.resetMonth();
        this.resetQuarter();
        for (let i = start; i <= end; i++) {
            let elem = document.querySelector(`#${this.tag} .quarter[area-quarter='${i}']`);
            elem.setAttribute('active', '');
        }
        for (let i = startM; i <= endM; i++) {
            let elem = document.querySelector(`#${this.tag} .month[area-month='${i}']`);
            if (i < Number(this.minActiveDate.split(', ')[1]) + 1) {
                this.startMonth = i + 1;
            }
            // if (i > Number(this.maxActiveDate.split(', ')[1]) + 1) {
            //     this.startMonth = i + 1;
            // }
            if (!elem.classList.contains('non-active')) {
                elem.setAttribute('active', '');
            }
        }
    }
    markHoverMonth(firstActive, endMark) {
        if (endMark < firstActive) {
            let temp = firstActive;
            firstActive = endMark;
            endMark = temp;
        }
        //resetMonth(this.tag, true);
        this.resetMonth(true);
        for (let i = firstActive; i <= endMark; i++) {
            let elem = document.querySelector(`#${this.tag} .month[area-month='${i}']`);
            elem.classList.add('marked');
        }
    }
    markHoverQuarter(firstActive, endMark) {
        if (endMark < firstActive) {
            let temp = firstActive;
            firstActive = endMark;
            endMark = temp;
        }
        let firstActiveM = firstActive * 3 - 2;
        let endMarkM = endMark * 3;
        this.resetMonth(true);
        for (let i = firstActiveM; i <= endMarkM; i++) {
            let elem = document.querySelector(`#${this.tag} .month[area-month='${i}']`);
            elem.classList.add('marked');
        }
    }
    resetMonth(activeIgnore = null) {
        let allM = (activeIgnore)
            ?document.querySelectorAll(`#${this.tag} .month:not([active])`)
            :document.querySelectorAll(`#${this.tag} .month`);
        for (let month of allM) {
            month.removeAttribute('active');
            month.classList.remove('marked');
        }
    }
    resetQuarter() {
        let allQ = document.querySelectorAll(`#${this.tag} .quarter`);
        for (let quarter of allQ) {
            quarter.removeAttribute('active');
        }
    }
    checkMinMax(prevY, nextY) {
        let maxMonth = Number(this.maxActiveDate.split(', ')[1]) + 1;
        let minMonth = Number(this.minActiveDate.split(', ')[1]) + 1;
        for (let m = 1; m <= 12; m++ ){
            let quarterNum = (m%3 === 0)?m/3:(m-m%3)/3+1;
            if ( (this.year === Number(this.maxActiveDate.split(', ')[0])) && (m > maxMonth)
                || (this.year === Number(this.minActiveDate.split(', ')[0])) && (m < minMonth) ) {
                document.querySelector(`#${this.tag} .month[area-month='${m}']`).classList.add('non-active');
                document.querySelector(`#${this.tag} .quarter[area-quarter='${quarterNum}']`).classList.add('non-active');
            } else {
                document.querySelector(`#${this.tag} .month[area-month='${m}']`).classList.remove('non-active');
                document.querySelector(`#${this.tag} .quarter[area-quarter='${quarterNum}']`).classList.remove('non-active');
            }
        }
        prevY.style.display = (this.year === Number(this.minActiveDate.split(', ')[0]))?'none':'inline';
        nextY.style.display = (this.year === Number(this.maxActiveDate.split(', ')[0]))?'none':'inline';
    }
}



document.addEventListener("DOMContentLoaded", function(e) {
    allCal.forEach(function (cal, i, allCal) {
        let calDiv = document.querySelector(`#${cal.tag}`);
        let txtDiv = document.querySelector(`.${cal.tag}`);
        let firstTxt = txtDiv.textContent;
        txtDiv.onclick = function () {
            calDiv.classList.add('open');
            calDiv.insertAdjacentHTML('afterend', '<div class="lock-modal"></div>');
            let lockBlock = document.querySelector('.lock-modal');
            lockBlock.onclick = function () {
                calDiv.classList.remove('open');
                lockBlock.remove();
                cal.resetMonth();
                cal.resetQuarter();
                cal.reset();
                txtDiv.textContent = firstTxt;
            }
            let okDiv = calDiv.querySelector(`.ok`);
            okDiv.onclick = function () {
                if (!cal.endMonth) {
                    cal.endMonth = (cal.startQuarter)?cal.startQuarter*3:cal.startMonth;
                }
                let startDate = new Date(cal.year, cal.startMonth-1, 1);
                let endDate = new Date(cal.year, cal.endMonth-1, 30);
                let startMonth = startDate.getMonth()+1;
                let endMonth = endDate.getMonth()+1;
                txtDiv.textContent = `1 ${calParts[startMonth].name2} - ${calParts[endMonth].lastDay} ${calParts[endMonth].name2} ${endDate.getFullYear()} г.`;
                calDiv.classList.remove('open');
                lockBlock.remove();
                cal.resetMonth(true);
                cal.startQuarter = null;
                cal.endQuarter = null;
            }
        }
        let yearTxt = document.querySelector(`#${cal.tag} .header_year span.txt`);
        yearTxt.textContent = cal.year;
        let prevY = document.querySelector(`#${cal.tag} .prev svg`);
        let nextY = document.querySelector(`#${cal.tag} .next svg`);
        let bodyMonth = document.querySelector(`#${cal.tag} .body_month`);
        cal.checkMinMax(prevY, nextY);
        prevY.onclick = function () {
            cal.minusYear();
            yearTxt.textContent = cal.year;
            cal.checkMinMax(prevY, nextY);
            cal.resetMonth();
            cal.resetQuarter();
            cal.reset();
        }
        nextY.onclick = function () {
            cal.plusYear();
            yearTxt.textContent = cal.year;
            cal.checkMinMax(prevY, nextY);
            cal.resetMonth();
            cal.resetQuarter();
            cal.reset();
        }
        // months checking
        let mothDiv = document.querySelectorAll(`#${cal.tag} .month`);
        for (let elem of mothDiv) {
            elem.onclick = function () {
                if ((cal.startMonth) && (cal.endMonth)) {
                    if (!elem.classList.contains('non-active')) {
                        cal.startMonth = parseInt(elem.getAttribute('area-month'));
                        cal.endMonth = null;
                        cal.setActiveMonth();
                    }
                } else if ((cal.startMonth) && (!cal.endMonth)) {
                    if (!elem.classList.contains('non-active')) {
                        cal.endMonth = parseInt(elem.getAttribute('area-month'));
                        let start = cal.startMonth;
                        if (cal.endMonth < start) {
                            let temp = start;
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
            }
            elem.onmousemove = function () {
                if ( (cal.startMonth) && (!cal.endMonth) ) {
                    let firstActive = parseInt(document.querySelector(`#${cal.tag} .month[area-month='${cal.startMonth}']`).getAttribute('area-month'));
                    let endMark = parseInt(elem.getAttribute('area-month'));
                    cal.markHoverMonth(firstActive, endMark);
                }
            }
        }
        //_months checking
        // quarter checking
        let quarterDiv = document.querySelectorAll(`#${cal.tag} .quarter`);
        for (let elem of quarterDiv) {
            elem.onclick = function () {
                if ((cal.startQuarter) && (cal.endQuarter)) {
                    if (!elem.classList.contains('non-active')) {
                        cal.startQuarter = parseInt(elem.getAttribute('area-quarter'));
                        cal.endQuarter = null;
                        cal.startMonth = cal.startQuarter * 3 - 2;
                        cal.endMonth = null;
                        cal.setActiveQuarter();
                    }
                } else if ((cal.startQuarter) && (!cal.endQuarter)) {
                    if (!elem.classList.contains('non-active')) {
                        cal.endQuarter = parseInt(elem.getAttribute('area-quarter'));
                        let start = cal.startQuarter;
                        if (cal.endQuarter < start) {
                            let temp = start;
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
            }
            elem.onmousemove = function () {
                if ( (cal.startQuarter) && (!cal.endQuarter) ) {
                    let firstActiveQ = parseInt(document.querySelector(`#${cal.tag} .quarter[area-quarter='${cal.startQuarter}']`).getAttribute('area-quarter'));
                    let endMarkQ = parseInt(elem.getAttribute('area-quarter'));
                    cal.markHoverQuarter(firstActiveQ, endMarkQ);
                }
            }
        }
        //_quarter checking
    });
});




const calParts = {
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
    },
}




