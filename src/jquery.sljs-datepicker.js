if (typeof jQuery === "undefined") { throw new Error("The Salesforce Lightning JavaScript Toolkit requires jQuery") }
if (typeof moment === "undefined") { throw new Error("The Salesforce Lightning JavaScript Toolkit requires momentjs") }

// based on bootstrap-datepicker.js 


(function($) {

    var datepickerMenuMarkup = 
    '<div class="slds-dropdown slds-dropdown--left slds-datepicker" aria-hidden="false" data-selection="single">' +
        '<div class="slds-datepicker__filter slds-grid">' +
            '<div class="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">' +
                '<div class="slds-align-middle">' +
                    '<button id="sljs-prevButton" class="slds-button slds-button--icon-container">' +
                        '<svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">' +
                            '<use xlink:href="{{sldsUrl}}/assets/icons/utility-sprite/svg/symbols.svg#left"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Previous Month</span>' +
                    '</button>' +
                '</div>' +
                '<h2 id="month" class="slds-align-middle" aria-live="assertive" aria-atomic="true"></h2>' +
                '<div class="slds-align-middle">' +
                    '<button id="sljs-nextButton" class="slds-button slds-button--icon-container">' +
                        '<svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">' +
                            '<use xlink:href="{{sldsUrl}}/assets/icons/utility-sprite/svg/symbols.svg#right"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Next Month</span>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div class="slds-form-element"><div class="slds-form-element__control">' +
                '<div class="slds-picklist datepicker__filter--year slds-shrink-none">' +
                // '<button id="year" class="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true">' +
                //     '<span id="sljs-year"></span>' +
                //     '<svg aria-hidden="true" class="slds-icon slds-icon--small">' +
                //         '<use xlink:href="{{sldsUrl}}/assets/icons/utility-sprite/svg/symbols.svg#down"></use>' +
                //     '</svg>' +
                // '</button>' +
            '</div></div>' +
            '</div>' +
        '</div>';

    var datepickerTableMarkup = 
        '<table class="datepicker__month" role="grid" aria-labelledby="month">' +
            '<thead>' +
                '<tr id="weekdays">' +
                    '<th id="Sunday">' +
                        '<abbr title="Sunday">S</abbr>' +
                    '</th>' +
                    '<th id="Monday">' +
                        '<abbr title="Monday">M</abbr>' +
                    '</th>' +
                    '<th id="Tuesday">' +
                        '<abbr title="Tuesday">T</abbr>' +
                    '</th>' +
                    '<th id="Wednesday">' +
                        '<abbr title="Wednesday">W</abbr>' +
                    '</th>' +
                    '<th id="Thursday">' +
                        '<abbr title="Thursday">T</abbr>' +
                    '</th>' +
                    '<th id="Friday">' +
                        '<abbr title="Friday">F</abbr>' +
                    '</th>' +
                    '<th id="Saturday">' +
                        '<abbr title="Saturday">S</abbr>' +
                    '</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                
            '</tbody>' +
        '</table>' +
    '</div>';

    var Datepicker = function(el, options) {
        this.$el = $(el);

        var initDate = moment(options.initDate) || moment();
        var endDateId = this.$el.data('sljs-end-date');

        this.$datepickerEl = $(datepickerMenuMarkup.replace(/{{sldsUrl}}/g, options.assetsLocation) + datepickerTableMarkup);
        this.options = options;

        if (options.initDate) {
            this.setSelectedFullDate(initDate);
        }

        if (endDateId && $('#' + endDateId).length === 1) {
            console.log('init multi')

            this.$elEndDate = $('#' + endDateId);

            if (options.endDate) {
                this.setEndFullDate(endDate);
            }
        }
        
        this.initInteractivity();  
    };

    Datepicker.prototype = {
        constructor: Datepicker,
        initInteractivity: function() {
            var self = this;
            var $datepickerEl = this.$datepickerEl;
            var $el = this.$el;
            var $elEndDate = this.$elEndDate || [];

            // Opening datepicker
            $([$el[0], $elEndDate[0]]).on('focus', function(e) {
                if ((e.target === $el[0] && ($el.val() !== null && $el.val() !== '')) || (e.target === $elEndDate[0] && ($elEndDate.val() !== null && $elEndDate.val() !== ''))) {

                } else {
                    var initDate = self.selectedFullDate || moment();
                    self.viewedMonth = initDate.month();
                    self.viewedYear = initDate.year();
                    self.fillMonth();
                    self.$selectedInput = $(e.target);

                    if ($el.closest('.slds-form-element').next('.slds-datepicker').length > 0) {
                        $datepickerEl.show();
                    } else {
                        self.$selectedInput.closest('.slds-form-element').append($datepickerEl);   
                        self.initYearDropdown();
                        $([$el, $datepickerEl, $elEndDate]).each(function() {
                            $(this).on('click', self.blockClose);
                        });         
                        $datepickerEl.on('click', self, self.processClick);
                    }  
                    self.$selectedInput.blur();
                    $('body').on('click', self, self.closeDatepicker); 
                }    
            });

            

            

            /* focus out?
            $([$el, $datepickerEl.find('button')]).each(function() {
                $(this).on('blur', function(e) {
                    if ($(e.relatedTarget).closest('.slds-form--stacked').find($el).length === 0) {
                        self.closeDatepicker();
                    }
                    //self.closeDatepicker();
                });
            });
            */
        },
        fillMonth: function() {
            var self = this;
            var dayLabels = this.options.dayLabels;
            var monthArray = this.getMonthArray();
            var $monthTableBody = $('<tbody>');
            var isMultiSelect = this.$elEndDate && this.$elEndDate.length > 0;
            
            monthArray.forEach(function(rows) {
                var $weekRow = $('<tr>').appendTo($monthTableBody);
                
                if (rows.hasMultiRowSelection) {
                    $weekRow.addClass('slds-has-multi-row-selection');
                }

                rows.data.forEach(function(col, colIndex) {
                    var $dayCol = $('<td data-sljs-date="' + col.dateValue + '">').appendTo($weekRow);

                    $dayCol.prop({
                        headers: dayLabels[colIndex].full,
                        role: 'gridcell'
                    });

                    $('<span class="slds-day">' + col.value + '</span>').appendTo($dayCol);
                    
                    if (!col.isCurrentMonth) {
                        $dayCol.addClass('slds-disabled-text');
                        $dayCol.prop('aria-disabled', 'true');
                    }

                    if (col.isSelected || col.isSelectedEndDate || col.isSelectedMulti) {
                        $dayCol.prop('aria-selected', 'true');
                        $dayCol.addClass(isMultiSelect ? 'slds-is-selected-multi slds-is-selected' : 'slds-is-selected');
                    } else {
                        $dayCol.prop('aria-selected', 'false');
                    }

                    if (col.isToday) {
                        $dayCol.addClass('slds-is-today');
                    }

                });
            });

            this.$datepickerEl.find('tbody').replaceWith($monthTableBody);
            this.$datepickerEl.find('#month').text(this.options.monthLabels[this.viewedMonth].full);
            this.$datepickerEl.find('#sljs-year').text(this.viewedYear);
        },
        initYearDropdown: function() {
            var self = this;
            var $yearSelect = this.$datepickerEl.find('select');
            var viewedYear = this.viewedYear;

            if ($yearSelect.length > 0) {
                $yearSelect.val(this.viewedYear);
            } else {
                //var $yearDropdown = $('<label><span class="assistiveText">year</span></label>')
                var $yearDropdown = $('<label></label>')

                $yearSelect = $('<select class="slds-select select picklist__label">').appendTo($yearDropdown);

             //   var $yearContainer = $('<div id="sljs-yearDropdown" class="slds-dropdown slds-dropdown--menu">');
             //   var $yearDropdown = $('<ul class="slds-dropdown__list" style="max-height: 13.5rem; overflow-y:auto;"></ul>').appendTo($yearContainer);
                var currentYear = moment().year();
                // var selectedIconMarkup = ('<svg aria-hidden="true" class="slds-icon slds-icon--small slds-icon--left">' +
                //                         '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="{{sldsUrl}}/assets/icons/standard-sprite/svg/symbols.svg#task2" data-reactid=".46.0.0.1:$=10:0.0.$=11:0.0.0.0"></use>' +
                //                     '</svg>').replace(/{{sldsUrl}}/g, this.options.assetsLocation);

                for (var i = currentYear - this.options.numYearsBefore; i <= currentYear + this.options.numYearsAfter; i++) {
                    var $yearOption = $('<option value="' + i + '">' + i + '</option>').appendTo($yearSelect);
                }

                $yearSelect.val(viewedYear);

                this.$datepickerEl.find('.datepicker__filter--year').append($yearDropdown);
            }

            $yearSelect.on('change', function(e) {
                console.log('update');
                self.viewedYear = $(e.target).val();
                self.fillMonth();
            });
            
        },
        getMMDDYYYY: function(month, date, year) {
            return (month > 9 ? month : '0' + month) + '/' + (date > 9 ? date : '0' + date) + '/' + year;
        },
        getMonthArray: function() {
            var self = this;
            var selectedFullDate = this.selectedFullDate;
            var selectedEndDate = this.selectedEndDate;
            var selectedDate = selectedFullDate ? selectedFullDate.date() : null;
            var selectedMonth = selectedFullDate ? selectedFullDate.month() : null;
            var selectedYear = selectedFullDate ? selectedFullDate.year() : null;

            var viewedMonth = this.viewedMonth;
            var viewedYear = this.viewedYear;

            var previousMonth = viewedMonth === 0 ? 11 : viewedMonth - 1;
            var nextMonth = viewedMonth === 11 ? 0 : viewedMonth + 1;
            var numDaysInMonth = this.getNumDaysInMonth(viewedYear, viewedMonth);
            var numDaysInPrevMonth = this.getNumDaysInMonth(viewedYear, previousMonth);
            var numDaysInNextMonth = this.getNumDaysInMonth(viewedYear, nextMonth);
            var firstDayOfMonth = (new Date(viewedYear, viewedMonth, 1)).getDay();
            var allDays = [];
            var calendarRows = [];
            var dayLabels = this.dayLabels;

            // Fill previous month
            for (var i = numDaysInPrevMonth - (firstDayOfMonth - 1); i <= numDaysInPrevMonth; i++) {
                var iDate = moment(new Date(viewedYear, viewedMonth, i));
                allDays.push({
                    value: i,
                    dateValue: this.getMMDDYYYY(previousMonth + 1, i, viewedYear),
                    isCurrentMonth: false,
                    isToday: iDate.isSame(moment(), 'day')
                });
            }

            // Fill current month
            for (var i = 1; i <= numDaysInMonth; i++) {
                var iDate = moment(new Date(viewedYear, viewedMonth, i));
                allDays.push({
                    value: i,
                    dateValue: this.getMMDDYYYY(viewedMonth + 1, i, viewedYear),
                    isCurrentMonth: true,
                    isSelected: selectedFullDate && iDate.isSame(selectedFullDate, 'day'),
                    isSelectedEndDate: selectedEndDate && iDate.isSame(selectedEndDate, 'day'),
                    isSelectedMulti: selectedFullDate && selectedEndDate && iDate.isBetween(selectedFullDate, selectedEndDate),
                    isToday: iDate.isSame(moment(), 'day')
                });
            }

            // Split array into rows of 7
            allDays.forEach(function(day, index, allDays) {
                if (index % 7 === 0) {
                    var hasMultiRowSelection = index >= 7 && allDays[index - 1].isSelectedMulti && day.isSelectedMulti;
                    if (hasMultiRowSelection) {
                        calendarRows[calendarRows.length - 1].hasMultiRowSelection = true;
                    }

                    calendarRows.push({
                        data: [],
                        hasMultiRowSelection: hasMultiRowSelection
                    });
                    
                }

                calendarRows[calendarRows.length - 1].data.push(day);
            });
            
            // Fill last row
            if (calendarRows[calendarRows.length - 1].length < 7) {
                var iDate = moment(new Date(viewedYear, viewedMonth, i));
                var numColsToFill = 7 - calendarRows[calendarRows.length - 1].length;
                for (var i = 1; i <= numColsToFill; i++) {
                    calendarRows[calendarRows.length - 1].push({
                        value: i,
                        dateValue: this.getMMDDYYYY(nextMonth + 1, i, (nextMonth === 0 ? viewedYear + 1 : viewedYear)),
                        isCurrentMonth: false,
                        isSelected: selectedFullDate && iDate.isSame(selectedFullDate, 'day'),
                        isToday: iDate.isSame(moment(), 'day')
                    });
                }
            }

            return calendarRows;
        },
        setSelectedFullDate: function(selectedFullDate) {
            this.selectedFullDate = selectedFullDate;
            this.$el.val(selectedFullDate.format(this.options.format));
        },
        setSelectedEndDate: function(selectedEndDate) {
            this.selectedEndDate = selectedEndDate;
            this.$elEndDate.val(selectedEndDate.format(this.options.format));
        },
        processClick: function(e) {
            e.preventDefault();
            var self = e.data;
            var $target = $(e.target);

            if ($target.closest('#sljs-prevButton').length > 0) {
                self.clickPrev(e);
            }

            if ($target.closest('#sljs-nextButton').length > 0) {
                self.clickNext(e);
            }

            if ($target.closest('td[data-sljs-date]').length > 0) {
                self.clickDate(e);
            }

            if ($target.closest('li[data-sljs-year]').length > 0) {
                self.clickYear(e);
            }

            // if ($target.closest('#year').length > 0) {
            //     self.clickYearDropdown(e);
            // } else {
            //     self.hideYearDropdown();
            // }
        },
        clickPrev: function(e) {
            var self = e.data;
            if (self.viewedMonth === 0) {
                self.viewedMonth = 11;
                self.viewedYear--;
            } else {
                self.viewedMonth--;
            }

            self.fillMonth();
        },
        clickNext: function(e) {
            var self = e.data;

            if (self.viewedMonth === 11) {
                self.viewedMonth = 0;
                self.viewedYear++;
            } else {
                self.viewedMonth++;
            }

            self.fillMonth();
        },
        clickYear: function(e) {
            var self = e.data;

            var $clickedYear = $(e.target).closest('li[data-sljs-year]');
            self.viewedYear = parseInt($clickedYear.data('sljs-year'));
            self.fillMonth();
        },
        clickYearDropdown: function(e) {
            var self = e.data;

            if (self.$datepickerEl.find('#sljs-yearDropdown').length > 0) {
                self.hideYearDropdown();
            } else {
                self.showYearDropdown();
            }
        },
        clickDate: function(e) {
            var self = e.data;
            var $clickedDate = $(e.target).closest('td[data-sljs-date]');

            if (!($clickedDate.hasClass('slds-disabled-text'))) {
                var selectedDate = $clickedDate.data('sljs-date');

                if (self.$elEndDate && self.$elEndDate.length > 0 && self.$elEndDate[0] === self.$selectedInput[0]) {
                    self.setSelectedEndDate(moment(selectedDate, 'MM/DD/YYYY'));
                } else {
                    self.setSelectedFullDate(moment(selectedDate, 'MM/DD/YYYY'));
                }
                
                self.closeDatepicker(e); 

            }     
        },
        closeDatepicker: function(e) {
            var self = e.data;
            var $datepickerEl = self.$datepickerEl;
            var $selectedInput = self.$selectedInput;

            $selectedInput.closest('.slds-form-element').find('.slds-datepicker').remove();
            $('body').unbind('click', self.closeDatepicker);
            $datepickerEl.unbind('click', self.processClick);
        },
        blockClose: function(e) {
            e.stopPropagation();
        },
        isLeapYear: function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getNumDaysInMonth: function(year, month) {
            return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        getDate: function(format) {
            return format ? this.selectedFullDate.format(format) : this.selectedFullDate;
        },
        setDate: function(date) {
            this.setSelectedFullDate(moment(date));
        }
    };

    $.fn.datepicker = function(options, val) {
    
        var settings = $.extend({
            assetsLocation: '',
            numYearsBefore: 50,
            numYearsAfter: 10,
            format: 'MM/DD/YYYY',
            dayLabels: [
                {
                    full: 'Sunday',
                    abbv: 'S'
                },
                {
                    full: 'Monday',
                    abbv: 'M'
                },
                {
                    full: 'Tuesday',
                    abbv: 'T'
                },
                {
                    full: 'Wednesday',
                    abbv: 'W'
                },
                {
                    full: 'Thursday',
                    abbv: 'T'
                },
                {
                    full: 'Friday',
                    abbv: 'F'
                },
                {
                    full: 'Saturday',
                    abbv: 'S'
                }
            ],
            monthLabels: [
                {
                    full: 'January',
                    abbv: ''
                },
                {
                    full: 'February',
                    abbv: ''
                },
                {
                    full: 'March',
                    abbv: ''
                },
                {
                    full: 'April',
                    abbv: ''
                },
                {
                    full: 'May',
                    abbv: ''
                },
                {
                    full: 'June',
                    abbv: ''
                },
                {
                    full: 'July',
                    abbv: ''
                },
                {
                    full: 'August',
                    abbv: ''
                },
                {
                    full: 'September',
                    abbv: ''
                },
                {
                    full: 'October',
                    abbv: ''
                },
                {
                    full: 'November',
                    abbv: ''
                },
                {
                    full: 'December',
                    abbv: ''
                }
            ]
            // These are the defaults.
            
        }, typeof options === 'object' ? options : {});


        return this.each(function() {
            var $this = $(this),
                data = $this.data('datepicker'),
                endDateId = $this.data('sljs-end-date');

            if (!data) {
                $this.data('datepicker', (data = new Datepicker(this, settings)));
            }
            if (typeof options === 'string') data[options](val);
        });
    };
})(jQuery);
/*
<tr>
    <td class="slds-disabled-text" headers="Sunday" role="gridcell" aria-disabled="true">
        <span class="slds-day">31</span>
    </td>
    <td headers="Monday" role="gridcell" aria-selected="false">
        <span class="slds-day">1</span>
    </td>
    <td headers="Tuesday" role="gridcell" aria-selected="false">
        <span class="slds-day">2</span>
    </td>
    <td headers="Wednesday" role="gridcell" aria-selected="false">
        <span class="slds-day">3</span>
    </td>
    <td headers="Thursday" role="gridcell" aria-selected="false">
        <span class="slds-day">4</span>
    </td>
    <td headers="Friday" role="gridcell" aria-selected="false">
        <span class="slds-day">5</span>
    </td>
    <td headers="Saturday" role="gridcell" aria-selected="false">
        <span class="slds-day">6</span>
    </td>
</tr>
<tr>
    <td headers="Sunday" role="gridcell" aria-selected="false">
        <span class="slds-day">7</span>
    </td>
    <td headers="Monday" role="gridcell" aria-selected="false">
        <span class="slds-day">8</span>
    </td>
    <td headers="Tuesday" role="gridcell" aria-selected="false">
        <span class="slds-day">9</span>
    </td>
    <td headers="Wednesday" role="gridcell" aria-selected="false">
        <span class="slds-day">10</span>
    </td>
    <td headers="Thursday" role="gridcell" aria-selected="false">
        <span class="slds-day">11</span>
    </td>
    <td headers="Friday" role="gridcell" aria-selected="false">
        <span class="slds-day">12</span>
    </td>
    <td headers="Saturday" role="gridcell" aria-selected="false">
        <span class="slds-day">13</span>
    </td>
</tr>
<tr>
    <td headers="Sunday" role="gridcell" aria-selected="false">
        <span class="slds-day">14</span>
    </td>
    <td headers="Monday" role="gridcell" aria-selected="false">
        <span class="slds-day">15</span>
    </td>
    <td headers="Tuesday" role="gridcell" aria-selected="false">
        <span class="slds-day">16</span>
    </td>
    <td headers="Wednesday" role="gridcell" aria-selected="false">
        <span class="slds-day">17</span>
    </td>
    <td class="slds-is-today" headers="Thursday" role="gridcell" aria-selected="false">
        <span class="slds-day">18</span>
    </td>
    <td headers="Friday" role="gridcell" aria-selected="false">
        <span class="slds-day">19</span>
    </td>
    <td headers="Saturday" role="gridcell" aria-selected="false">
        <span class="slds-day">20</span>
    </td>
</tr>
<tr>
    <td headers="Sunday" role="gridcell" aria-selected="false">
        <span class="slds-day">21</span>
    </td>
    <td headers="Monday" role="gridcell" aria-selected="false">
        <span class="slds-day">22</span>
    </td>
    <td class="slds-is-selected" headers="Tuesday" role="gridcell" aria-selected="true">
        <span class="slds-day">23</span>
    </td>
    <td headers="Wednesday" role="gridcell" aria-selected="false">
        <span class="slds-day">24</span>
    </td>
    <td headers="Thursday" role="gridcell" aria-selected="false">
        <span class="slds-day">25</span>
    </td>
    <td headers="Friday" role="gridcell" aria-selected="false">
        <span class="slds-day">26</span>
    </td>
    <td headers="Saturday" role="gridcell" aria-selected="false">
        <span class="slds-day">27</span>
    </td>
</tr>
<tr>
    <td headers="Sunday" role="gridcell" aria-selected="false">
        <span class="slds-day">28</span>
    </td>
    <td headers="Monday" role="gridcell" aria-selected="false">
        <span class="slds-day">29</span>
    </td>
    <td headers="Tuesday" role="gridcell" aria-selected="false">
        <span class="slds-day">30</span>
    </td>
    <td class="slds-disabled-text" headers="Wednesday" role="gridcell" aria-disabled="true">
        <span class="slds-day">1</span>
    </td>
    <td class="slds-disabled-text" headers="Thursday" role="gridcell" aria-disabled="true">
        <span class="slds-day">2</span>
    </td>
    <td class="slds-disabled-text" headers="Friday" role="gridcell" aria-disabled="true">
        <span class="slds-day">3</span>
    </td>
    <td class="slds-disabled-text" headers="Saturday" role="gridcell" aria-disabled="true">
        <span class="slds-day">4</span>
    </td>
</tr>
*/