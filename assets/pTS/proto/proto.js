/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.main = (function() {

    /**
     * Namespace main.
     * @exports main
     * @namespace
     */
    var main = {};

    main.TickMessage = (function() {

        /**
         * Properties of a TickMessage.
         * @memberof main
         * @interface ITickMessage
         * @property {number|Long|null} [tick] TickMessage tick
         * @property {string|null} [name] TickMessage name
         */

        /**
         * Constructs a new TickMessage.
         * @memberof main
         * @classdesc Represents a TickMessage.
         * @implements ITickMessage
         * @constructor
         * @param {main.ITickMessage=} [properties] Properties to set
         */
        function TickMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TickMessage tick.
         * @member {number|Long} tick
         * @memberof main.TickMessage
         * @instance
         */
        TickMessage.prototype.tick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * TickMessage name.
         * @member {string} name
         * @memberof main.TickMessage
         * @instance
         */
        TickMessage.prototype.name = "";

        /**
         * Creates a new TickMessage instance using the specified properties.
         * @function create
         * @memberof main.TickMessage
         * @static
         * @param {main.ITickMessage=} [properties] Properties to set
         * @returns {main.TickMessage} TickMessage instance
         */
        TickMessage.create = function create(properties) {
            return new TickMessage(properties);
        };

        /**
         * Encodes the specified TickMessage message. Does not implicitly {@link main.TickMessage.verify|verify} messages.
         * @function encode
         * @memberof main.TickMessage
         * @static
         * @param {main.ITickMessage} message TickMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TickMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.tick);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified TickMessage message, length delimited. Does not implicitly {@link main.TickMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof main.TickMessage
         * @static
         * @param {main.ITickMessage} message TickMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TickMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TickMessage message from the specified reader or buffer.
         * @function decode
         * @memberof main.TickMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {main.TickMessage} TickMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TickMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.main.TickMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tick = reader.int64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TickMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof main.TickMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {main.TickMessage} TickMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TickMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TickMessage message.
         * @function verify
         * @memberof main.TickMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TickMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tick != null && message.hasOwnProperty("tick"))
                if (!$util.isInteger(message.tick) && !(message.tick && $util.isInteger(message.tick.low) && $util.isInteger(message.tick.high)))
                    return "tick: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a TickMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof main.TickMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {main.TickMessage} TickMessage
         */
        TickMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.main.TickMessage)
                return object;
            var message = new $root.main.TickMessage();
            if (object.tick != null)
                if ($util.Long)
                    (message.tick = $util.Long.fromValue(object.tick)).unsigned = false;
                else if (typeof object.tick === "string")
                    message.tick = parseInt(object.tick, 10);
                else if (typeof object.tick === "number")
                    message.tick = object.tick;
                else if (typeof object.tick === "object")
                    message.tick = new $util.LongBits(object.tick.low >>> 0, object.tick.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a TickMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof main.TickMessage
         * @static
         * @param {main.TickMessage} message TickMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TickMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.tick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.tick = options.longs === String ? "0" : 0;
                object.name = "";
            }
            if (message.tick != null && message.hasOwnProperty("tick"))
                if (typeof message.tick === "number")
                    object.tick = options.longs === String ? String(message.tick) : message.tick;
                else
                    object.tick = options.longs === String ? $util.Long.prototype.toString.call(message.tick) : options.longs === Number ? new $util.LongBits(message.tick.low >>> 0, message.tick.high >>> 0).toNumber() : message.tick;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this TickMessage to JSON.
         * @function toJSON
         * @memberof main.TickMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TickMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TickMessage
         * @function getTypeUrl
         * @memberof main.TickMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TickMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/main.TickMessage";
        };

        return TickMessage;
    })();

    return main;
})();

module.exports = $root;
