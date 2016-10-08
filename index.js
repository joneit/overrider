'use strict';

/**
 * Mixes members of all `sources` into `object`, handling getters and setters properly.
 *
 * Any number of `sources` objects may be given and each is copied in turn.
 *
 * @param {object} object - The target object to receive sources.
 * @param {...object} [sources] - Object(s) containing members to copy to `object`. (Omitting is a no-op.)
 * @returns {object} `object`
 */
function overrider(object, sources) { // eslint-disable-line no-unused-vars
    for (var i = 1; i < arguments.length; ++i) {
        mixInFrom.call(object, arguments[i]);
    }

    return object;
}

/**
 * Mix `this` members into `target`.
 * @param target
 * @returns target
 */
function mixInTo(target) {
    var descriptor;
    for (var key in this) {
        if ((descriptor = Object.getOwnPropertyDescriptor(this, key))) {
            Object.defineProperty(target, key, descriptor);
        }
    }
    return target;
}

/**
 * Mix `source` members into `this`.
 * @param source
 * @returns this
 */
function mixInFrom(source) {
    var descriptor;
    for (var key in source) {
        if ((descriptor = Object.getOwnPropertyDescriptor(source, key))) {
            Object.defineProperty(this, key, descriptor);
        }
    }
    return this;
}

overrider.mixInTo = mixInTo;
overrider.mixInFrom = mixInFrom;

module.exports = overrider;
