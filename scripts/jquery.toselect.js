/*!
 * --------------------------------------------------------------------------
 * ToSelect (v1.3.0): jquery.toselect.js
 * Copyright 2020 WuBoStudio
 * Licensed under MIT (https://github.com/wubostudio/toselect/blob/master/LICENSE)
 * ---------------------------------------------------------------------------
 */

+function ($) {
    'use strict';

    const NAME = 'ToSelect';
    const VERSION = '1.3.1';

    var ToSelect = function (element, options) {
        this.source = $(element)
        this.selects = {
            parent: this.getParentSelect(),
            child: this.getChildSelect()
        }
        this.options = options
        this.name = NAME
        this.version = VERSION

        var that = this;

        var e = $.Event('toselect.init', { relatedTarget: this.source});
        this.init($.proxy(function () {
            setTimeout(function () {
                that.source.trigger(e)
            }, 0)
        }, this))
    }

    ToSelect.DEFAULTS = {

    };

    ToSelect.prototype = {

        constructor: ToSelect,

        init: function (callback) {
            this.hideSource()
            this.bindParentSelect()
            this.bindChildSelect()
            this.selects.parent.on('change', $.proxy(function () {
                this.parentOnChange()
            }, this))
            this.selects.child.on('change', $.proxy(function () {
                this.childOnChange()
            }, this))

            callback && callback()
        },

        hideSource: function () {
            this.source.hide()
        },

        getParentSelect: function () {
            var parent, $s = this.source
            parent = $s.attr('data-parent')
            return $(parent)
        },
        getChildSelect: function () {
            var child, $s = this.source
            child = $s.attr('data-child')
            return $(child)
        },

        bindParentSelect: function () {
            var parent = this.selects.parent, $s = this.source, $m = this.getParentSelectMetadata, $c = this.createSelectOption

            var optgroups = $s.children('optgroup')
            if (!optgroups) {
                return false;
            }

            $.each(optgroups, function () {
                var metadata = $m($(this))
                if (!metadata) return
                var option = $c(metadata)
                option.data('toselect.optgroup', $(this));
                parent.append(option)
            })

            this.source.trigger($.Event('toselect.parent.updated', {
                relatedTarget: this.selects.parent
            }))
        },
        getParentSelectMetadata: function (optgroup) {
            if (!optgroup) {
                return false
            }
            if (!optgroup.attr('label')) {
                return false
            }

            var label = optgroup.attr('label');
            var isSelected = optgroup.find('option:selected').length > 0

            if (/^TextValue\[.*\]+$/.test(label)) {

                var data = eval(label.replace('TextValue', ''))
                return {
                    text: data[0],
                    value: data.length === 2 ? data[1] : data[0],
                    selected: isSelected
                }
            }

            return {
                text: label,
                value: label,
                selected: isSelected
            }
        },

        bindChildSelect: function () {
            var parent = this.selects.parent, child = this.selects.child, $m = this.getChildSelectMetadata,
                $c = this.createSelectOption
            var optgroup = parent.children('option:selected');
            if (!optgroup) {
                return
            }

            var data = $(optgroup).data('toselect.optgroup')  
            if (!data) {
                return
            }
            var options = data.find('option');

            $.each(options, function () {
                var metadata = $m($(this))
                if (!metadata) return

                var option = $c(metadata)
                child.append(option)
            })

            this.source.trigger($.Event('toselect.child.updated', {
                relatedTarget: this.selects.child                
            }))
        },
        getChildSelectMetadata: function (option) {
            if (!option) {
                return false
            }

            return {
                text: option.text(),
                value: option.val(),
                disabled: option.is(':disabled'),
                selected: option.is(':selected')
            }
        },

        createSelectOption: function (metadata) {
            if (metadata === null) {
                return false;
            }

            var option = document.createElement('option')
            option.innerText = metadata.text
            option.setAttribute('value', metadata.value)

            if (metadata.selected) option.setAttribute('selected', 'selected')
            if (metadata.disabled) option.setAttribute('disabled', 'disabled')
            return $(option);
        },

        parentOnChange: function () {
            var selected = this.selects.parent.find('option:selected')

            this.source.trigger($.Event('toselect.parent.changed', {
                relatedTarget: this.selects.parent,
                text: selected.text(),
                value: selected.val()
            }))
            
            this.selects.child.find('option:not([data-keep="true"])').remove()
            this.bindChildSelect();
            this.childOnChange();
        },
        childOnChange: function () {
            var selected = this.selects.child.find('option:selected')
            this.source.val(selected.val())
            this.source.trigger($.Event('toselect.child.changed', {
                relatedTarget: this.selects.child,
                text: selected.text(),
                value: selected.val()
            }))
        }
    }

    // ToSelect Plugin Definition
    // ================================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('toselect')      
            var options = $.extend({}, ToSelect.DEFAULTS, $this.data(), typeof option === 'object' && option)

            if (!data) $this.data('toselect', (data = new ToSelect(this, options)))
            if (typeof option === 'string') data[option]()
        })
    }

    var old = $.fn.toSelect

    $.fn.toSelect = Plugin
    $.fn.toSelect.Constructor = ToSelect


    // ToSelect No Conflict
    // ====================

    $.fn.toSelect.noConflict = function () {
        $.fn.toSelect = old
        return this
    }

    // ToSelect DATA-API
    // =================

    $(window).on('load', function () {
        $('[data-role="toselect"]').each(function () {
            var $toSelect = $(this) 
            Plugin.call($toSelect, $toSelect.data())
        })
    })

}(jQuery);