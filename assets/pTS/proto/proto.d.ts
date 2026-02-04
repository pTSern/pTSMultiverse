// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

/** Namespace main. */
export namespace main {

    /** Properties of a TickMessage. */
    interface ITickMessage {

        /** TickMessage tick */
        tick?: (number|Long|null);

        /** TickMessage name */
        name?: (string|null);
    }

    /** Represents a TickMessage. */
    class TickMessage implements ITickMessage {

        /**
         * Constructs a new TickMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: main.ITickMessage);

        /** TickMessage tick. */
        public tick: (number|Long);

        /** TickMessage name. */
        public name: string;

        /**
         * Creates a new TickMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TickMessage instance
         */
        public static create(properties?: main.ITickMessage): main.TickMessage;

        /**
         * Encodes the specified TickMessage message. Does not implicitly {@link main.TickMessage.verify|verify} messages.
         * @param message TickMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: main.ITickMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TickMessage message, length delimited. Does not implicitly {@link main.TickMessage.verify|verify} messages.
         * @param message TickMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: main.ITickMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TickMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TickMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): main.TickMessage;

        /**
         * Decodes a TickMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TickMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): main.TickMessage;

        /**
         * Verifies a TickMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TickMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TickMessage
         */
        public static fromObject(object: { [k: string]: any }): main.TickMessage;

        /**
         * Creates a plain object from a TickMessage message. Also converts values to other types if specified.
         * @param message TickMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: main.TickMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TickMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TickMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
