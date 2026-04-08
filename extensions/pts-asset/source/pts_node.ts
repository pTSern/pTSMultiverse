'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop type="dump" class="test"></ui-prop>
`;

export const $ = {
    test: '.test',
};

export function update(this: Selector<typeof $>, dump: any) {
    // Use ui-prop to auto-render, set the type of prop to dump
    // render pass in a dump data to be able to automatically render the corresponding interface
    // Auto-rendered interface can automatically commit data after modification
    this.$.test.render(dump.value.uuid);
    console.log("DUMPPPP", 22222222222222)
}
export function ready(this: Selector<typeof $>) {}
