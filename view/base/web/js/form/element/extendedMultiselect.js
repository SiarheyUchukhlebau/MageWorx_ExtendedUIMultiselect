/**
 * Copyright © MageWorx. All rights reserved.
 * See LICENSE.txt for license details.
 */

define([
    'underscore',
    'Magento_Ui/js/form/element/multiselect',
    'ko',
    'mage/translate'
], function (_, MultiselectOriginal, ko, $t) {
    'use strict';

    return MultiselectOriginal.extend({
        defaults: {
            template: 'MageWorx_ExtendedUIMultiselect/form/extendedMultiselectField',
            selectedValuesView: ''
        },

        observableProperties: [
            'selectedValuesView'
        ],

        initObservable: function () {
            this._super();

            this.observe(this.observableProperties);

            this.selectedValuesView = ko.computed(function () {
                var values = this.value(),
                    options = _.isFunction(this.indexedOptions) ? this.indexedOptions() : this.indexedOptions,
                    optionsLength = 0,
                    resultArray = [];

                if (_.isArray(options)) {
                    optionsLength = options.length;
                } else if (_.isObject(options)) {
                    optionsLength = Object.keys(options).length;
                }

                if (!values || values.length < 1 || !options) {
                    return $t('Nothing Selected');
                }

                if (values.length === optionsLength) {
                    return $t('All');
                }

                if (!_.isEmpty(values)) {
                    _.each(options, function (opt) {
                        if (_.indexOf(values, opt.value) !== -1) {
                            resultArray.push(opt.label);
                        }
                    }, this)
                }

                return resultArray.join(', ');
            }, this)

            return this;
        }
    });
});
