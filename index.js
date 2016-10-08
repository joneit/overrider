'use strict';

/**
 * Shallow copies members of `overrides` to `object`, handling getters and setters properly.
 *
 * Any number of `overrides` objects may be given and each is copied in turn.
 *
 * @param {object} object - The target object to receive overrides.
 * @param {...object} [overrides] - Object(s) containing members to copy to `object`. (Omitting is a no-op.)
 * @returns {object} `object`
 */
function overrider(object, overrides) {
    var key, descriptor;

    for (var i = 1; i < arguments.length; ++i) {
        overrides = arguments[i];
        if (typeof overrides === 'object') {
            for (key in overrides) {
                if ((descriptor = Object.getOwnPropertyDescriptor(overrides, key))) {
                    Object.defineProperty(object, key, descriptor);
                }
            }
        }
    }

    return object;
}

module.exports = overrider;
